import { auth } from "@/auth";
import PlaceOrderForm from "@/components/place-order-form/place-order-form";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Address } from "@/lib/types";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const PlaceOrderPage = async () => {
	const cart = await getMyCart();
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) throw new Error("User not found");
	const user = await getUserById(userId);
	if (!cart || cart.items.length === 0) redirect("/cart");
	if (!user.address) redirect("/shipping-address");
	if (!user.paymentMethod) redirect("/payment-method");
	const userAddress = user.address as unknown as Address;
	return (
		<main className="relative lg:min-h-full">
			<div>
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24  lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
					<div className="lg:col-start-2">
						<h1 className="text-4xl text-center font-bold text-indigo-600">
							Place Order
						</h1>

						<ul
							role="list"
							className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
						>
							{cart.items.map((product) => (
								<li
									key={product.id}
									className="flex items-center space-x-6 py-6"
								>
									<Image
										src={product.image}
										alt={product.name}
										width={50}
										height={50}
										className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
									/>
									<div className="flex-auto space-y-1">
										<h3 className="text-gray-900">
											<Link href={`/product/${product.slug}`}>
												{product.name}
											</Link>
										</h3>
									</div>
									<p className="flex-none font-medium text-gray-900">
										${product.price}
									</p>
								</li>
							))}
						</ul>

						<dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
							<div className="flex justify-between">
								<dt>Subtotal</dt>
								<dd className="text-gray-900">${cart.itemsPrice}</dd>
							</div>

							<div className="flex justify-between">
								<dt>Shipping</dt>
								<dd className="text-gray-900">${cart.shippingPrice}</dd>
							</div>

							<div className="flex justify-between">
								<dt>Taxes</dt>
								<dd className="text-gray-900">${cart.taxPrice}</dd>
							</div>

							<div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
								<dt className="text-base">Total</dt>
								<dd className="text-base">${cart.totalPrice}</dd>
							</div>
						</dl>

						<dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
							<div>
								<dt className="font-medium text-gray-900">Shipping Address</dt>
								<dd className="mt-2">
									<address className="not-italic">
										<span className="block">{userAddress.fullName}</span>
										<span className="block">{userAddress.streetAddress}</span>
										<span className="block">
											{userAddress.city}, {userAddress.country},
											{userAddress.postalCode}
										</span>
									</address>
								</dd>
							</div>
							<div>
								<dt className="font-medium text-gray-900">
									Payment Information
								</dt>
								<dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
									<div className="flex-none">
										<p className="text-emerald-500 font-bold">
											{user.paymentMethod.toUpperCase()}
										</p>
									</div>
								</dd>
							</div>
						</dl>

						<div className="mt-16 border-gray-200 py-6 text-right">
							<button
								type="submit"
								// disabled={isPending}
								className="flex justify-center rounded-md bg-emerald-500 px-10 ml-auto py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								{false ? (
									<Loader className="animate-spin w-5 h-5" />
								) : (
									"Continue"
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PlaceOrderPage;
