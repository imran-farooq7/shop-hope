"use client";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Item } from "@/lib/types";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddToCart = ({
	item,
	cart,
}: {
	item: Item;
	cart:
		| {
				items: Item[];
				itemsPrice: string;
				totalPrice: string;
				taxPrice: string;
				shippingPrice: string;
				id: string;
				createdAt: Date;
				userId: string | null;
				sessionCartId: string;
		  }
		| undefined;
}) => {
	const router = useRouter();
	const handleAddToCart = async () => {
		const res = await addItemToCart(item);
		if (res.status === "success") {
			toast.custom(
				<div className="pointer-events-auto flex flex-col gap-3 items-center p-5 w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					{res.message}
					<button
						className="text-white w-full bg-indigo-600 px-3 py-2 rounded-md ml-2"
						onClick={() => router.push("/cart")}
					>
						View Cart
					</button>
				</div>,
				{
					removeDelay: 2000,
				}
			);
		} else {
			toast.error(res.message);
		}
	};
	const existingItem = cart && cart.items.find((i) => i.id === item.id);
	const handleRemoveFromCart = async () => {
		const res = await removeItemFromCart(item.id);
		if (res.status === "success") {
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}
	};
	if (existingItem) {
		return (
			<div className="flex items-center">
				<button
					className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
					onClick={handleRemoveFromCart}
				>
					<MinusIcon />
				</button>
				<span className="px-8 font-bold">{existingItem.qty}</span>
				<button
					className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
					onClick={handleAddToCart}
				>
					<PlusIcon />
				</button>
			</div>
		);
	}
	return (
		<button
			className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
			onClick={handleAddToCart}
		>
			Add to cart
		</button>
	);
};

export default AddToCart;
