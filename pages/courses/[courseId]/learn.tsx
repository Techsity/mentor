import React from "react";
import CourseInProgressTemplate from "../../../components/templates/course/in-progress";
import protectedPageWrapper from "../../protectedPageWrapper";
import { ICourse } from "../../../interfaces";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import client from "../../../utils/apolloClient";
import { FETCH_COURSE_SUBSCRIPTION_BY_ID } from "../../../services/graphql/queries/user";
import { checkAuthServerSide, formatGqlError, navigateToAuthPage } from "../../../utils/auth";
import { SubscriptionType } from "../../../services/enums";
import ResponseMessages from "../../../constants/response-codes";
import { useRouter } from "next/router";

type Props = { course: ICourse | null; error?: string };

const CourseInProgress = ({ course, error }: Props) => {
	const router = useRouter();
	if (!course) {
		console.error({ error });
		if (error == "Unauthorized") {
			navigateToAuthPage(router, `/courses/${router.query.courseId}/learn`);
		}
		return (
			<div className="h-screen flex justify-center items-center text-red-500">
				{error || "Subscription not found"}
			</div>
		);
	}
	return <CourseInProgressTemplate course={course} />;
};

export default protectedPageWrapper(CourseInProgress, { adminCanView: true });

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
	const courseId = ctx.query.courseId;
	const authToken = checkAuthServerSide(ctx.req);
	const query = client({ ssr: true, authToken }).query;
	try {
		const {
			data: {
				viewSubscription: { course },
			},
		} = await query<{ viewSubscription: { course: ICourse } }, { courseId: string; subscriptionType: string }>({
			query: FETCH_COURSE_SUBSCRIPTION_BY_ID,
			variables: { courseId: String(courseId), subscriptionType: SubscriptionType.COURSE.toUpperCase() },
		});
		// console.log({ course });
		if (!course) return { props: { course: null } };
		return { props: { course } };
	} catch (error) {
		console.log(JSON.stringify(error));
		const errMsg = formatGqlError(error);
		return { props: { course: null, error: errMsg || "Something went wrong" } };
	}
};
