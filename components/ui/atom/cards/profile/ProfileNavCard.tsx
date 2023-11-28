import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { capitalizeSentence, scrollToTop, slugify } from "../../../../../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { link } from "fs";
import { ProfileTabLinkType } from "../../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";

const ProfileNavCard = ({
	activeTab,
	setActiveTab,
	tabLinks,
}: {
	tabLinks: ProfileTabLinkType[];
	activeTab: ProfileTabLinkType;
	setActiveTab: Dispatch<SetStateAction<ProfileTabLinkType>>;
}) => {
	const router = useRouter();
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	const user = useSelector(currentUser);

	const activeLink = capitalizeSentence(
		router.asPath
			? router.asPath.split("#")[1]?.split("-").join(" ") || ""
			: "",
	) as ProfileTabLinkType;

	useEffect(() => {
		if (activeLink)
			if (tabLinks.includes(activeLink)) {
				setActiveTab(activeLink);
			}
		scrollTo({ top: 0, behavior: "smooth" });
	}, [activeLink, router]);

	return (
		<>
			<div className="border p-4 border-[#70C5A1] bg-white backdrop-blur-md flex flex-col relative">
				<div
					onClick={() => setOpenDropdown(!openDropdown)}
					className={`lg:hidden duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full ${
						!true ? "text-[#70C5A1]" : "bg-[#70C5A1] text-white"
					}`}>
					{activeTab}
				</div>
				<div
					className={`mt-5 overflow-x-auto ${
						openDropdown ? "flex" : "hidden"
					} lg:flex flex-col justify-between w-full items-start gap-4 duration-300`}>
					{tabLinks.map((link, i) => (
						// <Link key={i} href={`#${slugify(link)}`}>
						<div
							key={i}
							onClick={() => {
								scrollToTop();
								setActiveTab(link);
								setOpenDropdown(false);
							}}
							className={`duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full ${
								link === activeTab
									? "text-[#70C5A1]"
									: "bg-[#70C5A1] text-white"
							}`}>
							{link}
						</div>
						// </Link>
					))}
				</div>
			</div>
		</>
	);
};

export default ProfileNavCard;
