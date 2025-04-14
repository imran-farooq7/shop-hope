"use client";
import { Disclosure } from "@headlessui/react";
import { UserIcon } from "lucide-react";
import { Session, User } from "next-auth";
import Link from "next/link";
import UserMenu from "../shared/header/user-menu";
import Search from "../search/search";

const AdminNav = ({
	user,
}: {
	user: {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		role?: string;
	};
}) => {
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between items-center">
							<div className="flex">
								<div className="flex gap-4 flex-shrink-0 items-center">
									<Link href={"/"} className="text-2xl font-bold">
										Hope Shop
									</Link>
									<Link href={"/admin/overview"}>Overview</Link>
									<Link href={"/admin/products"}>Products</Link>
									<Link href={"/admin/orders"}>Orders</Link>
									<Link href={"/admin/users"}>Users</Link>
								</div>
							</div>
							<Search />
							<div className="sm:ml-6 flex gap-4 sm:gap-8 items-center">
								{user ? (
									<UserMenu user={user} />
								) : (
									<Link
										href={"/sign-in"}
										className="flex bg-emerald-500 text-white hover:bg-emerald-700 rounded-lg py-2 px-4 gap-1"
									>
										<UserIcon /> <span>Sign in</span>
									</Link>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
};

export default AdminNav;
