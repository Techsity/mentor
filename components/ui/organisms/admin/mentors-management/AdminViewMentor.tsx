import { ParsedUrlQuery } from "querystring";
import React from "react";

const AdminViewMentor = ({ serverQuery }: { serverQuery: ParsedUrlQuery }) => {
	const mentorId = serverQuery?.mentorId as string;

	return <div>AdminViewMentor : {mentorId}</div>;
};

export default AdminViewMentor;
