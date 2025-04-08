import ProductForm from "@/components/admin/product-form/product-form";

const CreateProductPage = () => {
	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<h1 className="text-2xl font-bold">Create Product</h1>
			<ProductForm />
		</div>
	);
};

export default CreateProductPage;
