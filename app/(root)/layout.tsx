import { auth } from "@/auth";
import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	return (
		<div className="flex flex-col min-h-screen">
			<Header user={session?.user!} />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
