import { auth } from "@/auth";
import AdminNav from "@/components/admin-nav/admin-nav";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<AdminNav user={session?.user!} />
				{children}
			</main>
		</div>
	);
};

export default AdminLayout;
