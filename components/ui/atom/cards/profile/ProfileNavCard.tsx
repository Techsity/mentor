import React, { Dispatch, SetStateAction, useState } from "react";
import { TabLinkType } from "../../../../templates/user/profile";
import { scrollToTop } from "../../../../../utils";

const ProfileNavCard = ({
	activeTab,
	setActiveTab,
	tabLinks,
}: {
	tabLinks: TabLinkType[];
	activeTab: TabLinkType;
	setActiveTab: Dispatch<SetStateAction<TabLinkType>>;
}) => {
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	return (
		<>
			<div className="border p-4 border-[#70C5A1] bg-white backdrop-blur-md flex flex-col relative">
				<div
					onClick={() => setOpenDropdown(!openDropdown)}
					className={`xl:hidden duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full ${
						!true ? "text-[#70C5A1]" : "bg-[#70C5A1] text-white"
					}`}>
					{activeTab}
				</div>
				<div
					className={`mt-5 overflow-x-auto ${
						openDropdown ? "flex" : "hidden"
					} xl:flex xl:flex-col flex-wrap justify-between w-full items-start gap-4 duration-300`}>
					{tabLinks.map((link, i) => (
						<div
							onClick={() => {
								scrollToTop();
								setActiveTab(link);
								setOpenDropdown(false);
							}}
							key={i}
							className={`duration-300 select-none cursor-pointer p-4 border border-[#70C5A1] w-full ${
								link === activeTab
									? "text-[#70C5A1]"
									: "bg-[#70C5A1] text-white"
							}`}>
							{link}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ProfileNavCard;
