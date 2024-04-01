import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ICourse } from "../../../../../interfaces";
import { FETCH_COURSE_SUBSCRIPTIONS } from "../../../../../services/graphql/queries/user";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { Subscription } from "../../../../../interfaces/user.interface";
import { formatGqlError, logoutUser } from "../../../../../utils/auth";

const UserCourseSubcriptions = () => {
	const { data, loading, error } = useQuery<{ viewSubscriptions: Subscription[] }, any>(FETCH_COURSE_SUBSCRIPTIONS);
	const [myCourses, setMyCourses] = useState<ICourse[]>([]);

	useEffect(() => {
		if (!loading && data) {
			const courses = data?.viewSubscriptions.map((sub) => sub.course as unknown as ICourse);
			setMyCourses(courses);
		}
	}, [data, loading, error]);

	if (!loading && error) {
		console.error(JSON.stringify(error));
		const errMsg = formatGqlError(error);
		if (errMsg == "Unauthorized") logoutUser();
		return (
			<div className="">
				<p className="break-words max-w-md text-red-500">
					Something went wrong while fetching your courses. Try refreshing this page and make sure your have
					an stable internet.
				</p>
			</div>
		);
	}

	return (
		<div className="animate__animated animate__fadeIn">
			<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
				{loading && <span className="text-sm">Loading...</span>}
				{!loading && myCourses.length < 1 && (
					<p className="text-sm">You haven&apos;t subscribed to any course yet</p>
				)}
				{loading && myCourses.length < 1
					? Array.from({ length: 4 }).map((_, i) => (
							<CourseInProgressDisplayCard {...{ course: null, loading }} key={i} />
					  ))
					: myCourses.map((course, i) => <CourseInProgressDisplayCard {...{ course }} key={i} />)}
			</div>
		</div>
	);
};

export default UserCourseSubcriptions;
