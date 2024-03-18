import React from "react";
import WorkshopDisplayCard from "../../components/ui/atom/cards/mentee/WorkshopDisplayCard";
import workshops from "../../data/workshops";
import { IWorkshop } from "../../interfaces";

const AllWorkshopsPage = () => {
	return (
		<>
			<h1 className="md:mx-10 m-6">All Workshops</h1>
			<div className="my-6 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 bg-[#FDFDFD] md:border border-[#D0D0D0] md:p-10 h-auto">
				{workshops.map((workshop: IWorkshop, indx: number) => {
					return <WorkshopDisplayCard workshop={workshop} key={indx} />;
				})}
			</div>
		</>
	);
};

export const getServerSideProps = async () => {
	// FETCH_ALL_WORKSHOPS
};

export default AllWorkshopsPage;
