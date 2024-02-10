import React, { FC, useMemo } from "react";
import protectedPageWrapper from "../protectedPageWrapper";
import ProfileLayout from "../../components/ui/layout/ProfileLayout";
import { useSelector } from "react-redux";
import CourseInProgressDisplayCard from "../../components/ui/atom/cards/course/CourseInProgressDisplayCard";
import MentorProfileOverview from "../../components/ui/organisms/user/mentor/MentorProfileOverview.tsx";
import { ProfileTabLinkType } from "../../interfaces";
import { currentUser } from "../../redux/reducers/authSlice";
import courses from "../../data/courses";

const UserProfilePage = () => {
	return (
		<ProfileLayout>
			<MainProfile />
		</ProfileLayout>
	);
};
const MainProfile: FC<{ activetab?: ProfileTabLinkType }> = ({ activetab }) => {
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;
	const myCourses = useMemo(() => courses, []);

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
