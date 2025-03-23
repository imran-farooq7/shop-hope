import { auth } from "@/auth";
import SalesSummary from "@/components/sales-summary/sales-summary";
import { getOrdersSummary } from "@/lib/actions/order.actions";

const AdminOverview = async () => {
	const session = await auth();
	if (session?.user.role !== "admin") throw new Error("User is not authorized");
	const orderSummary = await getOrdersSummary();
	return (
		<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
			<SalesSummary orderSummary={orderSummary} />
		</div>
	);
};

export default AdminOverview;
