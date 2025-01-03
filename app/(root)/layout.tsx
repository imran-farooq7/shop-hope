import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
