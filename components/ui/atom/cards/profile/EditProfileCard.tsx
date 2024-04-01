/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, updateMentorProfile } from "../../../../../redux/reducers/auth/authSlice";
import { PrimaryButton } from "../../buttons";
import { useRouter } from "next/router";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import { PowerOutline } from "react-ionicons";
import { logoutUser } from "../../../../../utils/auth";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { useSocketContext } from "../../../../../context/socket-io.context";
import Avatar from "../../common/user/Avatar";
import { fetchUserProfile } from "../../../../../redux/reducers/auth/apiAuthSlice";

const EditProfileCard = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const user = useSelector(currentUser);
	const { client } = useSocketContext();

	const handleProfileSwitch = async () => {
		setLoading(true);
		console.log({ is_mentor: user?.is_mentor });
		if (user?.is_mentor || user?.mentor) {
			if (user.mentor) dispatch(updateMentorProfile(null));
			else await dispatch(fetchUserProfile() as any);
			setLoading(false);
			router.replace("/profile");
		} else router.push("/mentor/onboarding");
	};

	const handleLogout = () => {
		logoutUser(() => {
			client.disconnect();
		});
	};

	const role = user?.mentor ? "Mentor" : "Mentee";

	return (
		<div>
			<h1 className="text-sm text-zinc-500 mt-5">My profile</h1>
			<div className="my-6 grid xl:grid-cols-1 sm:grid-cols-2 gap-6">
				<div className="flex items-center w-full justify-between">
					<div className="flex items-center gap-1">
						<Avatar user={user} />
						<div className="text-sm">
							<p className="font-medium">{user?.name}</p>
							{/* <p>{user?.role}</p> */}
							<p className="text-[#70C5A1]">{role}</p>
						</div>
					</div>
					<div className="cursor-pointer" onClick={handleLogout}>
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
						onClick={handleProfileSwitch}
						disabled={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProfileCard;
