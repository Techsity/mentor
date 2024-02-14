import React from "react";
import { useModal } from "../../../../context/modal.context";
import reviews from "../../../../data/reviews";

const ReviewsModal = () => {
	const { closeModal } = useModal();

	return (
		<div className="bg-white relative p-5 rounded-lg h-[65vh] w-[90vw] overflow-hidden overflow-y-auto hide-scroll-bar">
			<div className="fixed right-4 top-2 text-3xl cursor-pointer" onClick={closeModal}>
				&times;
				{/* & */}
			</div>
			<div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 w-full p-6">
				{reviews.map((review, index) => {
					return (
						<div
							key={index}
							className="border border-[#70C5A1] text-sm p-5 flex items-start justify-between flex-col">
							<p className="">{review.content}</p>
							<div className="flex items-center mt-5 gap-3">
								<img
									src={review.reviewed_by.avatar || "/assets/images/avatar.png"}
									alt=""
									className="w-10 rounded-full bg-zinc-300"
									loading="lazy"
								/>
								<p className="text-xs">{review.reviewed_by.name}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default ReviewsModal;
