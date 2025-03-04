"use client";
import { createOrder } from "@/lib/actions/order.actions";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const OrderForm = () => {
	const router = useRouter();
	const OrderPlaceBtn = () => {
		const { pending } = useFormStatus();
		return (
			<button className="flex ml-auto items-center justify-center rounded-md border border-transparent bg-emerald-500  p-4 text-base font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50">
				{pending ? <Loader className="animate-spin w-5 h-5" /> : "Place order"}
			</button>
		);
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await createOrder();
		console.log(res);
		if (res.redirectTo) {
			router.push(res.redirectTo);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<OrderPlaceBtn />
		</form>
	);
};

export default OrderForm;
