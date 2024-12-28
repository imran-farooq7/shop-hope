import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Hope Shop",
	description:
		"A modern ecommerce store that provides customers with a variety of products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>{children}</body>
		</html>
	);
}
