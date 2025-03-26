"use server";

import { auth } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { prisma } from "@/prisma/prisma";
import { convertPrismaObjectToPlain } from "../utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOrder = async () => {
	try {
		const session = await auth();
		if (!session) throw new Error("User not authenticated");
		const cart = await getMyCart();
		const userId = await session.user?.id;
		if (!userId) throw new Error("User not found");
		const user = await getUserById(userId);
		if (!cart || cart.items.length === 0) {
			return {
				status: "error",
				message: "cart is empty",
				redirectTo: "/cart",
			};
		}
		if (!user.address) {
			return {
				status: "error",
				message: "no shipping address",
				redirectTo: "/shipping-address",
			};
		}
		if (!user.paymentMethod) {
			return {
				status: "error",
				message: "no payment method",
				redirectTo: "/payment-method",
			};
		}
		const order = {
			userId,
			itemsPrice: cart.itemsPrice,
			shippingAddress: user.address,
			paymentMethod: user.paymentMethod,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice,
		};
		const orderId = await prisma.$transaction(async (tx) => {
			const newOrder = await tx.order.create({
				data: order,
			});
			for (const item of cart.items) {
				await tx.orderItem.create({
					data: {
						name: item.name,
						productId: item.id,
						price: item.price,
						orderId: newOrder.id,
						image: item.image,
						qty: item.qty,
						slug: item.slug,
					},
				});
			}
			await tx.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					items: [],
					taxPrice: 0,
					shippingPrice: 0,
					totalPrice: 0,
					itemsPrice: 0,
				},
			});
			return newOrder.id;
		});
		if (!orderId) throw new Error("order not created");
		return {
			status: "success",
			message: "Order created",
			redirectTo: `/order/${orderId}`,
		};
	} catch (error) {
		console.log(error);
		if (isRedirectError(error)) throw error;
		return {
			status: "error",
			message: "failed to place order",
		};
	}
};
export const getOrderById = async (id: string) => {
	const order = await prisma.order.findFirst({
		where: {
			id,
		},
		include: {
			OrderItem: true,
			user: {
				select: {
					name: true,
					email: true,
				},
			},
		},
	});
	return convertPrismaObjectToPlain(order);
};
export const getMyOrders = async () => {
	const session = await auth();
	if (!session) throw new Error("User not authenticated");
	const orders = await prisma.order.findMany({
		where: {
			userId: session.user?.id,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
	return {
		data: orders,
	};
};
export const getOrdersSummary = async () => {
	const ordersCount = await prisma.order.count();
	const productsCount = await prisma.product.count();
	const usersCount = await prisma.user.count();
	const totalSales = await prisma.order.aggregate({
		_sum: { totalPrice: true },
	});
	const salesDataDecimal = await prisma.$queryRaw<
		Array<{ month: string; totalSales: Prisma.Decimal }>
	>`SELECT to_char("createdAt",'MM/YY') as "month" , sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt",'MM/YY')`;
	const salesData = salesDataDecimal.map((sale) => ({
		month: sale.month,
		totalSales: Number(sale.totalSales),
	}));
	const latestSales = await prisma.order.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: { select: { name: true } },
		},
		take: 6,
	});
	return {
		ordersCount,
		productsCount,
		usersCount,
		salesData,
		latestSales,
		totalSales,
	};
};
export const getAllOrders = async () => {
	const orders = await prisma.order.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: { select: { name: true } },
		},
	});
	return {
		orders,
	};
};
export const deleteOrder = async (id: string) => {
	try {
		await prisma.order.delete({
			where: {
				id,
			},
		});
		revalidatePath("/admin/orders");
		return {
			status: "success",
			message: "Order deleted successfully",
		};
	} catch (error) {
		console.log(error);
		return { status: "error", message: "failed to delete order" };
	}
};
export const updateOrderToPaid = async (id: string) => {
	// Find the order in the database and include the order items
	const order = await prisma.order.findFirst({
		where: {
			id: id,
		},
		include: {
			OrderItem: true,
		},
	});

	if (!order) throw new Error("Order not found");

	if (order.isPaid) throw new Error("Order is already paid");

	// Transaction to update the order and update the product quantities
	await prisma.$transaction(async (tx) => {
		// Update all item quantities in the database
		for (const item of order.OrderItem) {
			await tx.product.update({
				where: { id: item.productId },
				data: { stock: { increment: -item.qty } },
			});
		}

		// Set the order to paid
		await tx.order.update({
			where: { id: id },
			data: {
				isPaid: true,
				paidAt: new Date(),
			},
		});
	});

	// Get the updated order after the transaction
	const updatedOrder = await prisma.order.findFirst({
		where: {
			id: id,
		},
		include: {
			OrderItem: true,
			user: { select: { name: true, email: true } },
		},
	});

	if (!updatedOrder) {
		throw new Error("Order not found");
	}
};
export const updateOrderToPaidCod = async (id: string) => {
	try {
		await updateOrderToPaid(id);
		revalidatePath(`order/${id}`);
		return {
			status: "success",
			message: "Order updated to paid successfully",
		};
	} catch (error) {
		console.log(error);
		return { status: "error", message: "failed to update order to paid" };
	}
};
export const deliverOrder = async (id: string) => {
	try {
		const order = await prisma.order.findFirst({
			where: {
				id,
			},
		});
		if (!order) throw new Error("Order not found");
		if (!order.isPaid) throw new Error("Order is not paid");
		await prisma.order.update({
			where: {
				id,
			},
			data: {
				isDelivered: true,
				deliveredAt: new Date(),
			},
		});
		revalidatePath(`order/${id}`);
		return {
			status: "success",
			message: "Order marked delivered successfully",
		};
	} catch (error) {
		console.log(error);
		return { status: "error", message: "failed to deliver order" };
	}
};
