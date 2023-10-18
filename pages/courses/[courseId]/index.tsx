import React from "react";
import CourseDetailsPageTemplate from "../../../components/templates/course/details";
import { GetServerSidePropsContext } from "next";
import { getCourseById } from "../../../services/api";
import { ICourse } from "../../../interfaces";

const CourseDetailsPage = ({ course }: { course: ICourse }) => {
	return (
		<div>
			<CourseDetailsPageTemplate {...course} />
		</div>
	);
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { courseId } = ctx.query;
	const course = await getCourseById(courseId as string);
	if (!course)
		return {
			props: {},
			redirect: { destination: "/not-found", permanent: false },
		};
	return { props: { course } };
};

export default CourseDetailsPage;
