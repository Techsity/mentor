import React, { FC, useMemo } from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import ProfileLayout from "../../components/ui/layout/profile/ProfileLayout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import WorkshopAndCourseEditTemplate from "../../components/templates/course/edit";
import CourseInProgressDisplayCard from "../../components/ui/atom/cards/course/CourseInProgressDisplayCard";
import EditCourseContent from "../../components/ui/organisms/course/edit-course/EditCourseContent";
import MentorProfileOverview from "../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import MentorProfileCourses from "../../components/ui/organisms/user/mentor/courses/MentorProfileCourses";
import { ProfileTabLinkType } from "../../interfaces";
import { currentUser } from "../../redux/reducers/features/authSlice";
import courses from "../../data/courses";

const UserProfilePage = () => {
	return (
		<ProfileLayout>
			<MainProfile />
		</ProfileLayout>
	);
};
const MainProfile: FC<{ activeTab?: ProfileTabLinkType }> = ({ activeTab }) => {
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;
	const myCourses = useMemo(() => courses, []);

	return (
		<>
			{isMentor && activeTab === "overview" ? (
				<div className="animate__animated animate__fadeIn">
					<MentorProfileOverview />
				</div>
			) : (
				activeTab === "my-courses" && (
					<div className="animate__animated animate__fadeIn">
						<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
							{myCourses.map((course, i) => (
								<CourseInProgressDisplayCard {...{ course }} key={i} />
							))}
						</div>
					</div>
				)
			)}
		</>
	);
};
export default protectedPageWrapper(UserProfilePage);
