"use server";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
export const signInCredentials = async (
	prevState: Record<string, unknown>,
	formData: FormData
) => {
	try {
		if (formData.get("email") && formData.get("password")) {
			await signIn("credentials", formData);
			return {
				status: "success",
				message: "Sign in successfully",
			};
		}
	} catch (error: unknown) {
		if (isRedirectError(error)) {
			throw new Error();
		}
		return { status: "error", message: "Invalid email or password" };
	}
};
export const userSignOut = async () => {
	await signOut();
};
