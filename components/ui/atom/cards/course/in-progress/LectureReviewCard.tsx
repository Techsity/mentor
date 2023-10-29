/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ILectureReview } from "../../../../../../hooks/course/useLectureReviews";

const LectureReviewCard = (review: ILectureReview) => {
	return (
		<div className="w-full animate__animated animate__fadeIn flex justify-between lg:flex-row flex-col lg:items-center gap-5 border p-3 border-[#70C5A1] bg-transparent duration-300 min-h-[45px] my-4">
			<p className="flex-grow w-full text-sm tracking-tight font-[300] lg:max-w-lg break-words">
				{review.comment}
			</p>
			<div className="lg:border-l-2 lg:px-5 border-[#A3A6A7] w-[25%]">
				<div className="flex lg:flex-col items-center lg:items-start gap-3">
					<img
						src={
							(review.user && review.user.avatar) ||
							"/assets/images/avatar.png"
						}
						loading="lazy"
						alt="review"
						className="w-10 h-10 rounded-full"
					/>
					<p className="text-sm">
						{review.user &&
							review.user.name.split(" ")[0] +
								" " +
								review.user.name.split(" ")[1]}
					</p>
				</div>
			</div>
		</div>
	);
};

export default LectureReviewCard;
