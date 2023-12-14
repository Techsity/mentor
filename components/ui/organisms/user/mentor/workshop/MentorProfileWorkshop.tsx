import React, { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import workshops from "../../../../../../data/workshops";
import RegitsteredWorkshops from "../../profile/RegitsteredWorkshops";
import WorkshopDisplayCard from "../../../../atom/cards/mentee/WorkshopDisplayCard";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../../redux/reducers/features/authSlice";

const MentorProfileWorkshop = () => {
	const mentorWorkshops = useMemo(() => workshops, []);
	const [active, setActive] = useState<"registered-workshop" | "my-workshop">("registered-workshop");
	const user = useSelector(currentUser);
	return (
		<>
			<NavSection {...{ active, setActive }} />
			{active === "registered-workshop" ? (
				<RegitsteredWorkshops />
			) : (
				active === "my-workshop" && (
					<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center animate__animated animate__fadeIn">
						{mentorWorkshops.map((workshop, i) => (
							<WorkshopDisplayCard
								// owner={user?.id === workshop.mentor.user.id}
								owner={user?.mentor ? true : false}
								profile
								workshop={workshop}
								key={i}
							/>
						))}
					</div>
				)
			)}
		</>
	);
};

const NavSection: FC<{
	active: "registered-workshop" | "my-workshop";
	setActive: Dispatch<SetStateAction<"registered-workshop" | "my-workshop">>;
}> = ({ active, setActive }) => (
	<div className="flex items-center gap-3 mb-6 w-full text-sm">
		<div className="flex item-center flex-grow max-w-md">
			<div
				onClick={() => setActive("registered-workshop")}
				className={`w-full cursor-pointer select-none px-4 border p-3 text-center capitalize duration-300 ${
					active === "registered-workshop"
						? "bg-[#094B10] text-white"
						: "bg-transparent text-[#094B10] border-[#094B10] border-r-transparent"
				}`}>
				Registered Workshop
			</div>
			<div
				onClick={() => setActive("my-workshop")}
				className={`w-full cursor-pointer select-none px-4 border p-3 text-center capitalize duration-300 ${
					active === "my-workshop"
						? "bg-[#094B10] text-white"
						: "bg-transparent text-[#094B10] border-[#094B10] border-l-transparent"
				}`}>
				My Workshop
			</div>
		</div>
		<div className="text-[#70C5A1] capitalize select-none cursor-pointer font-medium">My drafts</div>
	</div>
);

export default MentorProfileWorkshop;
