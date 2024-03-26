import React, { useEffect, useState } from "react";
import protectedPageWrapper from "../../protectedPageWrapper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Confetti from "react-dom-confetti";
import { PrimaryButton } from "../../../components/ui/atom/buttons";
import ActivityIndicator from "../../../components/ui/atom/loader/ActivityIndicator";
import { calculateRatingInReviews } from "../../../utils";
import confettiConfig from "../../../utils/confetti.config";
import { Subscription } from "../../../interfaces/user.interface";
import { checkAuthServerSide, formatGqlError } from "../../../utils/auth";
import client from "../../../utils/apolloClient";
import { VERIFY_PAYMENT } from "../../../services/graphql/mutations/payment";
import { useRouter } from "next/router";
import ResponseMessages from "../../../constants/response-codes";
import { SubscriptionType } from "../../../services/enums";
import { IAppointment } from "../../../interfaces/mentor.interface";

const VerifyPaymentPage = ({ reference, error, subscription, access_code }: Props) => {
	const [celebrate, setCelebrate] = useState<boolean>(false);
	const router = useRouter();
	useEffect(() => {
		if (reference && !error) setCelebrate(true);
	}, []);

	if (error) {
		if (access_code) {
			const retryPayment = () => router.replace(`https://checkout.paystack.com/${access_code}`);
			return (
				<div className="h-screen text-center flex flex-col items-center justify-center gap-4">
					<p className="">This payment was cancelled. Do you retry?</p>
					<PrimaryButton onClick={retryPayment} title="Retry" className="px-5 p-1.5 text-sm" />
					<span onClick={() => router.push("/profile")} className="text-sm hover:underline cursor-pointer">
						Go to dashboard
					</span>
				</div>
			);
		}
		console.error({ error });
		return (
			<div className="h-screen text-center gap-3 flex flex-col items-center justify-center text-red-500">
				{error || "Something went wrong"}. Please try again.
				{error && error == ResponseMessages.TRANSACTION_COMPLETED && (
					<PrimaryButton
						onClick={() => router.push("/profile")}
						title="Go to dashboard"
						className="px-5 p-1.5 text-sm"
					/>
				)}
			</div>
		);
	}

	const resourceTitle =
		subscription?.type === SubscriptionType.COURSE ? subscription?.course?.title : subscription?.workshop?.title;
	const resourceLevel =
		subscription?.type === SubscriptionType.COURSE
			? subscription?.course?.course_level
			: subscription?.workshop?.level;

	const handlNavigate = () => {
		if (subscription?.type === SubscriptionType.COURSE) router.replace(`/courses/${subscription.course?.id}/learn`);
		else router.replace("/profile");
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
						<p className="italic text-center text-sm text-white uppercase">- for {resourceLevel}s</p>
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
						onClick={handlNavigate}
						title={subscription?.type === SubscriptionType.COURSE ? `Start Course` : "Go to profile"}
						className="px-12 duration-300 p-3 text-center flex justify-center items-center"
					/>
				</div>
			</div>
		</>
	);
};
export default protectedPageWrapper(VerifyPaymentPage);

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
	const reference = ctx.query.reference as string;
	const authToken = checkAuthServerSide(ctx.req);
	if (!reference)
		return {
			notFound: true,
			props: { reference: "", subscription: null },
		};
	// verify payment
	try {
		const mutation = client({ ssr: true, authToken }).mutate;
		const { data } = await mutation<
			{ verifyPayment: { subscription?: Subscription; appointment?: IAppointment } },
			{ reference: string }
		>({ mutation: VERIFY_PAYMENT, variables: { reference } });
		const response = data?.verifyPayment;
		if (response?.appointment) {
			return {
				redirect: { destination: `/mentors/${response.appointment.mentor.id}/consult`, permanent: true },
				props: {
					reference,
					subscription: null,
				},
			};
		}
		return { props: { reference, subscription: response?.subscription as Subscription | null } };
	} catch (error) {
		const err = formatGqlError(error);
		const access_code = err.split(" | ")[1];
		if (access_code) {
			return {
				props: { reference, subscription: null, access_code, error: err.split(" | ")[0] },
			};
		}
		console.log({ error: JSON.stringify(error) });
		return {
			props: { reference: "", subscription: null, error: err || "Something went wrong" },
		};
	}
};

type Props = {
	reference: string;
	subscription: Subscription | null;
	error?: string;
	access_code?: string;
};
