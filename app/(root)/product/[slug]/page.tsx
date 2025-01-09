import { getProductBySlug } from "@/lib/actions/product.actions";
import {
	CheckIcon,
	ShieldCheckIcon,
	StarIcon,
	XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>;
}
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
const ProductDetailsPage = async ({ params }: Props) => {
	const { slug } = await params;
	const { data: product } = await getProductBySlug(slug);
	if (!product) notFound();
	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
				{/* Product details */}
				<div className="lg:max-w-lg lg:self-end">
					<div className="mt-4">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							{product.name}
						</h1>
					</div>

					<section aria-labelledby="information-heading" className="mt-4">
						<h2 id="information-heading" className="sr-only">
							Product information
						</h2>

						<div className="flex items-center">
							<p className="text-lg text-gray-900 sm:text-xl">
								${product.price.toString()}
							</p>

							<div className="ml-4 border-l border-gray-300 pl-4">
								<h2 className="sr-only">Reviews</h2>
								<div className="flex items-center">
									<div>
										<div className="flex items-center">
											{[0, 1, 2, 3, 4].map((rating) => (
												<StarIcon
													key={rating}
													className={classNames(
														Number(product.rating) > rating
															? "text-yellow-400"
															: "text-gray-300",
														"h-5 w-5 flex-shrink-0"
													)}
													aria-hidden="true"
												/>
											))}
										</div>
										<p className="sr-only">
											{product.rating.toString()} out of 5 stars
										</p>
									</div>
									<p className="ml-2 text-sm text-gray-500">
										{product.reviews} reviews
									</p>
								</div>
							</div>
						</div>

						<div className="mt-4 space-y-6">
							<p className="text-base text-gray-500">{product.description}</p>
						</div>

						<div className="mt-6 flex items-center">
							{product.stock > 0 ? (
								<>
									<CheckIcon
										className="h-5 w-5 flex-shrink-0 text-green-500"
										aria-hidden="true"
									/>
									<p className="ml-2 text-sm text-gray-500">
										In stock and ready to ship
									</p>
								</>
							) : (
								<>
									<XMarkIcon
										className="h-5 w-5 flex-shrink-0 text-red-500"
										aria-hidden="true"
									/>
									<p className="ml-2 text-sm text-gray-500">Out of stock</p>
								</>
							)}
						</div>
					</section>
				</div>

				{/* Product image */}
				<div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
					<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
						<Image
							src={product.image}
							alt={product.name}
							className="h-full w-full object-cover object-center"
							width={500}
							height={500}
						/>
					</div>
				</div>

				{/* Product form */}
				<div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
					<section aria-labelledby="options-heading">
						<h2 id="options-heading" className="sr-only">
							Product options
						</h2>

						<form>
							<div className="mt-10">
								<button
									type="submit"
									className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
								>
									Add to bag
								</button>
							</div>
							<div className="mt-6 text-center">
								<a href="#" className="group inline-flex text-base font-medium">
									<ShieldCheckIcon
										className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
									<span className="text-gray-500 hover:text-gray-700">
										Lifetime Guarantee
									</span>
								</a>
							</div>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
