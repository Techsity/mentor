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
		if (loading)
			setTimeout(function () {
				scrollTo({ top: 0, behavior: "smooth" });
				setLoading(false);
			}, 1000); // slow loading simulation
	}, []);

	return loading ? (
		<div className="flex justify-center items-center">
			<ActivityIndicator color="#094B10" size={40} />
		</div>
	) : (
		<div className="">
			<div className="items-start flex gap-3 flex-col xl:flex-row justify-between">
				<div className="xl:max-w-[50%] w-full">
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
				<div className="xl:max-w-[50%] w-full">
					<h1 className="my-3 text-[#B1B1B1] font-normal text-sm">
						How this Course is doing
					</h1>
					<div className="border border-[#70C5A1] p-3 grid items-center gap-3">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCourseTemplate;
