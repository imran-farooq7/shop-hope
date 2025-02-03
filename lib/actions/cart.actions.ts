"use server";
export const addItemToCart = async (item: {
	id: string;
	name: string;
	slug: string;
	price: number;
	qty: number;
	image: string;
}) => {
	return {
		status: "success",
		message: "item added successfully",
	};
};
