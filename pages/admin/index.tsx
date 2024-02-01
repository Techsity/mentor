import React from "react";
import adminRoute from "../adminRoute";
import AdminPageTemplate from "../../components/templates/admin";
import { GetServerSidePropsContext } from "next";

const AdminPage = () => {
	return <AdminPageTemplate />;
};
// export default AdminPage;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	console.log(ctx);
	return { props: {} };
};
export default adminRoute(AdminPage);
