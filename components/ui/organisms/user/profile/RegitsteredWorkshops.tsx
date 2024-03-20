import React, { useEffect, useState } from "react";
import workshops from "../../../../../data/workshops";
import WorkshopDisplayCard from "../../../atom/cards/mentee/WorkshopDisplayCard";
import { IWorkshop } from "../../../../../interfaces";
import { Subscription } from "../../../../../interfaces/user.interface";
import { useQuery } from "@apollo/client";
import { FETCH_WORKSHOP_SUBSCRIPTIONS } from "../../../../../services/graphql/queries/user";
import { formatGqlError, logoutUser } from "../../../../../utils/auth";

const RegitsteredWorkshops = () => {
	// const regitsteredWorkshops = workshops;
	const { data, loading, error } = useQuery<{ viewSubscriptions: Subscription[] }, any>(FETCH_WORKSHOP_SUBSCRIPTIONS);
	const [regitsteredWorkshops, setRegitsteredWorkshops] = useState<IWorkshop[]>([]);

	useEffect(() => {
		if (!loading && data) {
			const workshops = data?.viewSubscriptions.map((sub) => sub.workshop as unknown as IWorkshop);
			setRegitsteredWorkshops(workshops);
		}
	}, [data, loading, error]);

	if (!loading && error) {
		console.error(JSON.stringify(error));
		const errMsg = formatGqlError(error);
		if (errMsg == "Unauthorized") logoutUser();
		return (
			<div className="">
				<p className="break-words max-w-md text-red-500">
					Something went wrong while fetching your workshops. Try refreshing this page and make sure your have
					an stable internet.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-center animate__animated animate__fadeIn">
			{regitsteredWorkshops.map((workshop, i) => (
				<WorkshopDisplayCard profile workshop={workshop} key={i} />
			))}
		</div>
	);
};

export default RegitsteredWorkshops;
