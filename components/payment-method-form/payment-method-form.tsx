"use client";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

const PaymentMethodForm = ({ paymentMethod }: { paymentMethod: string }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const method = formData.get("paymentMethod") as string;
		startTransition(async () => {
			const res = await updateUserPaymentMethod(method);
			if (res.status === "success") {
				toast.success(res.message);
				router.push("/place-order");
			} else {
				toast.error(res.message);
			}
		});
	};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Select a payment method{" "}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* <input type="hidden" name="callbackUrl" value={callbackUrl} /> */}
						<div>
							<label
								htmlFor="paymentMethod"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Payment Method
							</label>
							<select
								id="paymentMethod"
								name="paymentMethod"
								className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								defaultValue={paymentMethod}
							>
								<option value={"paypal"}>Paypal</option>
								<option value={"stripe"}>Stripe</option>
								<option value={"coNd"}>COD</option>
							</select>
						</div>
						<div>
							<button
								type="submit"
								disabled={isPending}
								className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								{isPending ? (
									<Loader className="animate-spin w-5 h-5" />
								) : (
									"Continue"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethodForm;
