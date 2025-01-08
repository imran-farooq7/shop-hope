"use server";

import { prisma } from "@/prisma/prisma";
import { convertPrismaObjectToPlain } from "../utils";

export const getProducts = async () => {
	try {
		const products = await prisma.product.findMany();
		const data = convertPrismaObjectToPlain(products);
		return {
			data,
			message: "products fetched successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			data: [],
			message: "faild to fetch products",
		};
	}
};
export const getProductBySlug = async (slug: string) => {
	try {
		const product = await prisma.product.findFirst({
			where: {
				slug,
			},
		});
		const data = convertPrismaObjectToPlain(product);
		return {
			data,
			message: "product fetched successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			data: null,
			message: "faild to fetch product",
		};
	}
};
