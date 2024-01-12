import React from "react";
import CourseDetailsPageTemplate from "../../../components/templates/course/details";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getCourseById } from "../../../services/api";
import { ICourse } from "../../../interfaces";
import PurchaseCourseTemplate from "../../../components/templates/course/purchase";
import { useRouter } from "next/router";

const CourseDetailsPage = ({ course }: { course: ICourse }) => {
	const router = useRouter();
	const pageKey = Object.keys(router.query)[0] as string;
	return pageKey === "purchase" ? <PurchaseCourseTemplate {...course} /> : <CourseDetailsPageTemplate {...course} />;
};

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ course: ICourse | null }>> => {
	const { courseId } = ctx.query;
	const course = await getCourseById(courseId as string);
	if (!course) return { notFound: true };
	return { props: { course } };
};

export default CourseDetailsPage;
