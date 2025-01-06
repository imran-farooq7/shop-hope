const ProductList = ({
	products,
}: {
	products: {
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
		isFeatured: boolean;
		banner: null;
	}[];
}) => {
	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl mb-4 font-bold tracking-tight text-gray-900">
					Newest Arrivals
				</h2>

				<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
					{products.map((product) => (
						<div
							key={product.slug}
							className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
						>
							<div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
								<img
									src={product.images}
									alt={product.name}
									className="h-full w-full object-cover object-center sm:h-full sm:w-full"
								/>
							</div>
							<div className="flex flex-1 flex-col space-y-2 p-4">
								<h3 className="text-sm font-medium text-gray-900">
									<a href={product.slug}>
										<span aria-hidden="true" className="absolute inset-0" />
										{product.name}
									</a>
								</h3>
								<p className="text-sm text-gray-500">{product.description}</p>
								<div className="flex flex-1 flex-col justify-end">
									<p className="text-sm italic text-gray-500">
										{product.brand}
									</p>
									<p className="text-base font-medium text-gray-900">
										{product.price} $
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default ProductList;
