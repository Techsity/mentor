/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import InterestCard from "../../../../ui/atom/cards/onboarding/InterestCard";
import { PrimaryButton } from "../../../../ui/atom/buttons";
import ActivityIndicator from "../../../../ui/atom/loader/ActivityIndicator";
import interests from "../../../../../data/onboarding/interests";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { useSelector } from "react-redux";
import { onboardingUserState } from "../../../../../redux/reducers/onboardingSlice";

const OnboardingInterestsTemplate = () => {
	const router = useRouter();
	const onBoardingUser = useSelector(onboardingUserState);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const toggleInterest = (title: string) => {
		if (selectedInterests.includes(title)) {
			setSelectedInterests((prevSelected) => prevSelected.filter((interest) => interest !== title));
		} else {
			setSelectedInterests((prevSelected) => [...prevSelected, title]);
		}
	};

	const handleSubmit = () => {
		setLoading(true);
		if (selectedInterests.length > 0) {
			toast.dismiss("onboarding_interest_pop");
			setTimeout(function () {
				// setLoading(false);
				router.replace("/onboarding/congratulations");
			}, 2000);
		} else {
			setTimeout(function () {
				setLoading(false);
				toast.error(
					"Please select at least one interest",
					ToastDefaultOptions({ id: "onboarding_interest_pop" }),
				);
			}, 500);
		}
	};
	useEffect(() => {
		if (!onBoardingUser) {
			router.replace(`/auth?signup`);
		}
	}, [onBoardingUser, router]);

	if (!onBoardingUser) {
		return (
			<div className="min-h-screen items-center flex justify-center">
				<ActivityIndicator size={60} color="#70C5A1" style={{ borderWidth: 8 }} />
			</div>
		);
	}

	return (
		<div className="min-h-screen lg:pt-24 sm:pt-20 relative px-6 sm:px-12 md:px-20 pb-20">
			{/* <Particles /> */}
			<HeaderSection loading={loading} handleSubmit={handleSubmit} />
			<div className="grid grid-cols-2 sm:grid-cols-12 items-center gap-5 mt-10 pb-20">
				{interests.map((interest, index) => (
					<div className="sm:col-span-4 lg:col-span-3 xl:col-span-2" key={index}>
						<div className="grid gap-4 bg-white items-center shadow p-1.5 px-3 rounded">
							<div className="flex justify-between item-center">
								<div className="relative w-[50px] h-[50px] rounded-full object-center overflow-hidden">
									<img src={interest.imageUrl} alt="" className="w-full h-full" loading="lazy" />
								</div>
								<div
									className="flex justify-center items-center border w-[30px] h-[30px] border-[#70C5A1]"
									onClick={() => toggleInterest(interest.title)}
									style={{ cursor: "pointer" }}>
									<svg width="21" height="20" viewBox="0 0 11 10" fill="none">
										{selectedInterests.includes(interest.title) ? (
											<path
												className="animate__animated animate__bounceIn animate__faster"
												d="M3.87498 9.06081L0.51123 5.69706L2.04415 4.16414L3.87498 6.00039L9.22665 0.643311L10.7596 2.17623L3.87498 9.06081Z"
												fill="#0CF27E"
											/>
										) : null}
									</svg>
								</div>
							</div>
							<div className="text-sm text-[#094B10]">{interest.title}</div>
						</div>
					</div>
				))}
			</div>

			<div className="sm:hidden flex justify-center">
				<div className="sm:flex grid gap-5 mt-5 items-center">
					<PrimaryButton
						onClick={handleSubmit}
						disabled={loading}
						title={!loading ? "Continue" : ""}
						icon={
							loading ? (
								<div className="flex justify-center">
									<ActivityIndicator />
								</div>
							) : null
						}
						className="px-12 duration-300 p-3 text-center"
					/>
				</div>
			</div>
		</div>
	);
};
const HeaderSection = ({
	loading,

	handleSubmit,
}: {
	loading: boolean;
	handleSubmit: MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<div className="sm:flex justify-between items-center">
			<div className="">
				<h1 className="sm:text-3xl text-2xl text-[#00D569]" style={{ fontFamily: "Days One" }}>
					Nice and Easy
				</h1>
				<p
					className="mt-3 text-[#094B10] tracking-tight max-w-sm md:max-w-lg lg:max-w-xl"
					style={{ fontFamily: "Days One" }}>
					Finally, What area of knowledge interests you more, this would help us know what kinda knowledge
					we&apos;d bring your way
				</p>
			</div>

			<div className="hidden sm:flex justify-center">
				<div className="sm:flex grid gap-5 mt-5 items-center">
					<PrimaryButton
						onClick={handleSubmit}
						disabled={loading}
						title={!loading ? "Continue" : ""}
						icon={
							loading ? (
								<div className="flex justify-center">
									<ActivityIndicator />
								</div>
							) : null
						}
						className="px-12 duration-300 p-3 text-center"
					/>
				</div>
			</div>
		</div>
	);
};
export default OnboardingInterestsTemplate;
