import { Decimal } from "@prisma/client/runtime/library";
import ProductCard from "../product-card/product-card";
import { Product } from "@prisma/client";

const ProductList = ({ products }: { products: Product[] }) => {
	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl mb-4 font-bold tracking-tight text-gray-900">
					Newest Arrivals
				</h2>

				<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
					{products.map((product) => (
						<ProductCard product={product} key={product.slug} />
					))}
				</div>
			</div>
		</div>
	);
};
export default ProductList;
