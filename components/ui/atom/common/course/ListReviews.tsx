/* eslint-disable @next/next/no-img-element */
import { PrimaryButton } from "../../buttons";
import reviews from "../../../../../data/reviews";

const ListReviews = () => (
	<div className="grid gap-3 mt-9">
		<h1 className="font-semibold">Featured Reviews</h1>
		<span className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:max-w-xl w-full">
			{reviews
				// .sort((a, b) => a.content.length - 40)
				.map((review) => {
					return (
						<>
							<div className="border border-[#70C5A1] text-sm p-5 cursor-pointer flex items-start justify-between flex-col">
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
						</>
					);
				})}
		</span>
		<div className="mt-3">
			<PrimaryButton title="View all Reviews" link="#" className="p-4 px-8 text-sm" />
		</div>
	</div>
);

export default ListReviews;
