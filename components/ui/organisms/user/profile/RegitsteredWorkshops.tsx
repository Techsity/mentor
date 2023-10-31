import React from "react";
import workshops from "../../../../../data/workshops";
import WorkshopDisplayCard from "../../../atom/cards/mentee/WorkshopDisplayCard";

const RegitsteredWorkshops = () => {
	const regitsteredWorkshops = workshops;
	return (
		<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4 items-center animate__animated animate__fadeIn">
			{regitsteredWorkshops.map((workshop, i) => (
				<WorkshopDisplayCard profile workshop={workshop} key={i} />
			))}
		</div>
	);
};

export default RegitsteredWorkshops;
