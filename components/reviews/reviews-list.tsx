"use client";
import { Review } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

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
	return (
		<div>
			{reviews.length === 0 && <div>no reviews yet</div>}
			{userId ? (
				"review form"
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
