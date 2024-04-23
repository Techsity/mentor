/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useId, useMemo, useState } from "react";
import {
	calculateOverallExperience,
	calculateRatingInReviews,
	formatAmount,
	formatFollowersCount,
} from "../../../../../utils";
import { PrimaryButton } from "../../buttons";
import { GlobeIconSvg } from "../../icons/svgs";
import * as FlagIcons from "react-country-flags-select";
import { IMentor, IMentorExperience } from "../../../../../interfaces/mentor.interface";
import { IReview } from "../../../../../interfaces";
import { navigateToAuthPage } from "../../../../../utils/auth";
import { toast } from "react-toastify";
import countries from "../../../../../data/countries";
import { useMutation } from "@apollo/client";
import { FOLLOW_MENTOR } from "../../../../../services/graphql/mutations/mentors";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { currentUser, isLoggedIn } from "../../../../../redux/reducers/auth/authSlice";
import Avatar from "../../common/user/Avatar";

type MentorProfileCardProps = {
	mentor: IMentor | null | undefined;
	detailsPage?: boolean;
	loading?: boolean;
	onFollow?: () => void;
};
interface IconType {
	[key: string]: React.ElementType;
}

const MentorProfileCard = ({ detailsPage = false, loading = false, mentor, onFollow }: MentorProfileCardProps) => {
	const toastId = useId();
	const router = useRouter();
	const user = useSelector(currentUser);
	const auth = useSelector(isLoggedIn);
	const [followMentorMutation, { loading: followLoading, data }] = useMutation<{ toggleFollowMentor: boolean }, any>(
		FOLLOW_MENTOR,
	);
	const [followersCount, setFollowersCount] = useState<number>(0);
	const [followingMentor, setFollowingMentor] = useState<boolean>(false);

	const userCountry: string = mentor
		? String(
				countries.find((c) => c.label === mentor?.user.country || c.countryCode === mentor?.user.country)
					?.countryCode,
		  )
		: "";
	const country: string = userCountry.charAt(0) + userCountry.charAt(1).toLowerCase();
	const IconComponent: IconType = FlagIcons;
	const IconComp: any = IconComponent[country] || <></>;
	// router.push(`/mentors/${mentor?.user.name}`)
	const handleFollow = async () => {
		if (!auth || !user) {
			toast.error("You're not logged in!", { theme: "light", toastId });
			setTimeout(function () {
				navigateToAuthPage(router, `/mentors/${mentor?.id}`);
			}, 1000);
			return;
		}

		if (Boolean(user && user.mentor?.id !== mentor?.id) && !loading && mentor)
			await followMentorMutation({ variables: { mentorId: mentor.id, follow: !followingMentor } })
				.then(({ data }) => {
					// const follow = Boolean(data?.toggleFollowMentor);
					setFollowingMentor((p) => !p);
					// if (follow) {
					if (!followingMentor) setFollowersCount((p) => (p += 1));
					else setFollowersCount((p) => (p -= 1));
					if (onFollow) onFollow();
					// }
				})
				.catch((err) => console.error(`Error following mentor ${mentor.id}: `, err));
	};
	const links = ["www.linkedin.com/example_link", "www.example.com"];
	const overallExperience = calculateOverallExperience(mentor?.work_experience as IMentorExperience[]);
	const mentorNameLength = mentor?.user.name.split(" ").length;
	useEffect(() => {
		if (mentor) {
			setFollowersCount(mentor.followers.length);
			setFollowingMentor(Boolean(mentor?.followers.find((follower) => String(follower.id) === String(user?.id))));
		}
	}, [mentor, loading]);

	return (
		<div className="relative w-full h-auto p-[1.5px] flex items-center justify-center overflow-hidden group">
			<div className="absolute bg-gradient-to-r from-[#70C5A1] via-[white] to-[#70C5A1] w-[110%] h-full" />
			{/* <div className="absolute bg-gradient-to-r from-[#70C5A1] via-[white] to-[#70C5A1] w-[110%] h-full group-hover:animate-[spin_8s_infinite]" /> */}
			<div className="z-20 bg-white border border-[#70C5A12A] p-2 md:p-5 flex md:flex-row flex-col items-start gap-4 justify-between h-full w-full relative group-hover:shadow duration-300 md:divide-x-2 divide-[#D9D9D9]">
				<div className="relative h-full md:w-[52%] w-full flex md:flex-row flex-col items-start gap-2">
					<div className="w-[75px] h-[75px] xs:w-20 xs:h-20 sm:w-16 md:w-20 sm:h-16 lg:w-40 lg:h-28 xl:w-[100px] xl:h-[89px] rounded-full overflow-hidden">
						{loading && (
							<div className="bg-zinc-200 absolute w-full h-full animate__animated animate__fadeOut animate__infinite left-0 top-0" />
						)}
						{!loading && <Avatar className="w-full text-2xl h-full" user={mentor?.user} />}
					</div>
					<div className="w-full">
						<div className="flex xl:flex-row flex-col items-start xl:items-center gap-1">
							{loading && <span className="bg-zinc-200 h-1 w-20" />}
							{!loading && (
								<h1 className="text-lg text-[#094B10] font-semibold flex items-center gap-2">
									{mentorNameLength && mentorNameLength >= 3
										? mentor?.user.name.split(" ")[0] + " " + mentor?.user.name.split(" ")[1]
										: mentor?.user.name}
									{mentor?.mentor_verified && (
										<svg
											width="16"
											height="16"
											viewBox="0 0 13 13"
											fill="none"
											className="flex justify-center items-center border border-[#70C5A1] rounded-full">
											<path
												d="M5.29757 10L3 7.60232L4.04704 6.50965L5.29757 7.81853L8.95296 4L10 5.09266L5.29757 10Z"
												fill="#0CF27E"
											/>
										</svg>
									)}
								</h1>
							)}

							<div className="flex items-start xs:items-center gap-2 w-full xs:w-auto whitespace-nowrap">
								{loading ? (
									<span className="bg-zinc-200 h-1 w-5" />
								) : (
									<p className="text-sm">{formatFollowersCount(followersCount)} followers</p>
								)}
								{Boolean(user && user.mentor?.id !== mentor?.id) &&
									(!loading && !followLoading ? (
										<button
											onClick={handleFollow}
											className={classNames(
												"text-sm hover:underline",
												followingMentor ? "text-[#E96850]" : "text-[#70C5A1]",
											)}>
											{followingMentor ? "Unfollow" : "+ Follow"}
										</button>
									) : (
										followLoading && <ActivityIndicator className="border-[.1em]" size={10} />
									))}
							</div>

							{/* )} */}
						</div>
						<div className="mt-1 whitespace-nowrap">
							<span className="flex flex-wrap gap-2 xs:text-sm text-xs text-[#B1B1B1] items-center">
								{!loading ? (
									<p className="capitalize text-black">
										{mentor?.role.split("_").join(" ").toLowerCase()}
									</p>
								) : (
									<span className="bg-zinc-200 h-1 w-20" />
								)}
								<p className="flex gap-2 items-center text-xs">
									<GlobeIconSvg />
									{!loading ? (
										mentor?.language.filter((c) => c.length > 0).join(" | ") || "English"
									) : (
										<span className="bg-zinc-200 h-1 w-10 animate__animated animate__fadeIn animate__infinite animate__fast" />
									)}
								</p>
							</span>
						</div>
						<div className="mt-2 flex gap-2 items-center text-[#70C5A1] whitespace-nowrap">
							{!loading &&
								mentor?.skills &&
								mentor?.skills
									.map((skill, i) => (
										<p className="text-xs" key={i}>
											{skill.skill_name}
											{/* {skill.years_of_exp && `- ${skill.years_of_exp}y`} */}
										</p>
									))
									.slice(0, 3)}
						</div>
						<div className="mt-2 text-xs flex gap-3 sm:items-center text-[#b1b1b1] whitespace-nowrap">
							{!loading ? (
								<p className="">
									{mentor && formatFollowersCount(overallExperience)} year(s) of Experience
								</p>
							) : (
								<span className="bg-zinc-200 h-1 w-40 animate__animated animate__fadeIn animate__infinite animate__slow" />
							)}
							{/* <p className="">
								{mentor?.sessions === 1 ? mentor?.sessions + " session" : mentor?.sessions + " sessions"}
							</p> */}
							{!loading ? (
								<p className="flex gap-1 items-center">
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-[-1px]">
										<path
											d="M11.7002 5.4661L9.28574 7.65303L10.009 10.909C10.0473 11.0792 10.0364 11.2573 9.97761 11.4211C9.91886 11.5849 9.81489 11.7271 9.67869 11.8299C9.5425 11.9328 9.38013 11.9916 9.21187 11.9992C9.04362 12.0067 8.87696 11.9626 8.73272 11.8724L5.99652 10.15L3.26621 11.8724C3.12197 11.9626 2.95531 12.0067 2.78705 11.9992C2.6188 11.9916 2.45643 11.9328 2.32024 11.8299C2.18404 11.7271 2.08007 11.5849 2.02132 11.4211C1.96257 11.2573 1.95165 11.0792 1.98993 10.909L2.71212 7.65636L0.297134 5.4661C0.169403 5.35176 0.0770399 5.20084 0.0316278 5.03224C-0.0137844 4.86364 -0.0102243 4.68488 0.0418616 4.51838C0.0939475 4.35187 0.192241 4.20503 0.324414 4.09628C0.456588 3.98752 0.61676 3.92168 0.784842 3.90702L3.96806 3.62088L5.21062 0.544954C5.27551 0.383555 5.38496 0.245689 5.52519 0.148717C5.66542 0.051744 5.83016 0 5.99866 0C6.16717 0 6.33191 0.051744 6.47214 0.148717C6.61237 0.245689 6.72182 0.383555 6.7867 0.544954L8.03301 3.62088L11.2152 3.90702C11.3832 3.92168 11.5434 3.98752 11.6756 4.09628C11.8078 4.20503 11.9061 4.35187 11.9581 4.51838C12.0102 4.68488 12.0138 4.86364 11.9684 5.03224C11.923 5.20084 11.8306 5.35176 11.7029 5.4661H11.7002Z"
											fill="#FF5C00"
											fillOpacity="0.65"
										/>
									</svg>
									{calculateRatingInReviews(mentor?.reviews as IReview[])}
								</p>
							) : (
								<span className="bg-zinc-200 h-1 w-20" />
							)}
						</div>
						<div className="mt-5 flex justify-start items-center gap-5">
							{!loading ? (
								<div
									className="px-4 p-2 select-none bg-[#A3A6A7] text-sm text-white"
									style={{ fontFamily: "Days One" }}>
									${formatAmount(Number(mentor?.hourly_rate)).toLocaleString()}/hour
								</div>
							) : (
								<span className="bg-zinc-100 h-8 w-20" />
							)}
							{!loading && mentor?.user.country ? (
								<IconComp width="25px" height="25px" />
							) : (
								loading && <span className="bg-zinc-200 h-6 w-8" />
							)}
						</div>
					</div>
				</div>
				<div className="grid gap-4 md:pl-4 h-full md:w-[48%]">
					{loading ? <span className="bg-zinc-200 h-1 w-20" /> : <h1 className="">About Me</h1>}
					{loading ? (
						<span className="bg-zinc-200 h-1 w-20" />
					) : (
						<p className="text-xs text-[#9A9898]">
							{mentor?.about && mentor?.about.length >= 255
								? mentor?.about.slice(0, 255) + "..."
								: mentor?.about}
						</p>
					)}
					{!loading ? (
						!detailsPage ? (
							<div className="flex gap-5 items-center">
								<PrimaryButton
									title="View Profile"
									// onClick={() => navigateToAuthPage(router, `/mentors/${mentor?.id}`)}
									onClick={() => router.push(`/mentors/${mentor?.id}`)}
									className="px-5 p-1.5 text-sm"
								/>
							</div>
						) : (
							<div className="xs:flex grid items-center gap-x-3 mt-5 flex-wrap">
								<p className="text-[#9A9898] text-sm">Links: </p>
								{links.map((l, i) => {
									return (
										<span className="text-xs text-[#70C5A1] cursor-pointer hover:underline" key={i}>
											{l}
										</span>
									);
								})}
							</div>
						)
					) : (
						<span className="bg-zinc-200 h-4 w-20" />
					)}
				</div>
			</div>
		</div>
	);
};

export default MentorProfileCard;
