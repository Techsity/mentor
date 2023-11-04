import React from "react";
import { wishlistedCourses as wishlist } from "../../../../../redux/reducers/features/coursesSlice";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";
import { useSelector } from "react-redux";

const WishLists = () => {
	const wishlistedCourses = useSelector(wishlist);
	return (
		<div>
			<div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3 items-center animate__animated animate__fadeIn">
				{wishlistedCourses.length > 0 ? (
					wishlistedCourses.map((course, indx) => {
						return <DisplayCourseCard course={course} key={indx} />;
					})
				) : (
					// .slice(0, isExtraLargeScreen ? 8 : isLargeScreen ? 6 : 8)
					<div className="flex gap-1 items-center relative overflow-hidden">
						<div className="text-black">Wishlist is empty </div>
						<span className="animate-[spin_3s_ease-in-out_infinite] text-xl">
							✨
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default WishLists;
