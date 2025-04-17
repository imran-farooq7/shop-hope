import DeleteButton from "@/components/shared/delete-button/delete-button";
import { deleteOrder } from "@/lib/actions/order.actions";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";

const UsersPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const { query } = await searchParams;
	const { users } = await getAllUsers({ query: query as string });
	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="flex items-center gap-3">
				<h1 className="text-2xl font-bold">Users</h1>
				{query && (
					<div className="flex gap-4 items-center">
						<p className=" text-gray-700">Filter by "{query}"</p>
						<Link
							href={"/admin/users"}
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
										NAME
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										EMAIL
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										ROLE
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
								{users.map((user) => (
									<tr key={user.id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											{user.id}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{user.name}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{user.email}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{user.role}
										</td>

										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											<DeleteButton action={deleteUser} id={user.id} />
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

export default UsersPage;
