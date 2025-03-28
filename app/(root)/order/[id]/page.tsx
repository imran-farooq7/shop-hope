import { auth } from "@/auth";
import OrderTable from "@/components/order-table/order-table";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{
		id: string;
	}>;
}
const OrderPage = async ({ params }: Props) => {
	const { id } = await params;
	const order = await getOrderById(id);
	const session = await auth();
	if (!order) notFound();
	return (
		<OrderTable
			order={order}
			orderItem={order.OrderItem}
			isAdmin={session?.user.role === "admin" || false}
		/>
	);
};

export default OrderPage;
