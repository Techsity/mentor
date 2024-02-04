import React from "react";
import { ParsedUrlQuery } from "querystring";
import AdminMentorsManagement from "./AdminMentorsManagement";
import AdminViewMentor from "./AdminViewMentor";

const AdminMentorsManagementTemplate = ({ serverQuery, ...props }: { serverQuery?: ParsedUrlQuery; props?: any }) => {
	const mentorId = serverQuery?.mentorId as string;

	return !mentorId ? (
		<AdminMentorsManagement {...{ serverQuery: serverQuery as ParsedUrlQuery }} />
	) : (
		<AdminViewMentor {...{ serverQuery: serverQuery as ParsedUrlQuery }} />
	);
};

export default AdminMentorsManagementTemplate;
