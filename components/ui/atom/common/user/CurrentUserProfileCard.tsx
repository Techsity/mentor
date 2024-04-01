/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { useRouter } from "next/router";
import Avatar from "./Avatar";

const CurrentUserProfileCard = () => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const adminUrl = String(process.env.NEXT_PUBLIC_MENTOR_ADMIN_URL);
	const navigate = () => {
		user?.is_admin && adminUrl ? window.open(adminUrl, "_blank") : router.push("/profile");
	};
	const role = user?.mentor ? "Mentor" : "Mentee";

	return (
		<div onClick={navigate} className="relative group cursor-pointer h-full">
			<div className="flex items-center gap-3">
				<Avatar user={user} />
				<div className="leading-none sm:inline-block hidden">
					<h1 className="text-sm">
						{/* {user?.name.split(" ")[0] +
								" " +
								user?.name.split(" ")[1]} */}
						<span className="font-medium">{user && user?.name.split(" ")[0]}</span>
						<p className="capitalize text-[#70C5A1] text-xs">{role}</p>
					</h1>
				</div>
			</div>
		</div>
	);
};

export default CurrentUserProfileCard;
