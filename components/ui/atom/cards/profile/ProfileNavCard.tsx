import React, { Dispatch, SetStateAction, useState } from "react";

const ProfileNavCard = ({
	activeTab,
	setActiveTab,
	tabLinks,
}: {
	tabLinks: string[];
	activeTab: string;
	setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<>
			<div className="duration-300 border p-4 border-[#70C5A1] overflow-x-auto flex xl:flex-col justify-between w-full items-start gap-4 bg-white/50 backdrop-blur-md">
				{tabLinks.map((link, i) => (
					<div
						onClick={() => setActiveTab(link)}
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
