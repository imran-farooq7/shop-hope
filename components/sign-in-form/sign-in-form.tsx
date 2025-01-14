"use client";
import { signInCredentials } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useActionState } from "react";
import SignInButton from "../shared/button/sign-in-button/sign-in-button";
import { useSearchParams } from "next/navigation";

const SignInForm = () => {
	const [state, action] = useActionState(signInCredentials, {
		message: "",
		status: "",
	});
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form className="space-y-6" action={action}>
						<input type="hidden" name="callbackUrl" value={callbackUrl} />
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label
									htmlFor="remember-me"
									className="ml-3 block text-sm leading-6 text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm leading-6">
								<Link
									href="#"
									className="font-semibold text-emerald-500 hover:text-emerald-600"
								>
									Forgot password?
								</Link>
							</div>
						</div>

						<div>
							<SignInButton />{" "}
						</div>
					</form>
				</div>
				{state && state.status === "error" && (
					<p className="text-red-600 text-center">{state.message}</p>
				)}

				<p className="mt-10 text-center text-sm text-gray-500">
					Don't have an account?{" "}
					<Link
						href="sign-up"
						className="font-semibold leading-6 text-emerald-500 hover:text-emerald-600"
					>
						Sign up now
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignInForm;
