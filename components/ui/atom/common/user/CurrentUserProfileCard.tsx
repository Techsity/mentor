/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";

const CurrentUserProfileCard = () => {
	const user = useSelector(currentUser);
	const links: { name: string; path: string }[] = [
		{ name: "My Learning", path: "/dashboard/my-courses/learning" },
		{ name: "My Cart", path: "/cart" },
		{ name: "Wishlist", path: "/dashboard/wishlist" },
		{ name: "Archive", path: "/dashboard/archive" },
	];
	return (
		<div className="relative group cursor-pointer h-full">
			<Link href={`/dashboard`}>
				<div className="flex items-center gap-3">
					<div className="rounded-full w-9 h-9 relative">
						<img
							src={user?.avatar || "/assets/images/avatar.png"}
							alt={user?.fullName}
							className="w-full h-full"
							loading="lazy"
						/>
					</div>
					<div className="leading-none sm:inline-block hidden">
						<h1 className="text-lg font-medium">
							{user?.fullName.split(" ")[0] +
								" " +
								user?.fullName.split(" ")[1]}
						</h1>
						<p className="text-[#70C5A1] capitalize font-[300]">
							{user?.role}
						</p>
					</div>
				</div>
			</Link>
			<div className="group-hover:inline-flex w-full border border-[#70C5A1] min-w-[20vw] right-0 hidden absolute w-full sm:max-w-[20dvw] max-w-screen bg-white shadow-md h-auto max-h-[100vh] sm:max-h-[65vh] animate__animated animate__fadeIn animate__faster">
				<div className="flex flex-col items-center w-full">
					{links.map((link, i) => (
						<Link href={link.path || "#"} key={i}>
							<span className="p-4 px-10 flex w-full whitespace-nowrap text-sm hover:bg-zinc-100 duration-300 cursor-pointer">
								{link.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default CurrentUserProfileCard;
