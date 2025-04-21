import ProductCard from "@/components/product-card/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";

const SearchPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const { query } = await searchParams;
	const { products } = await getAllProducts({ query: query as string });
	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
				{products.length === 0 && <h1>No Product found</h1>}
				{products.map((product) => (
					<ProductCard product={product} key={product.slug} />
				))}
			</div>
		</div>
	);
};

export default SearchPage;
