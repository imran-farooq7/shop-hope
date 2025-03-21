import { userSignOut } from "@/lib/actions/user.actions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { User } from "next-auth";
import Link from "next/link";

const UserMenu = ({
	user,
}: {
	user: {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		role?: string | null;
	};
}) => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					Welcome {user.name}
				</MenuButton>
			</div>

			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
			>
				<div className="py-1">
					{user.role === "admin" && (
						<MenuItem>
							<Link
								href="/admin/overview"
								className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
							>
								Admin
							</Link>
						</MenuItem>
					)}
					<MenuItem>
						<Link
							href="/user/orders"
							className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
						>
							Orders History
						</Link>
					</MenuItem>
					<MenuItem>
						<Link
							href="/user/profile"
							className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
						>
							Profile
						</Link>
					</MenuItem>
					<MenuItem>
						<button
							onClick={userSignOut}
							className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
						>
							Sign out
						</button>
					</MenuItem>
				</div>
			</MenuItems>
		</Menu>
	);
};

export default UserMenu;
