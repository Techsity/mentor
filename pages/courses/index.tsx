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

// export const getServerSideProps = async (
// 	ctx: GetServerSidePropsContext,
// ): Promise<GetServerSidePropsResult<CourseTypeSearchPageProps>> => {
// 	const courseType = ctx.query?.type as CourseType;
// 	const category = (ctx.query?.category as string) || null;
// 	if (!courseType) return { props: { category, courseType: "technical" } };
// 	return { props: { category, courseType } };
// };
export default AllCoursesPage;
