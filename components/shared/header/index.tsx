"use client";
import { Disclosure } from "@headlessui/react";
import { ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { User } from "next-auth";

const Header = ({ user }: { user: User }) => {
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="flex flex-shrink-0 items-center">
									<Link href={"/"} className="text-2xl font-bold">
										Hope Shop
									</Link>
								</div>
							</div>
							<div className="sm:ml-6 flex gap-4 sm:gap-8 items-center">
								<Link href={"/cart"} className="flex gap-1">
									<ShoppingCart className="text-black" />
									<span>Cart</span>
								</Link>
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

export default Header;
