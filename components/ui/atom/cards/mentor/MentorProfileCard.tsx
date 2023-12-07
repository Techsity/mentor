/* eslint-disable @next/next/no-img-element */
import router, { useRouter } from "next/router";
import React from "react";
import { formatFollowersCount } from "../../../../../utils";
import { PrimaryButton } from "../../buttons";
import { GlobeIconSvg } from "../../icons/svgs";
import * as FlagIcons from "react-country-flags-select";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import Link from "next/link";

const MentorProfileCard = ({
	detailsPage = false,
	mentor,
}: {
	mentor: IMentor;
	detailsPage?: boolean;
}) => {
	const router = useRouter();
	const country: string =
		mentor.country.charAt(0) + mentor.country.charAt(1).toLowerCase();
	interface IconType {
		[key: string]: React.ElementType;
	}
	const IconComponent: IconType = FlagIcons;
	const IconComp: any = mentor.country ? IconComponent[country] : null;
	return (
		<Link href={`/mentors/${mentor.username}`}>
			<div className="animate__animated animate__fadeIn border bg-white border-[#70C5A1] p-5 w-full lg:flex justify-between shadow">
				<div className="w-full pr-4 flex items-start gap-3">
					<div className="flex justify-center items-center">
						<div className="relative">
							<img
								src={
									mentor.avatar || "/assets/images/avatar.png"
								}
								alt=""
								className="w-28 rounded-full"
								loading="lazy"
							/>
							<span
								className={`absolute ${
									mentor.is_online
										? "bg-[#00AD74]"
										: "bg-[#F6937B]"
								} w-3 h-3 sm:h-5 sm:w-5 border-white border-2 top-0 left-0 xs:left-2 rounded-full`}
							/>
							{/* <div className="flex justify-center items-center -ml-3 mt-4 flex-wrap">
                            <button className="text-[#70C5A1] text-sm xl:hidden sm:hidden xs:hidden hover:underline">
                                + Follow
                            </button>
                        </div> */}
						</div>
					</div>
					<div className="">
						<div className="flex items-center gap-3 whitespace-nowrap">
							<h1 className="text-lg text-[#094B10] font-semibold flex items-center gap-2">
								{mentor.name}
								{mentor.verified ? (
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
								) : (
									<svg
										width="16"
										height="16"
										viewBox="0 0 13 13"
										fill="none"
										className="flex justify-center items-center"
									/>
								)}
							</h1>
							<p className="text-sm">
								{formatFollowersCount(mentor.followers)}{" "}
								followers
							</p>
							<button className="text-[#70C5A1] text-sm xs:block sm:block hidden xl:block hover:underline">
								+ Follow
							</button>
						</div>
						<div className="mt-2 whitespace-nowrap">
							<span className="flex flex-wrap gap-2 xs:text-sm text-xs text-[#B1B1B1]">
								<p className="capitalize text-black">
									{mentor.jobTitle.split("/")[0]}
								</p>
								<p className="flex gap-1 items-center">
									<GlobeIconSvg />
									{mentor.languages.join(" | ")}
								</p>
							</span>
						</div>
						<div className="mt-2 flex gap-2 items-center text-[#70C5A1] whitespace-nowrap">
							{mentor.skills
								.map((skill, i) => (
									<p className="text-xs" key={i}>
										{skill}
									</p>
								))
								.slice(0, 3)}
						</div>
						<div className="mt-2 text-xs flex gap-3 items-center text-[#b1b1b1] whitespace-nowrap">
							<p className="">
								{mentor?.experience?.length} Year of Experience
							</p>
							<p className="">
								{mentor.sessions === 1
									? mentor.sessions + " session"
									: mentor.sessions + " sessions"}
							</p>
							<p className="flex gap-1 items-center">
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									className="mt-[-1px]">
									<path
										d="M11.7002 5.4661L9.28574 7.65303L10.009 10.909C10.0473 11.0792 10.0364 11.2573 9.97761 11.4211C9.91886 11.5849 9.81489 11.7271 9.67869 11.8299C9.5425 11.9328 9.38013 11.9916 9.21187 11.9992C9.04362 12.0067 8.87696 11.9626 8.73272 11.8724L5.99652 10.15L3.26621 11.8724C3.12197 11.9626 2.95531 12.0067 2.78705 11.9992C2.6188 11.9916 2.45643 11.9328 2.32024 11.8299C2.18404 11.7271 2.08007 11.5849 2.02132 11.4211C1.96257 11.2573 1.95165 11.0792 1.98993 10.909L2.71212 7.65636L0.297134 5.4661C0.169403 5.35176 0.0770399 5.20084 0.0316278 5.03224C-0.0137844 4.86364 -0.0102243 4.68488 0.0418616 4.51838C0.0939475 4.35187 0.192241 4.20503 0.324414 4.09628C0.456588 3.98752 0.61676 3.92168 0.784842 3.90702L3.96806 3.62088L5.21062 0.544954C5.27551 0.383555 5.38496 0.245689 5.52519 0.148717C5.66542 0.051744 5.83016 0 5.99866 0C6.16717 0 6.33191 0.051744 6.47214 0.148717C6.61237 0.245689 6.72182 0.383555 6.7867 0.544954L8.03301 3.62088L11.2152 3.90702C11.3832 3.92168 11.5434 3.98752 11.6756 4.09628C11.8078 4.20503 11.9061 4.35187 11.9581 4.51838C12.0102 4.68488 12.0138 4.86364 11.9684 5.03224C11.923 5.20084 11.8306 5.35176 11.7029 5.4661H11.7002Z"
										fill="#FF5C00"
										fillOpacity="0.65"
									/>
								</svg>
								{mentor.rating} (200 Ratings)
							</p>
						</div>
						<div className="mt-10 flex justify-start items-center gap-5">
							<div
								className="px-4 p-2 select-none bg-[#A3A6A7] text-sm text-white"
								style={{ fontFamily: "Days One" }}>
								{mentor.ratePerHour} / hour
							</div>
							{/* <svg width="24" height="19" viewBox="0 0 24 19" fill="none">
                            <rect width="8" height="19" fill="#078661" />
                            <rect x="8" width="8" height="19" fill="white" />
                            <rect x="16" width="8" height="19" fill="#078661" />
                        </svg> */}
							<IconComp width="25px" height="25px" />
						</div>
					</div>
				</div>
				<div className="w-full lg:border-l-[.2em] border-[#D9D9D9] pl-4 mt-3">
					<p className="text-[#9A9898] text-sm">{mentor.about}</p>
					{!detailsPage ? (
						<div className="flex gap-5 items-center mt-10">
							<PrimaryButton
								title="Consult"
								link={`/mentors/${mentor.username}`}
								className="px-5 p-2"
							/>
						</div>
					) : (
						<p className="">Links</p>
					)}
				</div>
			</div>
		</Link>
	);
};

export default MentorProfileCard;
