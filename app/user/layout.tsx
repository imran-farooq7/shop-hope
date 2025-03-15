import { auth } from "@/auth";
import Header from "@/components/shared/header";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<Header user={session?.user!} />
				{children}
			</main>
		</div>
	);
};

export default UserLayout;
