/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const SocialIcons = () => {
	return (
		<div className="flex gap-2 mb-2 bg-white p-1 max-w-[9.3em]">
			<a
				href="about:blank"
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer">
				<img
					loading="lazy"
					src="/assets/images/icons/Twitter.png"
					className="h-6 w-6"
					alt=""
				/>
			</a>
			<a
				href="about:blank"
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer">
				<img
					loading="lazy"
					src="/assets/images/icons/Facebook.png"
					className="h-6 w-6"
					alt=""
				/>
			</a>
			<a
				href="about:blank"
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer">
				<img
					loading="lazy"
					src="/assets/images/icons/LinkedIn.png"
					className="h-6 w-6"
					alt=""
				/>
			</a>
			<a
				href="about:blank"
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer">
				<img
					loading="lazy"
					src="/assets/images/icons/Telegram.png"
					className="h-6 w-6"
					alt=""
				/>
			</a>
			<a
				href="about:blank"
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer">
				<img
					loading="lazy"
					src="/assets/images/icons/Instagram.png"
					className="h-6 w-6"
					alt=""
				/>
			</a>
		</div>
	);
};

export default SocialIcons;
