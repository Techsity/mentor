import React from "react";
import PurchaseCourseTemplate from "../../../components/templates/course/purchase";
import { ICourse } from "../../../interfaces";
import client from "../../../utils/apolloClient";
import { VIEW_COURSE } from "../../../services/graphql/queries/course";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type Props = { course: ICourse | null; error?: string };

const PurchaseCourse = ({ course, error }: Props) => {
	return error ? (
		<div className="text-red-500 text-center h-[50vh] m-auto flex justify-center items-center text-sm">{error}</div>
	) : (
		<PurchaseCourseTemplate {...course} />
	);
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

export default PurchaseCourse;
