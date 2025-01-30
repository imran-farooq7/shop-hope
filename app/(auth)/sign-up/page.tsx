import { auth } from "@/auth";
import SignUpForm from "@/components/sign-up-form/sign-up-form";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
	searchParams: Promise<{
		callbackUrl: string;
	}>;
}
const SignUpPage = async ({ searchParams }: Props) => {
	const { callbackUrl } = await searchParams;
	const session = await auth();
	if (session) {
		redirect(callbackUrl || "/");
	}
	return (
		<div>
			<SignUpForm />
		</div>
	);
};

export default SignUpPage;
