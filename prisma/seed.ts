import { PrismaClient } from "@prisma/client";
import data from "@/db/sample-data";
const main = async () => {
	const prisma = new PrismaClient();
	await prisma.product.deleteMany();
	await prisma.product.createMany({ data: data.products });
	console.log("data seeded successfully");
};
main();
