import React, { useEffect, useState } from "react";
import AdminDashboardLayout, {
	AdminDashboardTabType,
	AdminRouterTabType,
	adminTabs,
} from "../../ui/layout/profile/AdminDashboardLayout";
import AdminDashboardOverview from "../../ui/organisms/admin/dashboard";
import AdminUsersManagement from "../../ui/organisms/admin/users-management";
import AdminMentorsManagement from "../../ui/organisms/admin/mentors-management";
import AdminReports from "../../ui/organisms/admin/report";
import AdminCoursesManagement from "../../ui/organisms/admin/courses";
import AdminWorkshopsManagement from "../../ui/organisms/admin/workshops";
import AdminRolesManagement from "../../ui/organisms/admin/role-settings";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

const AdminPageTemplate = ({ query }: { query: ParsedUrlQuery }) => {
	const router = useRouter();
	const tab = router.query.tab as AdminRouterTabType;
	const active = tab ? adminTabs.filter((t) => t.link === tab)[0] : adminTabs[0];

	return (
		<AdminDashboardLayout>
			{tab === "dashboard" ? (
				<AdminDashboardOverview />
			) : tab === "users" ? (
				<AdminUsersManagement serverQuery={query} />
			) : tab === "courses" ? (
				<AdminCoursesManagement serverQuery={query} />
			) : tab === "mentors" ? (
				<AdminMentorsManagement serverQuery={query} />
			) : tab === "report" ? (
				<AdminReports />
			) : tab === "workshops" ? (
				<AdminWorkshopsManagement serverQuery={query} />
			) : tab === "settings" ? (
				<AdminRolesManagement />
			) : (
				<AdminDashboardOverview />
			)}
		</AdminDashboardLayout>
	);
};

export default AdminPageTemplate;
