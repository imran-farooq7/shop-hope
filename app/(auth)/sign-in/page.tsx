import { auth } from "@/auth";
import SignInForm from "@/components/sign-in-form/sign-in-form";
import { redirect } from "next/navigation";
interface Props {
	searchParams: Promise<{
		callbackUrl: string;
	}>;
}
const SignInPage = async ({ searchParams }: Props) => {
	const { callbackUrl } = await searchParams;
	const session = await auth();
	if (session) {
		return redirect(callbackUrl || "/");
	}
	return (
		<div>
			<SignInForm />
		</div>
	);
};

export default SignInPage;
