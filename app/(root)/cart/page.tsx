import CartTable from "@/components/cart-table/cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";

const CartPage = async () => {
	const cart = await getMyCart();
	return <CartTable cart={cart} />;
};
export default CartPage;
