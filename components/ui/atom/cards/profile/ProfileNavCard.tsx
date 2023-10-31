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
	return (
		<>
			<div className="duration-300 border p-4 border-[#70C5A1] overflow-x-auto flex flex-col justify-between w-full items-start gap-4 xl:bg-white bg-black/50 backdrop-blur-md">
				{tabLinks.map((link, i) => (
					<div
						onClick={() => {
							scrollToTop();
							setActiveTab(link);
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
		</>
	);
};

export default ProfileNavCard;
