import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import React from "react";

type CourseTypeSearchPageProps = {
	category?: string | null;
	courseType: string;
};

const CourseTypeSearchPage = ({ category, courseType }: CourseTypeSearchPageProps) => {
	return (
		<>
			CourseTypeSearchPage
			<div className="">category -{category}</div>
			<div className="">courseType -{courseType}</div>
		</>
	);
};

export const getServerSideProps = async (
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<CourseTypeSearchPageProps>> => {
	const courseType = ctx.query?.courseType as string;
	const category = (ctx.query?.category as string) || null;
	if (!courseType) return { props: { category, courseType: "" }, notFound: true };
	return { props: { category, courseType } };
};

export default CourseTypeSearchPage;
