"use server";

import { prisma } from "@/prisma/prisma";
import { convertPrismaObjectToPlain } from "../utils";
import { revalidatePath } from "next/cache";
import { Product } from "../types";

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
export const getAllProducts = async () => {
	const products = await prisma.product.findMany();
	const productsCount = await prisma.product.count();
	return {
		products,
		productsCount,
	};
};
export const deleteProduct = async (id: string) => {
	try {
		await prisma.product.delete({
			where: {
				id,
			},
		});
		revalidatePath("/admin/products");
		return {
			status: "success",
			message: "product deleted successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "failed to delete product",
		};
	}
};
export const createProduct = async (product: Product) => {
	try {
		await prisma.product.create({
			data: product,
		});
		revalidatePath("/admin/products");
		return { status: "success", message: "product created successfully" };
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "failed to create product",
		};
	}
};
