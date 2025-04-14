import { auth } from "@/auth";
import DeleteButton from "@/components/shared/delete-button/delete-button";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";
import Link from "next/link";

const OrdersPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const session = await auth();
	if (session?.user.role !== "admin") throw new Error("User not authorized");
	const { query } = await searchParams;
	const orders = await getAllOrders({ query: query as string });

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="flex items-center gap-3">
				<h1 className="text-2xl font-bold">Orders</h1>
				{query && (
					<div className="flex gap-4 items-center">
						<p className=" text-gray-700">Filter by "{query}"</p>
						<Link
							href={"/admin/orders"}
							className="flex w-auto justify-center rounded-md bg-emerald-500 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							Remove Filter
						</Link>
					</div>
				)}
			</div>{" "}
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										ID
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										DATE
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										BUYER
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										TOTAL
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										PAID
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										DELIVERED
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										ACTIONS
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{orders.orders.map((order) => (
									<tr key={order.id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											{order.id}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{order.createdAt.toLocaleDateString()}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{order.user.name}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											${Number(order.totalPrice)}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{order.isPaid
												? order.paidAt?.toLocaleDateString()
												: "Not Paid"}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{order.isDelivered
												? order.deliveredAt?.toLocaleDateString()
												: "Not Delivered"}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											<DeleteButton action={deleteOrder} id={order.id} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
