import { auth } from "@/auth";
import ShippingForm from "@/components/shipping-form/shipping-form";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Address } from "@/lib/types";
import { redirect } from "next/navigation";
const ShippingAddress = async () => {
	const cart = await getMyCart();
	if (!cart || cart.items.length === 0) redirect("/cart");
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) throw new Error("No user id found");
	const user = await getUserById(userId);
	return <ShippingForm address={user.address as unknown as Address} />;
};

export default ShippingAddress;
