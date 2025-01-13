import { auth } from "@/auth";
import SignInForm from "@/components/sign-in-form/sign-in-form";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
	const session = await auth();
	if (session) {
		return redirect("/");
	}
	return (
		<div>
			<SignInForm />
		</div>
	);
};

export default SignInPage;
