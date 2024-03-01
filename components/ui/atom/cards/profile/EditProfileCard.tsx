/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, switchProfile } from "../../../../../redux/reducers/authSlice";
import { PrimaryButton } from "../../buttons";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import { GET_MENTOR_PROFILE } from "../../../../../services/graphql/mutations/auth";
import { PowerOutline } from "react-ionicons";
import { logoutUser } from "../../../../../utils/auth";
import ActivityIndicator from "../../loader/ActivityIndicator";

const EditProfileCard = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const user = useSelector(currentUser);
	const [getMentorProfile] = useLazyQuery<{ getMentorProfile: IMentor }, any>(GET_MENTOR_PROFILE);

	const handleSwitchProfile = async () => {
		setLoading(true);
		if (user?.is_mentor || user?.mentor) {
			if (user?.mentor || user?.mentor) {
				setTimeout(function () {
					setLoading(false);
					dispatch(switchProfile({ profile: null }));
					router.replace("/profile");
				}, 1000);
			} else {
				try {
					const res = await getMentorProfile();
					const mentorProfile = res.data?.getMentorProfile;
					if (mentorProfile) {
						setLoading(false);
						dispatch(switchProfile({ profile: mentorProfile }));
						router.replace("/profile");
					}
				} catch (err) {
					console.error(err);
					setLoading(false);
				}
			}
		} else router.push("/mentor/onboarding");
	};
	return (
		<div>
			<h1 className="text-sm text-zinc-500 mt-5">My profile</h1>
			<div className="my-6 grid xl:grid-cols-1 sm:grid-cols-2 gap-6">
				<div className="flex items-center w-full justify-between">
					<div className="flex items-center gap-1">
						<img
							src={user?.avatar || "/assets/images/avatar.png"}
							alt=""
							className="rounded-full w-12 h-12"
						/>
						<div className="text-sm">
							<p className="font-medium">{user?.name}</p>
							{/* <p>{user?.role}</p> */}
							<p className="text-[#70C5A1]">{user?.mentor ? "Mentor" : "User"}</p>
						</div>
					</div>
					<div className="cursor-pointer" onClick={() => logoutUser()}>
						<PowerOutline color="#d31119" />
					</div>
				</div>
				<div className="my-5 text-sm grid gap-3">
					<div className="flex items-center gap-2">
						<p className="">Email:</p>
						<span className="font-medium">{user?.email}</span>
					</div>
					<div className="flex items-center gap-2">
						<p className="">Phone:</p>
						<span className="font-medium">{user?.phone || "null"}</span>
					</div>
					<div className="flex items-center gap-2">
						<p className="">Country:</p>
						<span className="font-medium">{user?.country || "null"}</span>
					</div>
					<div className="flex items-center justify-start">
						<PrimaryButton title="Edit Profile" className="p-3 px-6" link="/profile/settings" />
					</div>
				</div>
				<div className="">
					<h1 className="text-sm text-zinc-500 mt-6">Overview</h1>
					<div className="text-sm grid gap-3">
						<span className="font-medium">
							{user && user.subscriptions.filter((sub) => sub.is_completed).length} Completed Courses
						</span>
						<span className="font-medium">5 Ongoing Courses</span>
						<span className="font-medium">10 Attended Workshop</span>
						<span className="font-medium">15 Registered Workshop</span>
					</div>
				</div>
				<div className="flex items-center justify-start mt-10">
					<PrimaryButton
						title={
							loading
								? ""
								: user?.is_mentor || user?.mentor
								? user?.mentor
									? "Switch to Mentee Dashboard"
									: "Switch to Mentor Profile"
								: "Get mentor profile"
						}
						icon={loading ? <ActivityIndicator /> : null}
						className="p-2 px-4 bg-[#FFB100] font-medium text-sm"
						style={{ color: "black" }}
						onClick={handleSwitchProfile}
						disabled={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProfileCard;
