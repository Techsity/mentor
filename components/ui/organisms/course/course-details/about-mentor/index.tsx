/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useId, useState } from "react";
import { formatFollowersCount } from "../../../../../../utils";
import { IMentor } from "../../../../../../interfaces/mentor.interface";
import { useMutation } from "@apollo/client";
import router from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { currentUser, isLoggedIn } from "../../../../../../redux/reducers/auth/authSlice";
import { FOLLOW_MENTOR } from "../../../../../../services/graphql/mutations/mentors";
import { navigateToAuthPage } from "../../../../../../utils/auth";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import classNames from "classnames";

const CoursePageAboutMentor = (mentor: IMentor) => {
	const toastId = useId();

	const user = useSelector(currentUser);
	const auth = useSelector(isLoggedIn);
	const hasFollowedMentor = !true;
	const [followMentorMutation, { loading: followLoading, data }] = useMutation(FOLLOW_MENTOR);
	const [followersCount, setFollowersCount] = useState<number>(0);
	const [followingMentor, setFollowingMentor] = useState<boolean>(false);

	const handleFollow = async () => {
		if (!auth || !user) {
			toast.error("You're not logged in!", { theme: "light", toastId });
			navigateToAuthPage(router, `/mentors/${mentor?.id}`);
			return;
		}

		if (mentor)
			await followMentorMutation({ variables: { mentorId: mentor.id, follow: !followingMentor } })
				.then(() => {
					setFollowingMentor((p) => !p);
					if (!followingMentor) setFollowersCount((p) => (p += 1));
					else setFollowersCount((p) => (p -= 1));
					// if (onFollow) onFollow();
				})
				.catch((err) => console.error(`Error following mentor ${mentor.id}: `, err));
	};

	useEffect(() => {
		if (mentor) {
			setFollowersCount(mentor.followers.length);
			setFollowingMentor(Boolean(mentor?.followers.find((follower) => String(follower.id) === String(user?.id))));
		}
	}, [mentor]);

	return (
		<div className="px-6 sm:px-12 mt-10 py-3">
			<h1 className="text-xl font-semibold">About Mentor</h1>
			<div className="mt-8">
				<div className="my-2 sm:my-4 flex items-center gap-2">
					<div className="flex gap-1.5 items-center">
						<img
							src={mentor.user.avatar || "/assets/images/avatar.png"}
							className="rounded-full w-20"
							alt={mentor.user.name}
						/>
					</div>
					<div className="grid items-center max-w-sm font-[300] text-sm gap-1">
						<div className="flex item-center gap-2">
							<h1 className="font-semibold text-lg text-[#094B10]">{mentor.user.name}</h1>
							{mentor.mentor_verified ? (
								<svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-1.5">
									<path
										d="M6.29757 11L4 8.60232L5.04704 7.50965L6.29757 8.81853L9.95296 5L11 6.09266L6.29757 11Z"
										fill="#0CF27E"
									/>
									<rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#70C5A1" />
								</svg>
							) : null}
							<p className="flex items-center">{formatFollowersCount(followersCount)} followers</p>
							{/* <p className="flex gap-2 items-center text-[#70C5A1] select-none cursor-pointer">+follow</p> */}
							{!followLoading ? (
								<button
									onClick={handleFollow}
									className={classNames(
										"flex items-center justify-center",
										"text-sm hover:underline",
										followingMentor ? "text-[#E96850]" : "text-[#70C5A1]",
									)}>
									{followingMentor ? "Unfollow" : "+ Follow"}
								</button>
							) : (
								<ActivityIndicator className="border-[.1em]" size={10} />
							)}
						</div>
						<p className="">{mentor.role.split("_").join(" ")} </p>
						<p className="flex gap-1 items-center">
							{formatFollowersCount(mentor.courses.length)} Courses |{" "}
							{formatFollowersCount(followersCount)} Followers
						</p>
					</div>
				</div>
				<div className="text-[#9A9898] text-sm max-w-2xl">{mentor.about}</div>
			</div>
		</div>
	);
};

export default CoursePageAboutMentor;
