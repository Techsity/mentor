import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
	const tab = router.query.tab as ProfileTabLinkType;

	const activeLink = useMemo(() => tab, [router, tab]);

	useEffect(() => {
		if (activeLink)
			if (tabLinks.includes(activeLink)) {
				setActiveTab(activeLink);
			}
		scrollTo({ top: 0, behavior: "smooth" });
	}, [activeLink, router]);

	const handleNavigate = (link: ProfileTabLinkType) => {
		scrollToTop();
		setActiveTab(link);
		setOpenDropdown(false);
		router.push(`/profile/${slugify(link)}`);
	};

	return (
		<>
			<div className="border p-4 border-[#70C5A1] bg-white backdrop-blur-md flex flex-col relative">
				<div
					onClick={() => setOpenDropdown(!openDropdown)}
					className={`capitalize lg:hidden duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full`}>
					{activeTab.split("-").join(" ")}
				</div>
				<div
					className={`mt-5 overflow-x-auto ${
						openDropdown ? "flex" : "hidden"
					} lg:flex flex-col justify-between w-full items-start gap-4 duration-300`}>
					{tabLinks.map((link, i) => (
						<div
							key={i}
							onClick={() => handleNavigate(link)}
							className={`capitalize duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full ${
								link === activeTab ? "text-[#70C5A1]" : "bg-[#70C5A1] text-white"
							}`}>
							{link.split("-").join(" ")}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ProfileNavCard;
