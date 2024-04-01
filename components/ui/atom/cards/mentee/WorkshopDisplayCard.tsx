/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { IWorkshop } from "../../../../../interfaces";
import { calculateRatingInReviews, slugify } from "../../../../../utils";
import { PrimaryButton } from "../../buttons";
import { navigateToAuthPage } from "../../../../../utils/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import dayjs from "dayjs";
import "dayjs/plugin/relativeTime";
import Avatar from "../../common/user/Avatar";

const WorkshopDisplayCard = ({ workshop, profile = false, owner = false }: WorkshopDisplayCardProps) => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
	const isLive = new Date(workshop.scheduled_date) <= new Date();

	useEffect(() => {
		if (user) setIsSubscribed(Boolean(user.subscriptions.find((sub) => sub.workshop_id === workshop.id)));
	}, [user, workshop]);

	return (
		<div className="animate__animated relative animate__fadeIn bg-white overflow-hidden group shadow h-full hover:shadow-lg cursor-default duration-300 pb-6">
			<div className="select-none absolute top-[13%] animate__animated animate__fadeIn animate__faster items-center justify-center z-10 text-white w-full group-hover:flex flex-col sm:hidden p-6">
				{!profile && (
					<button
						onClick={() => router.push(`/workshops/${workshop.id}`)}
						className="px-5 p-1.5 text-center text-sm border border-white hover:bg-white hover:text-black duration-300">
						Register for Workshop
					</button>
				)}
				<div
					onClick={() => router.push(`/workshops/${workshop.id}`)}
					className={
						profile
							? // ? "px-6 p-2 text-center border border-white hover:bg-white hover:text-black duration-300"
							  "px-6 p-2 cursor-pointer  text-center border border-white duration-300 hover:bg-white hover:text-black"
							: ""
					}>
					<h1 className={!profile ? "mt-4" : ""}>
						{new Date(workshop.scheduled_date).toLocaleDateString().split("/").join("-")}
					</h1>
				</div>
			</div>
			<div className="grid gap-2">
				<div className="relative bg-zinc-100 h-full w-full min-h-[200px]">
					<div className="bg-black w-full h-full bg-opacity-50 hidden group-hover:block animate__animated animate__fast animate__fadeIn absolute" />
					<img
						src={workshop.thumbnail || "/assets/images/mockups/course_one.png"}
						className="w-full h-full"
						alt=""
						loading="lazy"
					/>
				</div>
				<h1 className="px-5 font-medium tracking-tight flex items-center justify-between">
					{workshop.title}
					<div className="flex items-center gap-2 text-[#094B10] text-sm ml-8">
						{calculateRatingInReviews(workshop.reviews)}
						<svg width="13" height="13" viewBox="0 0 9 9" fill="none">
							<path
								d="M8.77514 4.09957L6.9643 5.73977L7.50675 8.18173C7.53546 8.30939 7.52727 8.44299 7.4832 8.56585C7.43914 8.6887 7.36116 8.79535 7.25902 8.87246C7.15687 8.94956 7.03509 8.99371 6.90891 8.99938C6.78272 9.00504 6.65772 8.97198 6.54954 8.90431L4.49739 7.61249L2.44966 8.90431C2.34148 8.97198 2.21648 9.00504 2.09029 8.99938C1.9641 8.99371 1.84232 8.94956 1.74018 8.87246C1.63803 8.79535 1.56005 8.6887 1.51599 8.56585C1.47193 8.44299 1.46374 8.30939 1.49244 8.18173L2.03409 5.74227L0.22285 4.09957C0.127052 4.01382 0.0577799 3.90063 0.0237208 3.77418C-0.0103383 3.64773 -0.00766819 3.51366 0.0313962 3.38878C0.0704606 3.26391 0.14418 3.15378 0.243311 3.07221C0.342441 2.99064 0.46257 2.94126 0.588631 2.93027L2.97605 2.71566L3.90796 0.408716C3.95663 0.287666 4.03872 0.184267 4.14389 0.111538C4.24906 0.038808 4.37262 0 4.499 0C4.62538 0 4.74893 0.038808 4.8541 0.111538C4.95927 0.184267 5.04136 0.287666 5.09003 0.408716L6.02476 2.71566L8.41137 2.93027C8.53743 2.94126 8.65756 2.99064 8.75669 3.07221C8.85582 3.15378 8.92954 3.26391 8.9686 3.38878C9.00767 3.51366 9.01034 3.64773 8.97628 3.77418C8.94222 3.90063 8.87295 4.01382 8.77715 4.09957H8.77514Z"
								fill="#FF5C00"
								fillOpacity="0.5"
							/>
						</svg>
					</div>
				</h1>
				<div className="flex items-center justify-between flex-wrap px-5 text-xs mt-2">
					<span className="">{workshop.contents.length} sessions</span>
					<p className="capitalize font-medium">{workshop?.level?.split("_").join(" ")}</p>
					<span className="">starts {dayjs(workshop.scheduled_date).fromNow()}</span>
				</div>
				<p className="text-xs px-5 break-words py-3">
					{workshop.description.length > 40
						? workshop.description.slice(0, 40) + "..."
						: workshop.description}
				</p>
				<div className="flex items-center justify-between px-5">
					<div className="flex gap-2 items-center text-sm relative">
						<Avatar user={workshop.mentor.user} />
						<h1 className="text-xs">{workshop.mentor.user.name}</h1>
						{/* <div className="absolute w-ful left-0"></div> */}
					</div>
					{
						!profile ? (
							isSubscribed ? (
								<div className="text-gray-500 text-sm bg-[#ccc] select-none rounded px-4 p-2 cursor-default">
									Subscribed
								</div>
							) : workshop.price === 0 ? (
								<div className="text-white text-sm bg-[#094B10] select-none rounded px-6 p-2">Free</div>
							) : (
								<div className="text-black bg-[#FFB100] select-none rounded px-6 text-sm p-2">
									${workshop.price.toLocaleString()}
								</div>
							)
						) : profile && owner ? (
							<div className="flex justify-end items-center">
								<PrimaryButton
									onClick={() =>
										navigateToAuthPage(router, `/profile/workshop/edit/${slugify(workshop.title)}`)
									}
									title="Edit"
									className="p-1.5 px-4 text-sm"
								/>
							</div>
						) : (
							profile && (
								<div
									title={
										!isLive
											? "Workshop will be live on " +
											  new Date(workshop.scheduled_date).toDateString()
											: ""
									}
									className="flex justify-end items-center">
									<PrimaryButton
										disabled={!isLive}
										onClick={() =>
											isLive ? router.push(`/profile/workshop/live?id=${workshop.id}`) : {}
										}
										title="Join"
										className="p-1.5 px-4 text-sm"
									/>
								</div>
							)
						)
						// : (
						// 	<div className="flex justify-end items-center">
						// 		<PrimaryButton
						// 			link={`/workshops/${workshop.id}`}
						// 			title="View"
						// 			className="p-1.5 px-4 text-sm"
						// 		/>
						// 	</div>
						// )
					}
				</div>
			</div>
		</div>
	);
};

type WorkshopDisplayCardProps = {
	workshop: IWorkshop;
	profile?: boolean;
	owner?: boolean;
};

export default WorkshopDisplayCard;
