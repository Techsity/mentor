import React from "react";
import WorkshopDisplayCard from "../../components/ui/atom/cards/mentee/WorkshopDisplayCard";
import workshops from "../../data/workshops";
import { IWorkshop } from "../../interfaces";
import { scrollUp } from "../../utils";

const LiveWorkshopsPage = () => {
	return (
		<>
			<h1 className="md:mx-10 m-6">Live Workshops</h1>
			<div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 bg-[#FDFDFD] md:border border-[#D0D0D0] md:p-10 h-auto">
				{workshops
					.filter((workshop) => workshop.tag === "Live")
					.map((workshop: IWorkshop, indx: number) => {
						return <WorkshopDisplayCard workshop={workshop} key={indx} />;
					})}
			</div>
		</>
	);
};

export default LiveWorkshopsPage;
