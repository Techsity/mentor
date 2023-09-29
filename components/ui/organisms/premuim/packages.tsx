import Link from "next/link";
import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { ArrowForward, Checkmark } from "react-ionicons";

const PremiumPackages = () => {
	const packages: {
		title: string;
		perks: string[];
		ctaButton: { text: string; link: string };
	}[] = [
		{
			ctaButton: { link: "#", text: "Continue" },
			title: "Free Version",
			perks: [
				"View all Courses",
				"Attend all Live Workshop",
				"Access to all Mentors",
				"Becoming a Mentor",
				"Post free Courses",
				"Create free Event",
			],
		},
		{
			ctaButton: { link: "#", text: "Get Started" },
			title: "Premium $5 per Month",
			perks: [
				"View all Courses",
				"Attend all Live Workshop",
				"Access to all Mentors",
				"Becoming a Mentor",
				"Post free Courses",
				"Create free Event",
				"Monetize your Course",
				"Monetize your Events",
				"Get Hired by Mentees",
				"Email Reminder to workshop Participants",
			],
		},
		{
			ctaButton: { link: "#", text: "Get Started" },
			title: "Team $10 per Month",
			perks: [
				"View all Courses",
				"Attend all Live Workshop",
				"Access to all Mentors",
				"Becoming a Mentor",
				"Post free Courses",
				"Create free Event",
				"Monetize your Course",
				"Monetize your Events",
				"Get Hired by Mentees",
				"Email Reminder to workshop Participants",
			],
		},
	];
	return (
		<div className="min-h-screen py-20 px-2">
			<div className="flex justify-center">
				<div className="sm:flex justify-between items-start gap-8 grid max-w-5xl">
					{packages.map(({ perks, title, ctaButton }, i) => {
						return (
							<div key={i}>
								<h1 className="my-5 font-semibold text-xl">{title}</h1>
								<div className="border border-[#70C5A1] p-5 py-10">
									<div className="grid gap-4">
										{perks.map((perk, ind) => (
											<AnimationOnScroll
												key={ind}
												animateIn="animate__fadeInUp"
												animateOnce={true}
											>
												<span className="flex gap-4 items-center font-medium text-sm max-w-[20em]">
													<svg width="11" height="10" viewBox="0 0 11 10" fill="none">
														<path
															d="M3.87547 9.06084L0.511719 5.69709L2.04464 4.16417L3.87547 6.00042L9.22713 0.643341L10.7601 2.17626L3.87547 9.06084Z"
															fill="#0CF27E"
														/>
													</svg>
													{perk}
												</span>
											</AnimationOnScroll>
										))}
									</div>
								</div>
								<AnimationOnScroll
									animateIn="animate__fadeInUp"
									animateOnce={true}
									className="flex justify-start my-5"
								>
									<div
										className="flex justify-center"
										style={{ fontFamily: "Days One" }}
									>
										<Link href={ctaButton.link}>
											<div className="px-8 p-3 bg-[#FFB100] text-sm cursor-pointer flex gap-5 items-center hover:bg-[#B17B00] duration-300">
												{ctaButton.text}
												<ArrowForward height="25px" width="25px" />
											</div>
										</Link>
									</div>
								</AnimationOnScroll>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PremiumPackages;
