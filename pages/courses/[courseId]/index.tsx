import React from "react";
import CourseDetailsPageTemplate from "../../../components/templates/course/details";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import client from "../../../utils/apolloClient";
import { VIEW_COURSE } from "../../../services/graphql/mutations/courses";
import { ICourse } from "../../../interfaces";

type Props = { course: ICourse | null; error?: string };

const CourseDetailsPage = ({ course }: Props) => {
	return <CourseDetailsPageTemplate {...{ course }} />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
	const courseId = ctx.query.courseId;
	const query = client({ ssr: true }).query;
	try {
		const {
			data: { viewCourse: course },
		} = await query<{ viewCourse: ICourse }, { courseId: string }>({
			query: VIEW_COURSE,
			variables: { courseId: String(courseId) },
		});
		if (!course) return { props: { course: null } };
		return { props: { course } };
	} catch (error) {
		console.log(JSON.stringify(error));
		return { props: { course: null, error: "Something went wrong" } };
	}
};

export default CourseDetailsPage;
