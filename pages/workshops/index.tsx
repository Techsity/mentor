import React from "react";
import WorkshopDisplayCard from "../../components/ui/atom/cards/mentee/WorkshopDisplayCard";
// import workshops from "../../data/workshops";
import { IWorkshop } from "../../interfaces";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import client from "../../utils/apolloClient";
import { FETCH_ALL_WORKSHOPS } from "../../services/graphql/queries/workshop";
import ResponseMessages from "../../constants/response-codes";
import { formatGqlError } from "../../utils/auth";

type ResponseType = {
	workshops: IWorkshop[];
	error?: string;
};

const AllWorkshopsPage = ({ workshops, error }: ResponseType) => {
	console.log({ workshops });
	if (error) {
		console.error({ error });
		return <p className="">{error || "Something went wrong"}</p>;
	}
	return (
		<>
			<h1 className="md:mx-10 m-6">All Workshops</h1>
			<div className="my-6 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 bg-[#FDFDFD] md:border border-[#D0D0D0] md:p-10 h-auto">
				{workshops.map((workshop: IWorkshop, indx: number) => {
					return <WorkshopDisplayCard workshop={workshop} key={indx} />;
				})}
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
	try {
		const skip = 0,
			take = 10;
		const query = client({ ssr: true }).query;
		const {
			data: { viewAllWorkshops: workshops },
		} = await query<{ viewAllWorkshops: IWorkshop[] }>({
			query: FETCH_ALL_WORKSHOPS,
			variables: { skip, take },
		});
		return { props: { workshops, error: "" } };
	} catch (error) {
		console.error(error);
		const errorMsg = formatGqlError(error);
		console.log({ errorMsg });
		return { props: { error: "Something went wrong. Please refresh page and try again." } };
	}
};

export default AllWorkshopsPage;
