import ProductList from "@/components/product-list/product-list";
import data from "@/db/sample-data";

const Home = () => {
	return <ProductList products={data.products} />;
};

export default Home;
