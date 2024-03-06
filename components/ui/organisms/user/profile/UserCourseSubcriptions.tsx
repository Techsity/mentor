import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ICourse } from "../../../../../interfaces";
import { FETCH_USER_SUBSCRIPTIONS } from "../../../../../services/graphql/mutations/user";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import { Subscription } from "../../../../../interfaces/user.interface";
import { formatGqlError, logoutUser } from "../../../../../utils/auth";

const UserCourseSubcriptions = () => {
	const user = useSelector(currentUser);
	const { data, loading, error } = useQuery<{ viewSubscribedCourses: Subscription[] }, { userId: string }>(
		FETCH_USER_SUBSCRIPTIONS,
		{
			variables: { userId: String(user?.id) },
		},
	);
	const [myCourses, setMyCourses] = useState<ICourse[]>([]);

	useEffect(() => {
		if (!loading && data) {
			const courses = data?.viewSubscribedCourses.map((sub) => sub.course);
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
				{!loading && myCourses.length < 1 && (
					<p className="text-sm">You haven't subscribed to any course yet</p>
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
