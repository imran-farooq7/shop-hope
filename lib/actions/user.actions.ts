"use server";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { hashSync } from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
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
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		console.log(error);
		return { status: "error", message: "Invalid email or password" };
	}
};
export const userSignOut = async () => {
	await signOut();
};
export const signUpUser = async (prevState: unknown, formData: FormData) => {
	try {
		if (
			!formData.get("name") &&
			!formData.get("email") &&
			!formData.get("password") &&
			!formData.get("confirmPassword")
		) {
			return {
				status: "error",
				message: "Provide a valid email or password",
			};
		}
		if (
			formData.get("password")?.toString() !==
			formData.get("confirmPassword")?.toString()
		) {
			return {
				status: "error",
				message: "password and confirm password do not match",
			};
		}
		const password = formData.get("password")?.toString();
		const hashedPassword = hashSync(formData.get("password")!.toString(), 10);
		const user = {
			name: formData.get("name")!.toString(),
			email: formData.get("email")!.toString(),
			password: hashedPassword,
		};
		await prisma.user.create({ data: user });
		await signIn("credentials", {
			email: user.email,
			password,
		});
		return {
			status: "success",
			message: "User register successfully",
		};
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { status: "error", message: "User registration failed" };
	}
};
export const getUserById = async (id: string) => {
	const user = await prisma.user.findFirst({
		where: {
			id,
		},
	});
	if (!user) throw new Error("User not found");
	return user;
};
