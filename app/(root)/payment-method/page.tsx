import { auth } from "@/auth";
import PaymentMethodForm from "@/components/payment-method-form/payment-method-form";
import { getUserById } from "@/lib/actions/user.actions";

const PaymentMethodPage = async () => {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) throw new Error("No user found");
	const user = await getUserById(userId);
	return <PaymentMethodForm paymentMethod={user.paymentMethod!} />;
};

export default PaymentMethodPage;
