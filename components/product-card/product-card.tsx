import Image from "next/image";
import Link from "next/link";

interface Product {
	name: string;
	slug: string;
	category: string;
	description: string;
	images: string;
	price: number;
	brand: string;
	rating: number;
	numReviews: number;
	stock: number;
}
const ProductCard = ({ product }: { product: Product }) => {
	return (
		<div
			key={product.slug}
			className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
		>
			<div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
				<Image
					src={product.images}
					alt={product.name}
					width={300}
					height={300}
					priority
					className="h-full w-full object-cover object-center sm:h-full sm:w-full"
				/>
			</div>
			<div className="flex flex-1 flex-col space-y-2 p-4">
				<h3 className="text-sm font-medium text-gray-900">
					<Link href={`/product/${product.slug}`}>
						<span aria-hidden="true" className="absolute inset-0" />
						{product.name}
					</Link>
				</h3>
				<p className="text-sm text-gray-500">{product.description}</p>
				<div className="flex flex-1 flex-col justify-end">
					<p className="text-sm italic text-gray-500">{product.brand}</p>
					<div className="flex justify-between">
						{product.stock > 0 ? (
							<h2 className="text-xl font-bold text-gray-900">
								<span className="align-super text-base font-medium">$</span>
								{product.price}
							</h2>
						) : (
							<p className="text-sm text-gray-500">Out of stock</p>
						)}
						<p>{product.rating}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
