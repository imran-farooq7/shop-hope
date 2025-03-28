"use client";

import {
	deliverOrder,
	updateOrderToPaid,
	updateOrderToPaidCod,
} from "@/lib/actions/order.actions";
import { Address } from "@/lib/types";
import { formatDateToYYMMDD } from "@/lib/utils";
import { Order, OrderItem } from "@prisma/client";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";

const OrderTable = ({
	order,
	orderItem,
	isAdmin,
}: {
	order: Order;
	orderItem: OrderItem[];
	isAdmin: boolean;
}) => {
	const [isPending, startTransition] = useTransition();
	const {
		shippingAddress,
		itemsPrice,
		taxPrice,
		totalPrice,
		paymentMethod,
		isPaid,
		deliveredAt,
		isDelivered,
		paidAt,
		shippingPrice,
		id,
	} = order;
	const { fullName, address, city, country, postalCode } =
		shippingAddress as unknown as Address;
	const handleDelivered = async () => {
		startTransition(async () => {
			const res = await deliverOrder(id);
			if (res.status === "success") {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		});
	};
	const handlePaid = async () => {
		startTransition(async () => {
			const res = await updateOrderToPaidCod(id);
			if (res.status === "success") {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		});
	};
	return (
		<div className="mx-auto grid grid-cols-3 max-w-2xl px-4 py-8 sm:px-6 sm:py-12  lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:py-16 xl:gap-x-24">
			<div className="col-span-2">
				<h1 className="text-3xl font-semibold leading-6 text-emerald-500">
					Order # {order.id}
				</h1>
				<div className="overflow-hidden rounded-lg bg-white shadow mt-8">
					<div className="px-4 py-5 sm:p-6">
						<h2 className="text-xl pb-4">Payment Method</h2>
						<p className="capitalize">{paymentMethod}</p>
						{isPaid ? (
							<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
								Paid at {formatDateToYYMMDD(paidAt?.toLocaleString() as string)}
							</span>
						) : (
							<span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
								Not paid
							</span>
						)}
					</div>
				</div>
				<div className="overflow-hidden rounded-lg bg-white shadow mt-8">
					<div className="px-4 py-5 sm:p-6">
						<h2 className="text-xl pb-2">Shipping Address</h2>
						<p className="pb-3 capitalize">{fullName}</p>
						<p className="pb-3">
							{address}, {city}
							<br />
							{country}
						</p>
						{isDelivered ? (
							<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
								Delivered at{" "}
								{formatDateToYYMMDD(deliveredAt?.toLocaleString() as string)}
							</span>
						) : (
							<span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
								Not delivered
							</span>
						)}
					</div>
				</div>
				<div className="overflow-hidden rounded-lg bg-white shadow mt-8">
					<div className="px-4 py-5 sm:p-6">
						<h2 className="text-xl pb-2">Order Items</h2>

						<div className="flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
									<table className="min-w-full divide-y divide-gray-300">
										<thead>
											<tr>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
												>
													Item
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Quantity
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Price
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{orderItem.map((item) => (
												<tr key={item.productId}>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
														{item.name}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{item.qty}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{String(item.price)}{" "}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-1">
				<h1 className="text-4xl text-center font-bold text-indigo-600">
					Order Summary
				</h1>

				<ul
					role="list"
					className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
				>
					{orderItem.map((product) => (
						<li
							key={product.orderId}
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
									<Link href={`/product/${product.slug}`}>{product.name}</Link>
								</h3>
							</div>
							<p className="flex-none font-medium text-gray-900">
								${Number(product.price)}
							</p>
						</li>
					))}
				</ul>

				<dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
					<div className="flex justify-between">
						<dt>Subtotal</dt>
						<dd className="text-gray-900">${Number(itemsPrice)}</dd>
					</div>

					<div className="flex justify-between">
						<dt>Shipping</dt>
						<dd className="text-gray-900">${Number(shippingPrice)}</dd>
					</div>

					<div className="flex justify-between">
						<dt>Taxes</dt>
						<dd className="text-gray-900">${Number(taxPrice)}</dd>
					</div>

					<div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
						<dt className="text-base">Total</dt>
						<dd className="text-base">${Number(totalPrice)}</dd>
					</div>
				</dl>

				{/* <div className="mt-16 border-gray-200 py-6 text-right">
							<OrderForm />
						</div> */}
				{isAdmin && !isPaid && paymentMethod === "cod" && (
					<button
						onClick={handlePaid}
						disabled={isPending}
						className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-8"
					>
						{isPending ? (
							<LoaderIcon className="animate-spin w-5 h-5" />
						) : (
							"Mark as Paid"
						)}
					</button>
				)}
				{isAdmin && isPaid && !isDelivered && (
					<button
						onClick={handleDelivered}
						disabled={isPending}
						className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-8"
					>
						{isPending ? (
							<LoaderIcon className="animate-spin w-5 h-5" />
						) : (
							"Mark as Delivered"
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default OrderTable;
