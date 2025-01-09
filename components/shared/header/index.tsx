"use client";
import {
	Transition,
	Dialog,
	TransitionChild,
	DialogPanel,
	TabGroup,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	MenuButton,
	MenuItem,
	MenuItems,
	Menu,
} from "@headlessui/react";
import {
	ShoppingCart,
	UserIcon,
	CrossIcon,
	BellIcon,
	Menu as HamburgerMenu,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
								<Link
									href={"/sign-in"}
									className="flex bg-emerald-500 text-white hover:bg-emerald-700 rounded-lg py-2 px-4 gap-1"
								>
									<UserIcon /> <span>Sign in</span>
								</Link>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
};

export default Header;
