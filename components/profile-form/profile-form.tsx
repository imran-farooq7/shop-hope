"use client";

import { updateUserProfile } from "@/lib/actions/user.actions";
import { Loader, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";

const ProfileForm = () => {
	const { data: session, update } = useSession();
	const [userName, setUserName] = useState(session?.user?.name);
	const [isPending, startTransition] = useTransition();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(async () => {
			const res = await updateUserProfile({
				email: session?.user?.email!,
				name: userName!,
			});
			const newSession = {
				...session,
				user: { ...session?.user, name: userName },
			};
			await update(newSession);
			if (res.status === "success") {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		});
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Profile
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
					<form className="space-y-6" onSubmit={handleSubmit}>
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
									defaultValue={session?.user?.email!}
									required
									className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									value={userName!}
									onChange={(e) => setUserName(e.target.value)}
									required
									className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<button
							type="submit"
							disabled={isPending}
							className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							{isPending ? (
								<Loader className="w-5 h-5 animate-spin" />
							) : (
								"Update"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProfileForm;
