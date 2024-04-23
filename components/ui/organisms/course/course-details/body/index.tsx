import React from "react";
import { ICourse } from "../../../../../../interfaces";
import ListReviews from "../../../../atom/common/course/ListReviews";
import Socials from "../../../../atom/common/course/Socials";
import CourseRequirements from "./CourseRequirements";
import WhatToLearn from "./WhatToLearn";
import AboutCourse from "./AboutCourse";
import CourseContents from "./CourseContents";
import { useModal } from "../../../../../../context/modal.context";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { isLoggedIn, currentUser } from "../../../../../../redux/reducers/auth/authSlice";
import { navigateToAuthPage } from "../../../../../../utils/auth";
import ReportMentorModal from "../../../../atom/modals/ReportMentorModal";

const CourseDetailsBody = (course: ICourse) => {
	const router = useRouter();
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);
	const { openModal } = useModal();

	const handleOpenModal = () => {
		if (!auth || !user) navigateToAuthPage(router, router.pathname);
		else
			openModal(<ReportMentorModal mentorId={course.mentor.id} />, {
				closeOnBackgroundClick: false,
				animate: true,
				showCloseIcon: true,
			});
	};

	return (
		<div className="min-h-[50vh] h-full lg:px-12 sm:px-6 px-4">
			<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow w-full overflow-hidden">
					<AboutCourse {...course} />
					<WhatToLearn {...course} />
					<CourseRequirements {...course} />
					<div className="my-8">
						<ListReviews {...{ reviews: course.reviews }} />
					</div>
					{user?.mentor && user.mentor.id !== course.mentor.id && (
						<div className="">
							<div className="flex flex-wrap max-w-xl justify-between items-center mt-5">
								<p
									onClick={handleOpenModal}
									className="text-[#F15E63] cursor-pointer hover:underline text-sm">
									Report Mentor
								</p>
								<Socials />
							</div>
						</div>
					)}
				</div>
				<CourseContents className="lg:max-w-[30%]" course={course} />
			</div>
		</div>
	);
};

export default CourseDetailsBody;
