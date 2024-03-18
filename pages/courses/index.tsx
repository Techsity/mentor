import React from "react";
import AllCoursesPageTemplate from "../../components/templates/course/all-courses";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { CourseType } from "../../interfaces";

type CourseTypeSearchPageProps = {
	category?: string | null;
	courseType: CourseType;
};
const AllCoursesPage = () => {
	return <AllCoursesPageTemplate />;
};



export default AllCoursesPage;
