import { auth } from "@/auth";
import ProfileForm from "@/components/profile-form/profile-form";
import { SessionProvider } from "next-auth/react";

const ProfilePage = async () => {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<ProfileForm />
		</SessionProvider>
	);
};

export default ProfilePage;
