import React, { useEffect, useState } from "react";
import { BecomeMentorSvg } from "../../../ui/atom/icons/svgs";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { useRouter } from "next/router";
import MentorOnboardingSteps from "../../../ui/organisms/mentor/onboarding/steps";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import { useDispatch } from "react-redux";
import { setOnboardingMentor, onboardingMentorState } from "../../../../redux/reducers/onboardingSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/authSlice";

const MentorOnboardingPageTemplate = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(currentUser);
	const onboardingMentor = useSelector(onboardingMentorState);
	const pageKey: any = Object.keys(router.query)[0];
	const [current, setCurrent] = useState<"signup" | "">(pageKey);
	const [loading, setLoading] = useState<boolean>(false);
	const [agree, setAgree] = useState<boolean>(onboardingMentor.agreedToTerms || false);

	const handleNavigate = () => {
		setLoading(true);
		if (agree) {
			setTimeout(function () {
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						agreedToTerms: !onboardingMentor.agreedToTerms,
					}),
				);
				setCurrent("signup");
				setLoading(false);
			}, 3000);
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) dispatch(setOnboardingMentor({ ...onboardingMentor, user }));
		if (onboardingMentor.agreedToTerms) {
			setCurrent("signup");
		}
		// if (pageKey === "signup") setCurrent("signup");
		// else {
		// 	setCurrent("");
		// }
		return () => {
			setLoading(false);
			// setCurrent("");
		};
	}, [pageKey]);

	return (
		<div className="bg-[#F6F9F8] min-h-[50dvh]">
			{pageKey === "signup" && onboardingMentor.agreedToTerms ? (
				<MentorOnboardingSteps />
			) : current === "signup" && onboardingMentor.agreedToTerms ? (
				<MentorOnboardingSteps />
			) : (
				<>
					<div className="flex flex-col md:flex-row md:item-start justify-between max-w-[85dvw] 2xl:max-w-[60dvw] mx-auto md:py-[20dvh] pb-20">
						<div className="">
							<div className="max-w-lg grid gap-6 md:gap-7 overflow-hidden py-8">
								<h1
									className="text-[#00D569] text-xl sm:text-3xl animate__animated animate__fadeInLeft"
									style={{ fontFamily: "Days One" }}>
									This is an awesome decision you’ve decided to make
								</h1>
								<p className="text-sm animate__animated animate__fadeInLeft animate__slow">
									The beauty of knowledge is when it is shared... and we are thrilled that you’ve made
									the decision to pass your knowledge to the public.
								</p>
								<div className="flex items-center gap-2 flex-nowrap select-none animate__animated animate__fadeInLeft animate__slow">
									<input
										id="terms"
										name="terms"
										type="checkbox"
										className="h-5 w-5 shrink-0 accent-[#70C5A1] duration-300 text-white cursor-pointer"
										checked={agree}
										onChange={() => setAgree(!agree)}
									/>
									<p className="text-[15px]">
										Agree to our <span className="text-[#70C5A1]">Terms and Policy</span> to
										Continue
									</p>
								</div>
								<div className="animate__animated animate__fadeInLeft animate__slow">
									<PrimaryButton
										type="button"
										title={loading ? "" : "Let's take you through the process"}
										className="p-4 px-8 text-sm flex justify-center"
										disabled={!agree || loading}
										icon={loading ? <ActivityIndicator /> : null}
										// link="/mentor/onboarding?signup"
										onClick={handleNavigate}
									/>
								</div>
							</div>
						</div>
						<div className="pb-10 md:pb-0 sm:flex flex-col gap-2 justify-center items-center hidden">
							<BecomeMentorSvg
								height={300}
								width={488}
								className="animate__animated animate__fadeInDown"
							/>
							<p className="max-w-sm text-sm text-center text-zinc-500 animate__animated animate__fadeInUp">
								Start making money from your knowledge, Share your knowledge in any language of your
								choice
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
export default MentorOnboardingPageTemplate;
