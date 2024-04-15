import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../../components/ui/atom/buttons";
import ActivityIndicator from "../../../../components/ui/atom/loader/ActivityIndicator";
import { useRouter } from "next/router";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../../../utils/confetti.config";
import { useDispatch, useSelector } from "react-redux";
import { setWorkshopToRegister, workshopToRegister } from "../../../../redux/reducers/workshopSlice";
import { calculateRatingInReviews, formatDateDifference } from "../../../../utils";
import protectedPageWrapper from "../../../protectedPageWrapper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ICourse, IReview } from "../../../../interfaces";
import { SubscriptionType } from "../../../../services/enums";
import { FETCH_COURSE_SUBSCRIPTION_BY_ID, VIEW_NEW_SUBSCRIPTION } from "../../../../services/graphql/queries/user";
import client from "../../../../utils/apolloClient";
import { checkAuthServerSide, formatGqlError } from "../../../../utils/auth";
import { Subscription } from "../../../../interfaces/user.interface";
import { fetchUserProfile } from "../../../../redux/reducers/auth/apiAuthSlice";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";

type Props = { subscription: Subscription | null; error?: string };

const SubscriptionSuccess = ({ subscription, error }: Props) => {
	const router = useRouter();
	const [celebrate, setCelebrate] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const user = useSelector(currentUser);

	// const hasSubscribed = user?.subscriptions.some((s) => s.id === subscription?.id);
	const resource = subscription?.course || subscription?.workshop;

	useEffect(() => {
		// console.log({ hasSubscribed });
		dispatch(fetchUserProfile() as any);
		setCelebrate(true);
	}, [resource]);

	// if(hasSubscribed){}

	const resourceTitle = resource?.title;
	const resourceLevel =
		subscription?.type === SubscriptionType.COURSE
			? subscription?.course?.course_level
			: subscription?.workshop?.level;

	const handleNavigate = () => {
		setLoading(true);
		if (subscription?.type === SubscriptionType.COURSE) router.replace(`/courses/${subscription.course?.id}/learn`);
		else router.replace("/profile/my-workshop");
	};

	return (
		<>
			<Confetti active={celebrate} config={{ ...confettiConfig }} />
			<div className="my-10 flex flex-col lg:flex-row justify-between gap-5 lg:items-center min-h-[50vh] px-10 md:px-20 w-full">
				<div className="flex-grow flex flex-col sm:items-center gap-2 justify-center p-6 lg:py-10 w-full lg:w-auto bg-[#0C202B]">
					<div className="w-full">
						<h1 style={{ fontFamily: "Days One" }} className="text-white text-center text-2xl font-bold">
							{resourceTitle}
						</h1>
						<p className="italic text-center text-sm text-white uppercase">
							- for {!resourceLevel?.toLowerCase()?.endsWith("s") ? resourceLevel + "s" : resourceLevel}
						</p>
					</div>
					<div className="text-white flex items-center gap-2 pt-2 justify-center">
						<img
							src={subscription?.course?.mentor.user.avatar || subscription?.workshop?.mentor.user.avatar}
							alt=""
							className="w-8 h-8 rounded-full"
						/>
						<p className="text-xs">
							{subscription?.course?.mentor.user.name.split(" ")[0] ||
								subscription?.workshop?.mentor.user.name.split(" ")[0]}
						</p>
					</div>
				</div>
				<div className="flex sm:items-center md:items-start gap-5 flex-col md:flex-col sm:flex-row">
					<div className="lg:max-w-lg">
						<h1
							className="text-3xl sm:text-4xl text-[#00D569] break-words"
							style={{ fontFamily: "Days One" }}>
							Congratulations!
						</h1>
						<p className="text-sm">
							Your{" "}
							{subscription?.type === SubscriptionType.COURSE
								? "course purchase"
								: "workshop subscription"}{" "}
							was successful.
						</p>
					</div>
					<PrimaryButton
						onClick={handleNavigate}
						title={subscription?.type === SubscriptionType.COURSE ? `Start Course` : "Go to profile"}
						className="px-12 duration-300 p-3 text-center flex justify-center items-center"
					/>
				</div>
			</div>
		</>
	);
	// return (
	// 	<div className="flex flex-col lg:flex-row justify-center gap-5 lg:items-center pt-[10vh] lg:pt-auto lg:min-h-[65vh] px-10 md:px-20 relative">
	// 		<Confetti active={celebrate} config={{ ...confettiConfig }} />
	// 		<div className="flex-grow flex flex-col sm:items-center gap-4 p-6 py-10 w-full lg:w-auto bg-[#0C202B]">
	// 			<p className="text-sm capitalize text-white">
	// 				{subscription?.type.toLowerCase()}s/{resource?.category.title}/
	// 				<span className="text-[#CEFFEA]">{resource?.title}</span>
	// 			</p>
	// 			<h1 style={{ fontFamily: "Days One" }} className="text-white text-center text-2xl font-bold max-w-md">
	// 				{resource?.title}
	// 			</h1>
	// 			<div className="flex sm:items-center sm:flex-row flex-col justify-between text-sm sm:w-[65%] sm:mx-auto text-white">
	// 				{/* <p className="capitalize">{String(resource?.).split("_").join(" ")}</p> */}
	// 				{/* <p className="capitalize">{resource.contents.length} sessions</p> */}
	// 				<div className="flex items-center gap-2 text-[13px] 2xl:text-xl">
	// 					<svg width="13" height="13" viewBox="0 0 9 9" fill="none">
	// 						<path
	// 							d="M8.77514 4.09957L6.9643 5.73977L7.50675 8.18173C7.53546 8.30939 7.52727 8.44299 7.4832 8.56585C7.43914 8.6887 7.36116 8.79535 7.25902 8.87246C7.15687 8.94956 7.03509 8.99371 6.90891 8.99938C6.78272 9.00504 6.65772 8.97198 6.54954 8.90431L4.49739 7.61249L2.44966 8.90431C2.34148 8.97198 2.21648 9.00504 2.09029 8.99938C1.9641 8.99371 1.84232 8.94956 1.74018 8.87246C1.63803 8.79535 1.56005 8.6887 1.51599 8.56585C1.47193 8.44299 1.46374 8.30939 1.49244 8.18173L2.03409 5.74227L0.22285 4.09957C0.127052 4.01382 0.0577799 3.90063 0.0237208 3.77418C-0.0103383 3.64773 -0.00766819 3.51366 0.0313962 3.38878C0.0704606 3.26391 0.14418 3.15378 0.243311 3.07221C0.342441 2.99064 0.46257 2.94126 0.588631 2.93027L2.97605 2.71566L3.90796 0.408716C3.95663 0.287666 4.03872 0.184267 4.14389 0.111538C4.24906 0.038808 4.37262 0 4.499 0C4.62538 0 4.74893 0.038808 4.8541 0.111538C4.95927 0.184267 5.04136 0.287666 5.09003 0.408716L6.02476 2.71566L8.41137 2.93027C8.53743 2.94126 8.65756 2.99064 8.75669 3.07221C8.85582 3.15378 8.92954 3.26391 8.9686 3.38878C9.00767 3.51366 9.01034 3.64773 8.97628 3.77418C8.94222 3.90063 8.87295 4.01382 8.77715 4.09957H8.77514Z"
	// 							fill="#FFB100"
	// 						/>
	// 					</svg>
	// 					{calculateRatingInReviews(resource?.reviews as IReview[])}
	// 				</div>
	// 			</div>
	// 		</div>
	// 		<div className="flex sm:items-center md:items-start sm:gap-5 md:gap-0 flex-col md:flex-col sm:flex-row sm:pt-auto pt-6">
	// 			<div className="lg:max-w-lg">
	// 				<h1 className="text-3xl sm:text-4xl text-[#00D569] break-words" style={{ fontFamily: "Days One" }}>
	// 					Congratulations!
	// 				</h1>
	// 				<div
	// 					className="my-5 text-[#094B10] break-words max-w-lg tracking-tight"
	// 					style={{ fontFamily: "Days One" }}>
	// 					You have successfully{" "}
	// 					{subscription?.type === SubscriptionType.COURSE
	// 						? "purchased this course"
	// 						: subscription?.type === SubscriptionType.WORKSHOP && "registered for this workshop"}
	// 					.{" "}
	// 					{subscription?.type === SubscriptionType.WORKSHOP &&
	// 						"Check your profile for the link to the workshop"}
	// 				</div>
	// 			</div>
	// 			<PrimaryButton
	// 				onClick={navigateToResource}
	// 				disabled={loading}
	// 				title={
	// 					!loading
	// 						? subscription?.type === SubscriptionType.WORKSHOP
	// 							? "Go to profile"
	// 							: subscription?.type === SubscriptionType.COURSE
	// 							? "Start course"
	// 							: "Go to profile"
	// 						: ""
	// 				}
	// 				icon={
	// 					loading ? (
	// 						<div className="flex justify-center items-center">
	// 							<ActivityIndicator />
	// 						</div>
	// 					) : null
	// 				}
	// 				className="px-12 duration-300 p-3 text-center flex justify-center items-center"
	// 			/>
	// 		</div>
	// 	</div>
	// );
};

export default protectedPageWrapper(SubscriptionSuccess);

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
	const resourceId = ctx.query.resourceId;
	const resourceType = ctx.query.resourceType as string;

	const authToken = checkAuthServerSide(ctx.req);
	if (!authToken)
		return {
			props: { subscription: null },
			redirect: { destination: "/auth?login", permanent: true },
		};
	if (!resourceId || !resourceType)
		return {
			props: { subscription: null },
			// notFound: true,
			redirect: { destination: "/profile", permanent: true },
		};
	try {
		const query = client({ ssr: true, authToken }).query;
		const { data, error, errors } = await query<
			{ viewSubscription: Subscription },
			{ resourceId: string; subscriptionType: string }
		>({
			query: VIEW_NEW_SUBSCRIPTION,
			variables: { resourceId: String(resourceId), subscriptionType: resourceType.toUpperCase() },
		});
		const subscription = data?.viewSubscription;
		if (!subscription || error || errors)
			return { props: { subscription: null }, redirect: { destination: "/profile", permanent: true } };
		return { props: { subscription } };
	} catch (error) {
		console.log(JSON.stringify(error));
		return { props: { subscription: null }, redirect: { destination: "/profile", permanent: true } };
	}
};
