import React, { Dispatch, SetStateAction, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { CourseType, ICourseCategory } from "../../../../../interfaces";

type ActiveCourseType = { name: CourseType; categories: ICourseCategory[] };

const CourseNav = ({
	activeCourseType,
	setActiveCourseType,
	setActiveCategoryIndex,
	courseTypes,
}: {
	activeCourseType: ActiveCourseType;
	setActiveCourseType: Dispatch<SetStateAction<ActiveCourseType>>;
	setActiveCategoryIndex: Dispatch<SetStateAction<number>>;
	courseTypes: ActiveCourseType[];
}) => {
	return (
		<div>
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="flex tracking-tight justify-center items-center mt-20 select-none">
					{courseTypes?.map((type, i) => {
						return (
							<div
								key={i}
								className={`capitalize sm:mx-12 mx-1 text-sm sm:text-sm duration-300 border border-[#094B10] text-[#094B10] px-4 sm:px-8 p-3 cursor-pointer ${
									activeCourseType.name === type.name
										? "bg-[#094B10] text-white"
										: "hover:text-[#fff] hover:bg-[#094B10]"
								}`}
								style={{ fontFamily: "Days One" }}
								onClick={() => {
									setActiveCourseType(type);
									setActiveCategoryIndex(0);
								}}>
								{type.name}
							</div>
						);
					})}
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default CourseNav;
