import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { capitalizeSentence, scrollToTop, slugify } from "../../../../../utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { link } from "fs";
import { ProfileTabLinkType } from "../../../../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { fetchUserProfile } from "../../../../../redux/reducers/auth/apiAuthSlice";

const ProfileNavCard = ({
	activetab,
	setActivetab,
	tabLinks,
}: {
	tabLinks: ProfileTabLinkType[];
	activetab: ProfileTabLinkType;
	setActivetab: Dispatch<SetStateAction<ProfileTabLinkType>>;
}) => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	const tab = router.query.tab as ProfileTabLinkType;
	const activeLink = useMemo(() => tab, [router, tab, user]);

	useEffect(() => {
		if (activeLink) {
			if (tabLinks.includes(activeLink)) setActivetab(activeLink);
			else router.push(`/profile/${slugify(tabLinks[0])}`).then(() => setActivetab(tabLinks[0]));
		}
		scrollTo({ top: 0, behavior: "smooth" });
	}, [activeLink, router]);

	const handleNavigate = (link: ProfileTabLinkType) => {
		if (link !== activetab) {
			scrollToTop();
			setOpenDropdown(false);
			router.push(`/profile/${slugify(link)}`).then(() => setActivetab(link));
		}
	};

	return (
		<div className="border-2 p-4 border-[#70C5A1] bg-white backdrop-blur-md flex flex-col relative text-sm">
			<div
				onClick={() => setOpenDropdown(!openDropdown)}
				className={`capitalize lg:hidden duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full`}>
				{activetab.split("-").join(" ")}
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
							link === activetab ? "text-[#70C5A1]" : "bg-[#70C5A1] text-white"
						}`}>
						{link.split("-").join(" ")}
					</div>
				))}
			</div>
		</div>
	);
};

export default ProfileNavCard;
