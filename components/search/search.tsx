"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();
	const pathName = usePathname();
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (search.trim() === "") return;
		const searchParams = new URLSearchParams(search);
		if (search !== "") {
			searchParams.set("query", search);
			if (pathName.includes(`/admin/products`)) {
				router.push(`/admin/products?query=${searchParams.get("query")}`);
			}
			if (pathName.includes(`/admin/orders`)) {
				router.push(`/admin/orders?query=${searchParams.get("query")}`);
			}
			if (pathName.includes(`/admin/users`)) {
				console.log(search);

				router.push(`/admin/users?query=${searchParams.get("query")}`);
			}
		} else {
			searchParams.delete("query");
		}
		// console.log(searchParams.getAll("q").toString());
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<MagnifyingGlassIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</div>
					<input
						id="search"
						name="search"
						className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Search"
						type="search"
						value={search}
						onChange={handleSearch}
					/>
				</div>
			</div>
		</form>
	);
};

export default Search;
