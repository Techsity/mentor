/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IAboutHeroCarouselData } from "../../../../../interfaces";
import Link from "next/link";

const ConnectMentorSlideCard = ({
	paragraph,
	title,
	video,
}: IAboutHeroCarouselData) => {
	return (
		<div className="w-full h-full select-none flex gap-10 justify-between items-center">
			{/* <div className="flex just"></div> */}
			<div className="ml-10 flex-grow max-w-sm xl:max-w-lg h-full py-10">
				<h1 style={{ fontFamily: "Days One" }} className="text-2xl text-[#33AC15]">
					{title.slice(0, 65)}...
				</h1>
				<h1 className="text-sm mt-3" style={{ fontWeight: "300" }}>
					{paragraph}
				</h1>
				<div className="flex justify-start">
					<Link href="#">
						<div className="mt-16 cursor-pointer bg-[#094B10] px-6 p-2 text-white hover:opacity-60 duration-300">
							Check all Reviews
						</div>
					</Link>
				</div>
			</div>
			<div className="hidden lg:flex justify-center object-contain h-full w-[50%] bg-zinc-100">
				{/* Meant to be a video */}
				<img
					src={video || "/assets/images/thumbnails/tmb_1.png"}
					className="w-full h-full"
					alt={title.slice(0, 20) + "..."}
				/>
			</div>
		</div>
	);
};

export default ConnectMentorSlideCard;
