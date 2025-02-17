"use client";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Item } from "@/lib/types";
import { Loader, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

const CartTable = ({
	cart,
}: {
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
	const [isPending, startTransition] = useTransition();

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
			<h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Shopping Cart
			</h1>
			{cart?.items.length === 0 || !cart ? (
				<div className="text-center mt-10">
					Cart is empty.{" "}
					<Link
						className="font-medium text-indigo-600 hover:text-indigo-500"
						href={"/"}
					>
						Go to shopping
					</Link>
				</div>
			) : (
				<form className="mt-12">
					<section aria-labelledby="cart-heading">
						<h2 id="cart-heading" className="sr-only">
							Items in your shopping cart
						</h2>

						<ul
							role="list"
							className="divide-y divide-gray-200 border-b border-t border-gray-200"
						>
							{cart?.items.map((product) => (
								<li key={product.id} className="flex gap-3 items-center py-6">
									<div className="flex-shrink-0 ">
										<Image
											src={product.image}
											alt={product.name}
											className=" rounded-md object-cover object-center "
											width={50}
											height={50}
										/>
									</div>

									<div className=" flex flex-1 gap-4 justify-between flex-col">
										<div>
											<div className="flex justify-between">
												<Link href={`/product/${product.slug}`}>
													<h4>{product.name}</h4>
												</Link>
												<p className="ml-4 text-sm font-medium text-gray-900">
													${product.price}
												</p>
											</div>
										</div>

										<div className="flex items-center">
											<button
												className="flex items-center justify-center rounded-md border border-transparent bg-red-600 p-1 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
												disabled={isPending}
												onClick={() =>
													startTransition(async () => {
														const res = await removeItemFromCart(product.id);
														if (res.status === "success") {
															toast.success(res.message);
														} else {
															toast.error(res.message);
														}
													})
												}
											>
												{isPending ? (
													<Loader className="animate-spin w-5 h-5" />
												) : (
													<MinusIcon />
												)}
											</button>
											<span className="px-8 font-bold">{product.qty}</span>
											<button
												className="flex items-center justify-center rounded-md border border-transparent bg-green-600  p-1 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
												disabled={isPending}
												onClick={() =>
													startTransition(async () => {
														const res = await addItemToCart(product);
														if (res.status === "success") {
															toast.success(res.message);
														} else {
															toast.error(res.message);
														}
													})
												}
											>
												{isPending ? (
													<Loader className="animate-spin w-5 h-5" />
												) : (
													<PlusIcon />
												)}
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</section>

					{/* Order summary */}
					<section aria-labelledby="summary-heading" className="mt-10">
						<h2 id="summary-heading" className="sr-only">
							Order summary
						</h2>

						<div>
							<dl className="space-y-4">
								<div className="flex items-center justify-between">
									<dt className="text-base font-medium text-gray-900">
										Subtotal
									</dt>
									<dd className="ml-4 text-base font-medium text-gray-900">
										${cart?.items.reduce((acc, i) => acc + i.price * i.qty, 0)}
									</dd>
								</div>
							</dl>
							<p className="mt-1 text-sm text-gray-500">
								Shipping and taxes will be calculated at checkout.
							</p>
						</div>

						<div className="mt-10">
							<button
								type="button"
								disabled={isPending}
								className="w-full flex justify-center rounded-md border border-transparent mx-auto bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
								onClick={() =>
									startTransition(() => router.push("/shipping-address"))
								}
							>
								{isPending ? (
									<Loader className="animate-spin  w-5 h-5" />
								) : (
									"Checkout"
								)}
							</button>
						</div>

						<div className="mt-6 text-center text-sm text-gray-500">
							<p>
								or{" "}
								<Link
									href="/"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Continue Shopping
									<span aria-hidden="true"> &rarr;</span>
								</Link>
							</p>
						</div>
					</section>
				</form>
			)}
		</div>
	);
};

export default CartTable;
