import React from "react";
import protectedPageWrapper from "../../../protectedPageWrapper";
import UserOngoingCoursesTemplate from "../../../../components/templates/user/my-courses/learning";
import courses from "../../../../data/courses";

const UserOngoingCourses = () => {
	const ongoingCourses = courses[0].categories[0].availableCourses;
	return <UserOngoingCoursesTemplate ongoingCourses={ongoingCourses} />;
};

export default protectedPageWrapper(UserOngoingCourses);
