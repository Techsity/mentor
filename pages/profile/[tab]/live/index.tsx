import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ProfileTabLinkType } from "../../../../interfaces";
import LiveworkshopTemplate from "../../../../components/templates/workshop/live-workshop";
import protectedPageWrapper from "../../../protectedPageWrapper";

const LiveWorkshop = () => {
	return <LiveworkshopTemplate />;
};

export const getServerSideProps = (
	ctx: GetServerSidePropsContext,
): GetServerSidePropsResult<{ workshopId: string }> => {
	const tab = ctx.query.tab as ProfileTabLinkType;
	const id = ctx.query.id as string;
	const isLive = Boolean(ctx.resolvedUrl?.split("/")[3].split("?")[0] === "live");
	if (tab !== "workshop") return { props: { workshopId: "" }, notFound: true };
	else if (tab === "workshop" && !isLive) return { props: { workshopId: "" }, notFound: true };
	else if (tab === "workshop" && isLive && !id) return { props: { workshopId: "" }, notFound: true };
	return { props: { workshopId: id } };
};

// export default LiveWorkshop;
export default protectedPageWrapper(LiveWorkshop);
