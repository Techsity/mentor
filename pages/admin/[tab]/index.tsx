import React from "react";
import adminRoute from "../../adminRoute";
import AdminPageTemplate from "../../../components/templates/admin";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

const AdminDynamicTabPage = ({ query }: { query: ParsedUrlQuery }) => {
	return <AdminPageTemplate query={query} />;
};
export const getServerSideProps = (
	ctx: GetServerSidePropsContext,
): GetServerSidePropsResult<{ query: ParsedUrlQuery }> => {
	return { props: { query: ctx.query } };
};
// export default adminRoute(AdminDynamicTabPage);
export default AdminDynamicTabPage;
