/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";

const CurrentUserProfileCard = () => {
	const user = useSelector(currentUser);

	return (
		<div className="relative group cursor-pointer h-full">
			<Link href={`/profile`}>
				<div className="flex items-center gap-3">
					<div className="rounded-full object-cover w-9 h-9 relative">
						<img
							src={user?.avatar || "/assets/images/avatar.png"}
							alt={""}
							className="w-full h-full bg-zinc-300 rounded-full"
							loading="lazy"
						/>
					</div>
					<div className="leading-none sm:inline-block hidden">
						<h1 className="text-sm font-medium">
							{/* {user?.name.split(" ")[0] +
								" " +
								user?.name.split(" ")[1]} */}
							{user?.name.split(" ")[0]}
						</h1>
					</div>
				</div>
			</Link>
			{/* <div className="group-hover:inline-flex w-full border border-[#70C5A1] min-w-[20dvw] right-0 hidden absolute w-full sm:max-w-[25dvw] max-w-[100dvw] bg-white shadow-md h-auto max-h-[100vh] sm:max-h-[65vh] animate__animated animate__fadeIn animate__faster">
				<div className="flex flex-col items-center w-full">
					{links.map((link, i) => (
						<Link href={link.path || "#"} key={i}>
							<span className="p-4 px-10 flex w-full whitespace-nowrap text-sm hover:bg-zinc-200 duration-300 cursor-pointer">
								{link.name}
							</span>
						</Link>
					))}
				</div>
			</div> */}
		</div>
	);
};

export default CurrentUserProfileCard;
