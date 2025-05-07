import { deleteOrder } from "@/lib/actions/order.actions";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const ReviewForm = ({
	userId,
	productId,
	onReviewSubmit,
	open,
	setOpen,
}: {
	userId: string;
	productId: string;
	onReviewSubmit?: () => void;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<Dialog open={open} onClose={setOpen} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
					>
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="">
								<div className="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<DialogTitle
										as="h1"
										className="text-base font-semibold text-center text-gray-900"
									>
										Write a Review
									</DialogTitle>

									<form action="">
										<div>
											<label
												htmlFor="title"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Title
											</label>
											<div className="mt-2">
												<input
													id="title"
													name="title"
													type="text"
													placeholder="title"
													required
													className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div className="mt-2">
											<label htmlFor="description">Description</label>
											<textarea
												rows={4}
												name="description"
												id="description"
												placeholder="description"
												className="block w-full rounded-md border-0 py-1.5 pl-2 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												defaultValue={""}
											/>
										</div>
										<div className="mt-2">
											<label
												htmlFor="ratings"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Rating
											</label>
											<select
												id="ratings"
												name="ratings"
												className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
											>
												<option value={"1"}>1</option>
												<option value={"2"}>2</option>
												<option value={"3"}>3</option>
												<option value={"4"}>4</option>
												<option value={"5"}>5</option>
											</select>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="py-4">
							<button
								type="button"
								// onClick={deleteOrder}
								// disabled={isPending}
								className="block w-1/2 mx-auto justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 "
							>
								{false ? <Loader className="animate-spin w-5 h-5" /> : "Submit"}
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default ReviewForm;
