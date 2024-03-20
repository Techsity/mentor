import React, { memo, useState } from "react";
import CourseOverview from "./CourseOverview";
import useLectureReviews from "../../../../../../hooks/course/useLectureReviews";
import { ICourse } from "../../../../../../interfaces";
import { PrimaryButton } from "../../../../atom/buttons";
import LectureReviewCard from "../../../../atom/cards/course/in-progress/LectureReviewCard";
import CustomTextInput from "../../../../atom/inputs/CustomTextInput";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import classNames from "classnames";

type videoNavType = "about-course" | "review" | "lecture-notes";

const CourseOverviewTab = ({ course }: { course: ICourse }) => {
	const [active, setActive] = useState<videoNavType>("about-course");
	const { loading, newReview, addNewReview, setNewReview, handleChange, reviews } = useLectureReviews(course);

	const Nav = () => {
		return (
			<div className="flex text-sm whitespace-nowrap items-center gap-10 bg-[#EEEEEE] p-3 border border-black w-full sm:px-6">
				<div
					onClick={() => setActive("about-course")}
					className={`${
						active === "about-course" ? "text-black lg:font-medium" : "text-[#666]"
					} select-none cursor-pointer capitalize`}>
					About Course
				</div>
				<div
					onClick={() => setActive("review")}
					className={`${
						active === "review" ? "text-black lg:font-medium" : "text-[#666]"
					} select-none cursor-pointer capitalize`}>
					Review
				</div>
				<div
					onClick={() => setActive("lecture-notes")}
					className={`${
						active === "lecture-notes" ? "text-black lg:font-medium" : "text-[#666]"
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
			<div className="min-h-[100px]">
				{active === "about-course" ? (
					<CourseOverview overview={String(course?.description)} />
				) : active === "review" ? (
					<section className="animate__animated animate__fadeIn">
						<div className="flex w-full flex-col gap-4">
							<CustomTextInput
								placeholder="Leave a Review..."
								className="placeholder:italic placeholder:text-sm font-[300] placeholder:text[#BEBEBE]"
								containerprops={{
									className:
										"w-full border border-[#70C5A1] bg-transparent duration-300 min-h-[40px] relative",
								}}
								value={newReview !== null ? newReview.content : ""}
								onChange={handleChange("content")}
							/>
							<div className="flex gap-3 items-center">
								{Array.from({ length: 5 }).map((_, index) => {
									return (
										<span
											onClick={() => {
												setNewReview((p) => {
													return { ...p, rating: index + 1 };
												});
											}}
											className={classNames(
												"text-3xl text-[#FFB100] cursor-pointer",
												newReview.rating >= index ? "animate__animated animate__fadeIn" : "",
											)}
											key={index}>
											{newReview.rating >= index + 1 ? "★" : "☆"}
										</span>
									);
								})}
							</div>
							<PrimaryButton
								onClick={addNewReview}
								title={!loading ? "Send" : ""}
								className="h-full p-2 flex items-center justify-center text-center px-6 w-full"
								icon={loading ? <ActivityIndicator /> : null}
							/>
						</div>
						{reviews.map((review, i) => <LectureReviewCard key={i} {...review} />).reverse()}
					</section>
				) : active === "lecture-notes" ? (
					<>
						<p className="text-sm">
							I once thought digital marketing was for the big guys until i took this course, thank you
							for making it so easy and simple I once thought digital marketing was for the big guys until
							i took this course, thank you for making it so easy and simple I once thought digital
							marketing was for the big guys until i took this course, thank you for making it so easy and
							simple I once thought digital marketing was for the big guys until i took this course, thank
							you for making it so easy and simple I once thought digital marketing was for the big guys
							until i took this course, thank you for making it so easy and simple I once thought digital
							marketing was for the big guys until i took this course, thank you for making it so easy and
							simple I once thought digital marketing was for the big guys until i took this course, thank
							you for making it so easy and simple I once thought digital marketing was for the big guys
							until i took this course, thank you for making it so easy and simple I once thought digital
							marketing was for the big guys until i took this course, thank you for making it so easy and
							simple I once thought digital marketing was for the big guys until i took this course, thank
							you for making it so easy and simple I once thought digital marketing was for the big guys
							until i took this course, thank you for making it so easy and simple I once thought digital
							marketing was for the big guys until i took this course, thank you for making it so easy and
							simple I once thought digital marketing was for the big guys until i took this course, thank
							you for making it so easy and simple I once thought digital marketing was for the big guys
							until i took this course, thank you for making it so easy and simple I once thought digital
							marketing was for the big guys until i took this course, thank you for making it so easy and
							simple I once thought digital marketing was for the big guys until i took this course, thank
							you for making it so easy and simple
						</p>
					</>
				) : null}
			</div>
		</>
	);
};
const CourseOverviewTabComponent = memo(CourseOverviewTab);
export default CourseOverviewTabComponent;
