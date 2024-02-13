import React from "react";
import CourseInProgressTemplate from "../../../components/templates/course/in-progress";
import protectedPageWrapper from "../../protectedPageWrapper";

const CourseInProgress = () => {
	return <CourseInProgressTemplate />;
};

export default protectedPageWrapper(CourseInProgress, { adminCanView: true });
