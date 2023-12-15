import React, { useEffect, useRef, useState } from "react";
import protectedPageWrapper from "../../protectedPageWrapper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ProfileTabLinkType } from "../../../interfaces";
import LiveworkshopTemplate from "../../../components/templates/workshop/live-workshop";

const LiveWorkshop = () => {
	return <LiveworkshopTemplate />;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext): GetServerSidePropsResult<any> => {
	const tab = ctx.query.tab as ProfileTabLinkType;
	const isLive = Boolean(ctx.resolvedUrl?.split("/")[3] === "live");
	if (tab !== "workshop") return { props: {}, notFound: true };
	else if (tab === "workshop" && !isLive) return { props: {}, notFound: true };
	return { props: {} };
};

export default protectedPageWrapper(LiveWorkshop);
