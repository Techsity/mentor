import React, { memo, useMemo, useState } from "react";
import CourseOverview from "./CourseOverview";
import { ICourse } from "../../../../../interfaces";
import { IUser } from "../../../../../interfaces/user.interface";
import LectureReviewCard from "../../../atom/cards/course/in-progress/LectureReviewCard";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { PrimaryButton } from "../../../atom/buttons";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import useLectureReviews from "../../../../../hooks/course/useLectureReviews";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";

type videoNavType = "about-course" | "review" | "lecture-notes";

const CourseOverviewTab = (course: ICourse) => {
	const [active, setActive] = useState<videoNavType>("about-course");
	const { loading, newReview, addNewReview, handleChange, reviews } =
		useLectureReviews();

	const Nav = () => {
		return (
			<div className="flex text-sm whitespace-nowrap items-center gap-10 bg-[#EEEEEE] p-3 border border-black w-full sm:px-6">
				<div
					onClick={() => setActive("about-course")}
					className={`${
						active === "about-course"
							? "text-black lg:font-medium"
							: "text-[#666]"
					} select-none cursor-pointer capitalize`}>
					About Course
				</div>
				<div
					onClick={() => setActive("review")}
					className={`${
						active === "review"
							? "text-black lg:font-medium"
							: "text-[#666]"
					} select-none cursor-pointer capitalize`}>
					Review
				</div>
				<div
					onClick={() => setActive("lecture-notes")}
					className={`${
						active === "lecture-notes"
							? "text-black lg:font-medium"
							: "text-[#666]"
					} select-none cursor-pointer capitalize`}>
					Lecture Notes
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="my-5">
				<Nav />
			</div>
			<div className="min-h-[200px]">
				{active === "about-course" ? (
					<CourseOverview overview={course.description} />
				) : active === "review" ? (
					<section className="animate__animated animate__fadeIn">
						<CustomTextInput
							placeholder="Leave a Review..."
							className="placeholder:italic placeholder:text-sm font-[300] placeholder:text[#BEBEBE]"
							containerProps={{
								className:
									"border border-[#70C5A1] bg-transparent duration-300 min-h-[40px] my-4",
							}}
							value={newReview !== null ? newReview?.comment : ""}
							onChange={handleChange}
							rightButton={
								<PrimaryButton
									onClick={addNewReview}
									title={!loading ? "Send" : ""}
									className="h-full p-2 flex items-center justify-center text-center px-6 w-full"
									icon={
										loading ? <ActivityIndicator /> : null
									}
								/>
							}
						/>
						{reviews
							.map((review, i) => (
								<LectureReviewCard key={i} {...review} />
							))
							.reverse()}
					</section>
				) : active === "lecture-notes" ? (
					<>
						<p className="text-sm">
							I once thought digital marketing was for the big
							guys until i took this course, thank you for making
							it so easy and simple I once thought digital
							marketing was for the big guys until i took this
							course, thank you for making it so easy and simple I
							once thought digital marketing was for the big guys
							until i took this course, thank you for making it so
							easy and simple I once thought digital marketing was
							for the big guys until i took this course, thank you
							for making it so easy and simple I once thought
							digital marketing was for the big guys until i took
							this course, thank you for making it so easy and
							simple I once thought digital marketing was for the
							big guys until i took this course, thank you for
							making it so easy and simple I once thought digital
							marketing was for the big guys until i took this
							course, thank you for making it so easy and simple I
							once thought digital marketing was for the big guys
							until i took this course, thank you for making it so
							easy and simple I once thought digital marketing was
							for the big guys until i took this course, thank you
							for making it so easy and simple I once thought
							digital marketing was for the big guys until i took
							this course, thank you for making it so easy and
							simple I once thought digital marketing was for the
							big guys until i took this course, thank you for
							making it so easy and simple I once thought digital
							marketing was for the big guys until i took this
							course, thank you for making it so easy and simple I
							once thought digital marketing was for the big guys
							until i took this course, thank you for making it so
							easy and simple I once thought digital marketing was
							for the big guys until i took this course, thank you
							for making it so easy and simple I once thought
							digital marketing was for the big guys until i took
							this course, thank you for making it so easy and
							simple I once thought digital marketing was for the
							big guys until i took this course, thank you for
							making it so easy and simple
						</p>
					</>
				) : null}
			</div>
		</>
	);
};
const CourseOverviewTabComponent = memo(CourseOverviewTab);
export default CourseOverviewTabComponent;
