import React, { useEffect, useState } from "react";
import AdminDashboardLayout, { AdminDashboardTabType, adminTabs } from "../../ui/layout/profile/AdminDashboardLayout";
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
	const tab = router.query.tab as string;
	const active = tab
		? adminTabs.filter((t) => t.link.split("/")[1].trim().toLowerCase() === tab.trim().toLowerCase())[0]
		: adminTabs[0];
	const [activeTab, setActiveTab] = useState<AdminDashboardTabType["icon"]>(active.icon);

	useEffect(() => {
		setActiveTab(active ? active.icon : adminTabs[0].icon);
	}, [router]);

	return (
		<AdminDashboardLayout {...{ activeTab, setActiveTab }}>
			{activeTab === "DashboardIcon" ? (
				<AdminDashboardOverview />
			) : activeTab === "UsersIcon" ? (
				<AdminUsersManagement />
			) : activeTab === "CoursesIcon" ? (
				<AdminCoursesManagement serverQuery={query} />
			) : activeTab === "MentorIcon" ? (
				<AdminMentorsManagement />
			) : activeTab === "ReportIcon" ? (
				<AdminReports />
			) : activeTab === "WorkshopIcon" ? (
				<AdminWorkshopsManagement serverQuery={query} />
			) : activeTab === "SettingsIcon" ? (
				<AdminRolesManagement />
			) : (
				<AdminDashboardOverview />
			)}
		</AdminDashboardLayout>
	);
};

export default AdminPageTemplate;
