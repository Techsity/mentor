import React, { useEffect, useState } from "react";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";
import { ICourse } from "../../../../../interfaces";
import { useQuery } from "@apollo/client";
import { ALL_COURSES } from "../../../../../services/graphql/queries/course";
import { PrimaryButton } from "../../../atom/buttons";
import { calculateRatingInReviews } from "../../../../../utils";
import { useRouter } from "next/router";

type AllCoursesArgs = {
	take: number;
	skip: number;
	category?: string;
	courseType?: string;
};
type CourseListProps = { activeCategory: string; activeCourseType: string; loadMore?: boolean };

const CoursesList = ({ activeCategory, activeCourseType, loadMore = false }: CourseListProps) => {
	const router = useRouter();
	const THRESHOLD = 6;
	const [limit, setLimit] = useState<number>(THRESHOLD);
	const [skip, setSkip] = useState<number>(0);
	const [limitReached, setLimitReached] = useState<boolean>(false);

	const { data, loading, error, refetch } = useQuery<{ allCourses: ICourse[] }, AllCoursesArgs>(ALL_COURSES, {
		variables: { skip, take: limit, category: activeCategory, courseType: activeCourseType },
		fetchPolicy: "cache-and-network",
	});

	let allCourses: ICourse[] = [];
	if (data?.allCourses) allCourses = [...data?.allCourses];

	const fetchMore = async () => {
		if (loadMore) {
			if (!limitReached) {
				const updatedLimit = limit + THRESHOLD;
				const updatedSkip = skip + THRESHOLD;
				setLimit(updatedLimit);
				setSkip(updatedSkip);
				const { data: res } = await refetch({ take: updatedLimit, skip: updatedSkip });
				if (res?.allCourses && res?.allCourses.length <= THRESHOLD) {
					setSkip(0);
					setLimit(THRESHOLD);
					setLimitReached(true);
				}
				console.log({ take: updatedLimit, skip: updatedSkip, res: res?.allCourses.length });
			}
		} else router.push("/courses");
	};

	if (error) console.error(error);

	useEffect(() => {
		if (activeCategory || activeCourseType) {
			setLimitReached(false);
		}
	}, [activeCourseType, activeCategory]);

	return (
		<>
			<div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-full sm:p-5">
				{loading ? (
					Array.from({ length: limit }).map((_, indx) => {
						return <DisplayCourseCard loading={loading} course={null} key={indx} />;
					})
				) : !loading && !error && allCourses.length < 1 ? (
					<h1 className="text-[#d31119] tracking-tight">No courses under this category</h1>
				) : (
					!loading &&
					allCourses.length >= 1 &&
					allCourses
						.sort(
							(a, b) =>
								Number(calculateRatingInReviews(b.reviews)) -
								Number(calculateRatingInReviews(a.reviews)),
						)
						.map((course, indx) => {
							return <DisplayCourseCard loading={loading} course={course} key={indx} />;
						})
					// .slice(0, limit)
				)}
				{!loading && error && <h1 className="text-[#d31119] tracking-tight">Network Error.</h1>}
			</div>
			{/* {!loading && !error && allCourses.length >= THRESHOLD && ( */}
			{!loading &&<div className="max-w-xs mx-auto py-4 animate__animated animate__fadeIn">
				<PrimaryButton
					title="See more"
					className="w-full p-1 flex justify-center items-center rounded-lg"
					onClick={fetchMore}
				/>
			</div>}
			{/* )} */}
		</>
	);
};

export default CoursesList;
