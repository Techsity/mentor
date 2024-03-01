import React, { FC, useEffect, useMemo, useState } from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import ProfileLayout from "../../components/ui/layout/ProfileLayout";
import { useSelector } from "react-redux";
import CourseInProgressDisplayCard from "../../components/ui/atom/cards/course/CourseInProgressDisplayCard";
import MentorProfileOverview from "../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import { ICourse, ProfileTabLinkType } from "../../interfaces";
import { currentUser } from "../../redux/reducers/authSlice";
import courses from "../../data/courses";
import { useQuery } from "@apollo/client";
import { FETCH_USER_SUBSCRIPTIONS } from "../../services/graphql/mutations/user";
import { Subscription } from "../../interfaces/user.interface";

const UserProfilePage = () => {
	return (
		<ProfileLayout>
			<MainProfile />
		</ProfileLayout>
	);
};
const MainProfile: FC<{ activetab?: ProfileTabLinkType }> = ({ activetab }) => {
	const user = useSelector(currentUser);
	const { data, loading, error } = useQuery<{ viewSubscribedCourses: Subscription[] }, { userId: string }>(
		FETCH_USER_SUBSCRIPTIONS,
		{
			variables: { userId: String(user?.id) },
		},
	);
	const [myCourses, setMyCourses] = useState<ICourse[]>([]);
	const isMentor = user?.mentor;
	// const myCourses = useMemo(() => courses, []);
	useEffect(() => {
		if (!loading && data) {
			const courses = data?.viewSubscribedCourses.map((sub) => sub.course);
			setMyCourses(courses);
		}
	}, [data, loading, error]);
	return (
		<>
			{isMentor && activetab === "overview" ? (
				<div className="animate__animated animate__fadeIn">
					<MentorProfileOverview />
				</div>
			) : (
				activetab === "my-courses" && (
					<div className="animate__animated animate__fadeIn">
						<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
							{loading && myCourses.length < 1
								? Array.from({ length: 3 }).map((_, i) => (
										<CourseInProgressDisplayCard {...{ course: null, loading }} key={i} />
								  ))
								: myCourses.map((course, i) => <CourseInProgressDisplayCard {...{ course }} key={i} />)}
						</div>
					</div>
				)
			)}
		</>
	);
};
export default protectedPageWrapper(UserProfilePage);
