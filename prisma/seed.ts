import { PrismaClient } from "@prisma/client";
import data from "@/db/sample-data";
const main = async () => {
	const prisma = new PrismaClient();
	await prisma.product.deleteMany();
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.verificationToken.deleteMany();
	await prisma.user.deleteMany();
	await prisma.product.createMany({ data: data.products });
	await prisma.user.createMany({ data: data.users });
	console.log("data seeded successfully");
};
main();
