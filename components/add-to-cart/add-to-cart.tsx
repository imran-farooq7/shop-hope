"use client";

import { addItemToCart } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster } from "react-hot-toast";

interface Props {
	item: {
		id: string;
		name: string;
		slug: string;
		price: number;
		qty: number;
		image: string;
	};
}
const AddToCart = ({ item }: Props) => {
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
					removeDelay: 3000,
				}
			);
		} else {
			toast.error(res.message);
		}
	};
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
