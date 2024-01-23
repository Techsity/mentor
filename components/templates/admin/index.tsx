import React, { useState } from "react";
import AdminDashboardLayout, { AdminDashboardTabType, adminTabs } from "../../ui/layout/profile/AdminDashboardLayout";
import AdminDashboardOverview from "../../ui/organisms/admin/dashboard";
import AdminUsersManagement from "../../ui/organisms/admin/users-management";
import AdminMentorsManagement from "../../ui/organisms/admin/mentors";
import AdminReports from "../../ui/organisms/admin/report";
import AdminCoursesManagement from "../../ui/organisms/admin/courses";
import AdminWorkshopsManagement from "../../ui/organisms/admin/workshop";
import AdminRolesManagement from "../../ui/organisms/admin/role-settings";

const AdminPageTemplate = () => {
	const [activeTab, setActiveTab] = useState<AdminDashboardTabType["icon"]>(adminTabs[0].icon);
	return (
		<AdminDashboardLayout {...{ activeTab, setActiveTab }}>
			{activeTab === "DashboardIcon" ? (
				<AdminDashboardOverview />
			) : activeTab === "UsersIcon" ? (
				<AdminUsersManagement />
			) : activeTab === "CoursesIcon" ? (
				<AdminCoursesManagement />
			) : activeTab === "MentorIcon" ? (
				<AdminMentorsManagement />
			) : activeTab === "ReportIcon" ? (
				<AdminReports />
			) : activeTab === "WorkshopIcon" ? (
				<AdminWorkshopsManagement />
			) : activeTab === "SettingsIcon" ? (
				<AdminRolesManagement />
			) : (
				<AdminDashboardOverview />
			)}
		</AdminDashboardLayout>
	);
};

export default AdminPageTemplate;
