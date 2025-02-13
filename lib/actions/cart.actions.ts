"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { Item } from "../types";
import { convertPrismaObjectToPlain, roundToTwoDecimalPlaces } from "../utils";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
const priceCalc = (items: Item[]) => {
	const itemsPrice = roundToTwoDecimalPlaces(
		items.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	const taxPrice = roundToTwoDecimalPlaces(itemsPrice * 0.15);
	const shippingPrice = roundToTwoDecimalPlaces(itemsPrice > 100 ? 0 : 10);
	const totalPrice = itemsPrice + taxPrice + shippingPrice;
	return {
		itemsPrice: itemsPrice.toFixed(2),
		taxPrice: taxPrice.toFixed(2),
		shippingPrice: shippingPrice.toFixed(2),
		totalPrice: totalPrice.toFixed(2),
	};
};
export const addItemToCart = async (item: Item) => {
	try {
		const sessionCartId = (await cookies()).get("sessionCartId")?.value;
		if (!sessionCartId) throw new Error("Session cart id not found");
		const session = await auth();
		const userId = session?.user?.id ? session.user.id : null;
		const cart = await getMyCart();
		const product = await prisma.product.findFirst({
			where: {
				id: item.id,
			},
		});
		if (!product) throw new Error("Product not found");
		if (!cart) {
			const newCart = {
				items: [item],
				sessionCartId,
				userId,
				...priceCalc([item]),
			};
			await prisma.cart.create({
				data: {
					...newCart,
					items: newCart.items as unknown as InputJsonValue[],
				},
			});
			revalidatePath(`/product/${product.id}`);
			return {
				status: "success",
				message: "Item added to cart successfully",
			};
		} else {
			const existingItem = cart.items.find((i) => i.id === item.id);
			// console.log(existingItem);
			if (existingItem) {
				if (product.stock < existingItem.qty + 1) {
					throw new Error("Product out of stock");
				}
				cart.items.find((i) => i.id === item.id)!.qty = existingItem.qty + 1;
			} else {
				if (product.stock < 1) {
					throw new Error("Product out of stock");
				}
				cart.items.push(item);
			}
			await prisma.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					items: cart.items as Prisma.CartUpdateitemsInput[],
					...priceCalc(cart.items),
				},
			});
			revalidatePath(`/product/${product.slug}`);
			return {
				status: "success",
				message: `Product ${existingItem ? "updated in" : "added to"} cart`,
			};
		}
	} catch (error) {
		console.log(error);
		return { status: "error", message: "Failed to add item in the cart" };
	}
};
export const getMyCart = async () => {
	const sessionCartId = (await cookies()).get("sessionCartId")?.value;
	if (!sessionCartId) throw new Error("Session cart id not found");
	const session = await auth();
	const userId = session?.user?.id ? session.user.id : undefined;
	const cart = await prisma.cart.findFirst({
		where: userId ? { userId } : { sessionCartId },
	});
	if (!cart) return undefined;
	return convertPrismaObjectToPlain({
		...cart,
		items: cart.items as unknown as Item[],
		itemsPrice: cart.itemsPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
	});
};
export const removeItemFromCart = async (productId: string) => {
	try {
		const sessionCartId = (await cookies()).get("sessionCartId")?.value;
		if (!sessionCartId) throw new Error("Session cart id not found");
		const product = await prisma.product.findFirst({
			where: {
				id: productId,
			},
		});
		if (!product) throw new Error("Product not found");
		const cart = await getMyCart();
		if (!cart) throw new Error("Cart not found");
		const itemExists = cart.items.find((i) => i.id === productId);
		if (!itemExists) throw new Error("product not found in cart");
		if (itemExists.qty === 1) {
			cart.items = cart.items.filter((item) => item.id !== itemExists.id);
		} else {
			cart.items.find((i) => i.id === productId)!.qty = itemExists.qty - 1;
		}
		await prisma.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				items: cart.items as Prisma.CartUpdateitemsInput[],
				...priceCalc(cart.items),
			},
		});
		revalidatePath(`/product/${product.slug}`);
		return {
			status: "success",
			message: "Item removed from cart successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Failed to remove item from cart",
		};
	}
};
