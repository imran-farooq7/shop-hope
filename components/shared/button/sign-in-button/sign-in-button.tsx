import { useFormStatus } from "react-dom";

const SignInButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
		>
			{pending ? (
				<span className="animate-pulse">Signing in...</span>
			) : (
				"Sign in"
			)}
		</button>
	);
};

export default SignInButton;
