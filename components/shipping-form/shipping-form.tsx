"use client";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { Address } from "@/lib/types";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import toast from "react-hot-toast";

const ShippingForm = ({ address }: { address: Address }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formValues = Object.fromEntries(formData.entries());
		startTransition(async () => {
			const res = await updateUserAddress(formValues as unknown as Address);
			if (res.status === "success") {
				toast.success(res.message);
				router.push("/payment-method");
			} else {
				toast.error(res.message);
			}
		});
	};
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Shipping address{" "}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* <input type="hidden" name="callbackUrl" value={callbackUrl} /> */}
						<div>
							<label
								htmlFor="fullName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Full Name{" "}
							</label>
							<div className="mt-2">
								<input
									id="fullName"
									name="fullName"
									type="text"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="address"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Address
							</label>
							<div className="mt-2">
								<input
									id="address"
									name="address"
									type="text"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="city"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								City
							</label>
							<div className="mt-2">
								<input
									id="city"
									name="city"
									type="text"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="postalcode"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Postal code
							</label>
							<div className="mt-2">
								<input
									id="postalcode"
									name="postalcode"
									type="text"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Country
							</label>
							<div className="mt-2">
								<input
									id="country"
									name="country"
									type="text"
									required
									className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
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
export default ShippingForm;
