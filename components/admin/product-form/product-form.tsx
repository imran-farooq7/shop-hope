"use client";

import { createProduct } from "@/lib/actions/product.actions";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import toast from "react-hot-toast";

const ProductForm = () => {
	return (
		<form className="space-y-5 mt-5">
			<div className="flex flex-col md:flex-row gap-5">
				<div className="w-full">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						className="block placeholder:pl-2 w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Enter product name"
					/>
				</div>
				<div className="w-full">
					<label htmlFor="slug">Slug</label>
					<input
						type="text"
						name="slug"
						id="slug"
						className="block placeholder:pl-2 w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Enter slug"
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-5">
				<div className="w-full">
					<label htmlFor="category">Category</label>
					<input
						type="text"
						name="category"
						id="category"
						className="block placeholder:pl-2 w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Enter category"
					/>
				</div>
				<div className="w-full">
					<label htmlFor="brand">Brand</label>
					<input
						type="text"
						name="brand"
						id="brand"
						className="block placeholder:pl-2 w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Enter brand"
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-5">
				<div className="w-full">
					<label htmlFor="price">Price</label>
					<input
						type="number"
						name="price"
						id="price"
						className="block placeholder:pl-2  w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="0"
					/>
				</div>
				<div className="w-full">
					<label htmlFor="stock">Stock</label>
					<input
						type="number"
						name="stock"
						id="stock"
						className="block placeholder:pl-2 w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="0"
					/>
				</div>
			</div>
			<div className="flex flex-col">
				<label
					htmlFor="image"
					className="block text-sm/6 font-medium text-gray-900"
				>
					Image
				</label>
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
					<div className="text-center">
						<PhotoIcon
							aria-hidden="true"
							className="mx-auto size-12 text-gray-300"
						/>
						<div className="mt-4 flex text-sm/6 text-gray-600">
							<label
								htmlFor="image"
								className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
							>
								<span>Upload a file</span>
								<input
									id="image"
									name="image"
									type="file"
									className="sr-only"
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
					</div>
				</div>
			</div>
			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Description
				</label>
				<div className="mt-2">
					<textarea
						rows={4}
						name="description"
						id="description"
						className="block w-full rounded-md border-0 py-1.5 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						defaultValue={""}
					/>
				</div>
			</div>
			<div>
				<button className="flex justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
					Create Product
				</button>
			</div>
		</form>
	);
};

export default ProductForm;
