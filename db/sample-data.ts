import { hashSync } from "bcryptjs";
const sampleData = {
	users: [
		{
			name: "Imran",
			email: "admin@test.com",
			password: hashSync("imran", 10),
			role: "admin",
		},
		{
			name: "Farooq",
			email: "user@test.com",
			password: hashSync("farooq", 10),
			role: "user",
		},
	],
	products: [
		{
			name: "Itel a33",
			slug: "itel-a33",
			category: "Mobile phones",
			description:
				"the iTel A33 Plus features a 5-inch display with a screen resolution of 480 x 854 pixels. The phone runs Android 11 (Go Edition), powering it, is a Quad core, 1.3GHz MediaTek MT6580A processor paired with 1GB of RAM",
			image: "/assets/p1.jpg",
			price: 59.99,
			brand: "Itel",
			rating: 4.5,
			reviews: 10,
			stock: 5,
		},
		{
			name: "Xioami Redmi 9t",
			slug: "xioami-redmi-9t",
			category: "Mobile phones",
			description:
				"device will be powered by one of the powerful chipset called a Qualcomm snapdragon 662. This is a high-quality chipset that has been introduced in different brands.",
			image: "/assets/p2.jpg",
			price: 85.9,
			brand: "Xioami Redmi",
			rating: 4.2,
			reviews: 8,
			stock: 10,
		},
		{
			name: "Samsung Galaxy A12",
			slug: "samsung-galaxy-a12",
			category: "Mobile phones",
			description:
				"The Samsung Galaxy A12 will be packing a MediaTek Helio P35 chipset. The internal storage capacity of the coming smartphone is 64 gigabytes which means that Samsung's Galaxy A12",
			image: "/assets/p3.jpg",
			price: 99.95,
			brand: "Samsung",
			rating: 4.9,
			reviews: 3,
			stock: 0,
		},
		{
			name: "Tecno Pova Neo",
			slug: "tecno-pova-neo",
			category: "Mobile phones",
			description:
				"Tecno switched the Helio P22 for a Helio G25 platform and brought 6GB RAM + 128GB storage on board.",
			image: "/assets/p4.jpg",
			price: 39.95,
			brand: "Tecno",
			rating: 3.6,
			reviews: 5,
			stock: 10,
		},
		{
			name: "Tecno Spark",
			slug: "tecno-spark",
			category: "Mobile phones",
			description:
				"Cell Phone(3+64GB), 6.53 HD+ Full Screen Unlocked Smartphone, 5150mAh Battery Android Phone with Dual SIM (4G LTE) Android 11",
			image: "/assets/p5.jpg",
			price: 79.99,
			brand: "Tecno",
			rating: 4.7,
			reviews: 18,
			stock: 6,
		},
		{
			name: "Tecno Spark 7",
			slug: "tecno-spark-7",
			category: "Mobile phones",
			description:
				"This upcoming new smartphone will be powered by one of the powerful chipsets available for smartphones in the market that is called MediaTek Helio G70.",
			image: "/assets/p6.jpg",
			price: 49.99,
			brand: "Tecno",
			rating: 4.6,
			reviews: 12,
			stock: 5,
		},
		{
			name: "Marshmallow Fleece black hoodie for Men",
			slug: "marshmallow-fleece-black-hoodie",
			category: "Men's cloths",
			description:
				"This hoodie is made of 100% cotton and is very comfortable to wear. It is perfect for the cold weather and can be worn with jeans or sweatpants.",
			image: "/assets/p7.jpg",
			price: 10.99,
			brand: "Polo",
			rating: 4.6,
			reviews: 12,
			stock: 8,
		},
		{
			name: "Adidas Originals T-Shirts",
			slug: "adidas-originals-shirts",
			category: "Men's cloths",
			description:
				"This T-shirt is made of 100% cotton and is very comfortable to wear. It is perfect for the hot weather and can be worn with jeans or shorts.",
			image: "/assets/p8.jpg",
			price: 50.99,
			brand: "Adidas",
			rating: 4.6,
			reviews: 12,
			stock: 4,
		},
	],
};

export default sampleData;
