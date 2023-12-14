import React, { useMemo } from "react";
import CourseInProgressDisplayCard from "../../../atom/cards/course/CourseInProgressDisplayCard";
import courses from "../../../../../data/courses";
import RegisteredMentorships from "./RegisteredMentorships";
import RegitsteredWorkshops from "./RegitsteredWorkshops";
import WishLists from "./WishLists";
import PaymentMethods from "./PaymentMethods";
import ProfileSettings from "./ProfileSettings";
import { ProfileTabLinkType } from "../../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import MentorProfileCourses from "../mentor/courses/MentorProfileCourses";
import { PrimaryButton } from "../../../atom/buttons";
import { useRouter } from "next/router";
import WorkshopAndCourseEditTemplate from "../../../../templates/course/edit";
import EditCourseContent from "../../course/edit-course/EditCourseContent";
import MentorProfileOverview from "../mentor/MentorProfileOverview.tsx";
import MentorProfileWorkshop from "../mentor/workshop/MentorProfileWorkshop";

type ProfileComponentsProps = {
	isEditCourse: boolean;
	isEditWorkshop: boolean;
	activeTab: ProfileTabLinkType;
};

const ProfileComponents = ({ activeTab, isEditCourse, isEditWorkshop }: ProfileComponentsProps) => {
	const router = useRouter();
	const myCourses = useMemo(() => courses, []);
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;

	return (
		<>
			{
				// activeTab === "overview" && isMentor ? (
				// 	<div className="animate__animated animate__fadeIn">
				// 		<MentorProfileOverview />
				// 	</div>
				// ) : activeTab === "courses" && isMentor ? (
				// 	isEditCourse && !isCourseContentPage ? (
				// 		<WorkshopAndCourseEditTemplate isCourse />
				// 	) : isEditCourse && isCourseContentPage ? (
				// 		<EditCourseContent />
				// 	) : (
				// 		<MentorProfileCourses />
				// 	)
				// ) : activeTab === "my-courses" ? (
				// 	<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
				// 		{myCourses.map((course, i) => (
				// 			<CourseInProgressDisplayCard {...{ course }} key={i} />
				// 		))}
				// 	</div>
				// ) :

				activeTab === "workshop" && isMentor ? (
					isEditWorkshop ? (
						<WorkshopAndCourseEditTemplate isWorkshop />
					) : (
						<MentorProfileWorkshop />
					)
				) : activeTab === "my-workshop" ? (
					<RegitsteredWorkshops />
				) : activeTab === "mentorship" ? (
					<RegisteredMentorships />
				) : activeTab === "wishlists" ? (
					<div className="md:px-2 px-5">
						<WishLists />
					</div>
				) : activeTab === "payment-methods" ? (
					<PaymentMethods />
				) : (
					activeTab === "profile-settings" && <ProfileSettings />
				)
				// : (
				// 	<>
				// 		<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
				// 			{myCourses.map((course, i) => (
				// 				<CourseInProgressDisplayCard {...{ course }} key={i} />
				// 			))}
				// 		</div>
				// 	</>
				// )
			}
		</>
	);
};

export default ProfileComponents;
