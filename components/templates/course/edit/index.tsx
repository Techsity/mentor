/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import protectedPageWrapper from "../../../../pages/protectedPageWrapper";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import CustomTextInput from "../../../ui/atom/inputs/CustomTextInput";
import { formatAmount, scrollToTop } from "../../../../utils";
import { StarRatingIcon } from "../../../ui/atom/icons/svgs";
import EditCourseForm from "../../../ui/atom/forms/course/EditCourseForm";
import AddCourseContent from "../../../ui/organisms/course/edit-course/AddCourseContent";
import { ICourse } from "../../../../interfaces";
import courses from "../../../../data/courses";
import { PrimaryButton } from "../../../ui/atom/buttons";

const EditCourseTemplate = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const initialState: Omit<ICourse, "mentor"> = {
		available: false,
		content: [
			courses[0].categories[0].availableCourses[0].content[0],
			courses[0].categories[0].availableCourses[0].content[1],
			courses[0].categories[0].availableCourses[0].content[2],
		],
		description: "",
		duration: parseInt("00"),
		level: "All Level",
		limit: 20,
		price: "free",
		rating: 0,
		requirements: [],
		title: "",
		toLearn: [],
		imgUrl: "",
	};
	const courseId = React.useId();
	const [state, setState] = useState<Omit<ICourse, "mentor">>(initialState);

	useEffect(() => {
		if (loading) {
			setTimeout(function () {
				scrollTo({ top: 0, behavior: "smooth" });
				setLoading(false);
			}, 1000); // slow loading simulation
		}
	}, []);
	const reviews = Array.from({ length: 8 });
	return loading ? (
		<div className="flex justify-center items-center">
			<ActivityIndicator color="#094B10" size={40} />
		</div>
	) : (
		<div className="">
			<div className="items-start flex gap-3 flex-col xl:flex-row justify-between">
				<div className="xl:max-w-[60%] w-full">
					<h1 className="my-3 text-[#B1B1B1] font-normal text-sm">
						Course Overview
					</h1>
					<div className="border border-[#70C5A1] p-3">
						<EditCourseForm
							{...{ state }}
							handleSave={(updated) => console.log(updated)}
						/>
					</div>
					<div className="border border-[#70C5A1] p-5 mt-6">
						<AddCourseContent {...{ state }} />
					</div>
				</div>
				<div className="xl:max-w-[40%] w-full">
					<h1 className="my-3 text-[#B1B1B1] font-normal text-sm">
						How this Course is doing
					</h1>
					<div className="border border-[#70C5A1] p-3 grid items-center gap-4">
						<Stats />
						{/* Reviews section - start */}
						<div className="mt-3">
							<h1 className="text-sm mb-3">Reviews</h1>
							{reviews
								.map((_, id) => {
									return (
										<div
											key={id}
											className="border border-[#70C5A1] p-4 my-4">
											<p className="my-4 text-xs">
												I once thought digital marketing
												was for the big guys until i
												took this course, thank you for
												making it so easy and simple
											</p>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-1">
													<img
														src="/assets/images/avatar.png"
														alt="testimonial"
														className="h-6 w-6 rounded-full"
													/>
													<p className="text-sm">
														Adewole Sulaiman
													</p>
												</div>
												<StarRatingIcon
													color="#70C5A1"
													height={20}
													width={20}
												/>
											</div>
										</div>
									);
								})
								.slice(0, 5)}
							{reviews.length > 5 ? (
								<div className="my-4">
									<PrimaryButton
										title="More Reviews"
										className="p-1 px-5 text-sm"
									/>
								</div>
							) : null}
						</div>
					</div>
					{/* Reviews section - end */}
				</div>
			</div>
		</div>
	);
};
const Stats = () => (
	<>
		<div className="bg-[#70C5A1] p-3 px-5 items-center flex justify-between text-white">
			<span className="text-sm">Total Students</span>
			<span className="">{formatAmount(2000)}</span>
		</div>
		<div className="bg-[#70C5A1] p-3 px-5 items-center flex justify-between text-white">
			<span className="text-sm">Total Watch Hour</span>
			<span className="">{formatAmount(40000)}hrs</span>
		</div>
		<div className="bg-[#70C5A1] p-3 px-5 items-center flex justify-between text-white">
			<span className="text-sm">Total Total Ratings</span>
			<span className="flex items-center gap-1">
				{4.5}
				<StarRatingIcon
					className="-mt-1"
					opacity={1}
					color="#fff"
					height={15}
					width={15}
				/>
			</span>
		</div>
	</>
);

export default EditCourseTemplate;
