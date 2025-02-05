"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { cookies } from "next/headers";
import { convertPrismaObjectToPlain } from "../utils";
import { Item } from "../types";

export const addItemToCart = async (item: Item) => {
	try {
		const sessionCartId = (await cookies()).get("sessionCartId")?.value;
		if (!sessionCartId) throw new Error("Session cart id not found");
		const session = await auth();
		const userId = session?.user?.id ? session.user.id : undefined;
		const product = await prisma.product.findFirst({
			where: {
				id: item.id,
			},
		});
		console.log(product, "product found");
		return {
			status: "success",
			message: "Item added to cart successfully",
		};
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
