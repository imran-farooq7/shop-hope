import { getAllProducts, getProducts } from "@/lib/actions/product.actions";

const ProductsPages = async () => {
	const { products, productsCount } = await getAllProducts();
	return <div>products</div>;
};

export default ProductsPages;
