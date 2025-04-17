import DeleteButton from "@/components/shared/delete-button/delete-button";
import { deleteOrder } from "@/lib/actions/order.actions";
import { getAllProducts } from "@/lib/actions/product.actions";
import Link from "next/link";

const ProductsPages = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const { query } = await searchParams;
	const { products } = await getAllProducts();
	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="flex justify-between">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-bold">Products</h1>
					{query && (
						<div className="flex gap-4 items-center">
							<p className=" text-gray-700">Filter by "{query}"</p>
							<Link
								href={"/admin/products"}
								className="flex w-auto justify-center rounded-md bg-emerald-500 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								Remove Filter
							</Link>
						</div>
					)}
				</div>
				<Link
					href={"/admin/products/create"}
					className="flex w-auto justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					Create Product
				</Link>
			</div>
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
										NAME
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										PRICE
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										CATEGORY
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										STOCK
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										RATINGS
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
								{products.map((product) => (
									<tr key={product.id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											{product.id}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{product.name}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{Number(product.price)}$
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{product.category}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{product.stock}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{Number(product.rating)}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											<DeleteButton action={deleteOrder} id={product.id} />
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

export default ProductsPages;
