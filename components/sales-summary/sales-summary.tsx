import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
	CursorArrowRaysIcon,
	EnvelopeOpenIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import {
	BarcodeIcon,
	ChartBar,
	DollarSignIcon,
	Users2Icon,
} from "lucide-react";
import Link from "next/link";
import SalesChart from "../sales-chart/sales-chart";

interface OrderSummary {
	ordersCount: number;
	productsCount: number;
	usersCount: number;
	salesData: {
		month: string;
		totalSales: number;
	}[];
	latestSales: ({
		user: {
			name: string;
		};
	} & {
		id: string;
		createdAt: Date;
		userId: string;
		deliveredAt: Date | null;
		totalPrice: Prisma.Decimal;
	})[];
	totalSales: Prisma.GetOrderAggregateType<{ _sum: { totalPrice: true } }>;
}

export default function SalesSummary({
	orderSummary,
}: {
	orderSummary: OrderSummary;
}) {
	return (
		<div>
			<h1 className="font-semibold leading-6 text-gray-900 text-4xl text-center">
				Dashboard
			</h1>

			<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				<div className="relative overflow-hidden rounded-lg bg-white px-4 pb-6 pt-5 shadow  sm:pt-6">
					<dt>
						<div className="absolute rounded-md bg-emerald-500 p-3">
							<DollarSignIcon className="text-white" />{" "}
						</div>
						<p className="ml-16 truncate text-sm font-medium text-gray-500">
							Total Revenue
						</p>
					</dt>
					<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
						<p className="text-2xl font-semibold text-gray-900">
							{" "}
							{Number(orderSummary.totalSales._sum.totalPrice)}$
						</p>
					</dd>
				</div>
				<div className="relative overflow-hidden rounded-lg bg-white px-4 pb-6 pt-5 shadow  sm:pt-6">
					<dt>
						<div className="absolute rounded-md bg-emerald-500 p-3">
							<ChartBar className="text-white" />{" "}
						</div>
						<p className="ml-16 truncate text-sm font-medium text-gray-500">
							Sales
						</p>
					</dt>
					<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
						<p className="text-2xl font-semibold text-gray-900">
							{orderSummary.ordersCount}
							{/* {Number(orderSummary.totalSales._sum.totalPrice)}$ */}
						</p>
					</dd>
				</div>
				<div className="relative overflow-hidden rounded-lg bg-white px-4 pb-6 pt-5 shadow  sm:pt-6">
					<dt>
						<div className="absolute rounded-md bg-emerald-500 p-3">
							<Users2Icon className="text-white" />{" "}
						</div>
						<p className="ml-16 truncate text-sm font-medium text-gray-500">
							Customers
						</p>
					</dt>
					<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
						<p className="text-2xl font-semibold text-gray-900">
							{orderSummary.usersCount}
						</p>
					</dd>
				</div>
				<div className="relative overflow-hidden rounded-lg bg-white px-4 pb-6 pt-5 shadow  sm:pt-6">
					<dt>
						<div className="absolute rounded-md bg-emerald-500 p-3">
							<BarcodeIcon className="text-white" />{" "}
						</div>
						<p className="ml-16 truncate text-sm font-medium text-gray-500">
							Products
						</p>
					</dt>
					<dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
						<p className="text-2xl font-semibold text-gray-900">
							{orderSummary.productsCount}
						</p>
					</dd>
				</div>
			</dl>
			<div className="grid grid-cols-2 md:grid-cols-7 mt-10">
				<div className="col-span-4">
					<h3 className="font-semibold leading-6 text-gray-900">OverView</h3>
					<SalesChart salesData={orderSummary.salesData} />
				</div>
				<div className="col-span-3">
					<h3 className="font-semibold leading-6 text-gray-900">
						Recent Sales
					</h3>
					<div className="mt-8 flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Buyer
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Date
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Total
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Action
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{orderSummary.latestSales.map((sale) => (
												<tr key={sale.id}>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
														{sale.user.name}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{sale.createdAt.toLocaleDateString()}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{Number(sale.totalPrice)}$
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														<Link
															href={`/order/${sale.id}`}
															className="text-indigo-600 hover:text-indigo-900"
														>
															Details
														</Link>
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
		</div>
	);
}
