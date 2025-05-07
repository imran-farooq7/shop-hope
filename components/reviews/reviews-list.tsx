"use client";
import { Review } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import ReviewForm from "../review-form/review-form";

const ReviewsList = ({
	userId,
	productId,
	productSlug,
}: {
	userId: string;
	productId: string;
	productSlug: string;
}) => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [open, setOpen] = useState(false);
	return (
		<div className="space-y-2">
			{reviews.length === 0 && <div>no reviews yet</div>}
			{userId ? (
				<div>
					<button
						onClick={() => setOpen(true)}
						className="bg-emerald-500 text-white hover:bg-emerald-700 rounded-lg py-2 px-8"
					>
						Write a review
					</button>
					<ReviewForm
						userId={userId}
						productId={productId}
						open={open}
						setOpen={setOpen}
					/>
				</div>
			) : (
				<div>
					Please{" "}
					<Link
						className="px-2 text-blue-600"
						href={`/sign-in?callbackUrl=/product/${productSlug}`}
					>
						sign in
					</Link>{" "}
					to leave a review
				</div>
			)}
		</div>
	);
};

export default ReviewsList;
