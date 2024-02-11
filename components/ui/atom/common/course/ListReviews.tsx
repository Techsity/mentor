/* eslint-disable @next/next/no-img-element */
import { PrimaryButton } from "../../buttons";
import reviews from "../../../../../data/reviews";

const ListReviews = () => (
	<div className="grid gap-3 mt-9">
		<h1 className="font-semibold">Featured Reviews</h1>
		<span className="grid sm:grid-cols-2 items-center gap-3 lg:max-w-xl w-full">
			{reviews.map((review) => {
				return (
					<>
						{/* <Link href={"#"}> */}
						<div className="border border-[#70C5A1] text-sm p-5 gap-5 cursor-pointer">
							<p className="">{review.content}</p>
							<div className="flex items-center mt-5 justify-between">
								<p className="">{review.reviewed_by.name}</p>
								<img
									src={review.reviewed_by.avatar || "/assets/images/avatar.png"}
									alt=""
									className="w-10 rounded-full bg-zinc-300"
									loading="lazy"
								/>
							</div>
						</div>
						{/* </Link> */}
					</>
				);
			})}
		</span>
		<div className="mt-3">
			<PrimaryButton title="View all Reviews" link="#" className="p-4 px-8" />
		</div>
	</div>
);

export default ListReviews;
