"use client";

import { useState } from "react";
import Modal from "../modal/Modal";
interface Props {
	id: string;
	action: (id: string) => Promise<{
		status: string;
		message: string;
	}>;
}
const DeleteButton = ({ action, id }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				className="bg-red-500 px-4 py-2 rounded-md text-white"
				onClick={() => setOpen(true)}
			>
				Delete
			</button>
			<Modal open={open} setOpen={setOpen} id={id} action={action} />
		</>
	);
};

export default DeleteButton;
