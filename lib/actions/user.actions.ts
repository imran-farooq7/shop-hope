"use server";
import { signIn, signOut } from "@/auth";
export const signInCredentials = async (
	prevState: unknown,
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
		// if (isRedirectError(error)) {
		// 	throw new Error();
		// }
		console.log(error);
		return { status: "error", message: "Invalid email or password" };
	}
};
export const userSignOut = async () => {
	await signOut();
};
