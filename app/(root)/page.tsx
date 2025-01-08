import ProductList from "@/components/product-list/product-list";
import { getProducts } from "@/lib/actions/product.actions";

const Home = async () => {
	const { data } = await getProducts();
	return <ProductList products={data} />;
};

export default Home;
