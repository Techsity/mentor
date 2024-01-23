/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import * as AdminIcons from "../../atom/icons/admin";
import { NextRouter, useRouter } from "next/router";
import classNames from "classnames";
import { scrollToTop } from "../../../../utils";

export type AdminDashboardTabType = {
	label: string;
	icon: keyof typeof AdminIcons;
	iconProps?: {};
	link: string;
};

type AdminDashboardLayoutProps = {
	children: ReactNode;
	activeTab: AdminDashboardTabType["icon"];
	setActiveTab: Dispatch<SetStateAction<AdminDashboardTabType["icon"]>>;
};

const AdminDashboardLayout = ({ children, activeTab, setActiveTab }: AdminDashboardLayoutProps) => {
	const router = useRouter();

	const activeLink = adminTabs.filter((t) => t.link.split("#")[1] === router.asPath.split("#")[2]);

	useEffect(() => {
		setActiveTab(activeLink.length >= 1 ? activeLink[0].icon : adminTabs[0].icon);
		return () => {
			setActiveTab(adminTabs[0].icon);
			scrollToTop();
		};
	}, [router]);

	return (
		<div className="min-h-screen h-full relative w-full flex">
			<nav className="z-30 sticky top-20 h-screen w-auto xl:w-[20%] bg-[#F9FFFD] p-4 hidden sm:inline-block">
				<div className="mb-12 duration-300 hidden sm:flex justify-center items-center flex-col gap-3">
					<div className="w-10 xl:w-16 h-10 xl:h-16 bg-zinc-200 rounded-full overflow-hidden">
						<img src="/assets/images/avatar.png" alt="" className="w-full h-full" />
					</div>
					<div className="text-center xl:block hidden duration-300">
						<h1 className="text-[#8F8F8F] text-lg">Oye Damilola</h1>
						<p className="text-[#8F8F8F] text-sm">damilola@mentor.edu</p>
					</div>
				</div>
				{adminTabs.map((t, index) => (
					<NavItem {...{ activeTab, router, setActiveTab, t }} key={index} />
				))}
			</nav>
			<div className="px-5 py-5 min-h-[120dvh] flex-grow">
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child)) {
						return React.cloneElement<any>(child, { activeTab });
					}
					return child;
				})}
			</div>
		</div>
	);
};

const NavItem = ({
	router,
	t,
	setActiveTab,
	activeTab,
}: {
	router: NextRouter;
	t: AdminDashboardTabType;
	setActiveTab: Dispatch<SetStateAction<AdminDashboardTabType["icon"]>>;
	activeTab: AdminDashboardTabType["icon"];
}) => {
	const IconComp = AdminIcons[t.icon];
	return (
		<div
			onClick={() => {
				if (activeTab !== t.icon) {
					setActiveTab(t.icon);
					router.push({ pathname: router.pathname, hash: t.link });
					scrollToTop();
				}
			}}
			className={classNames(
				`group relative select-none cursor-pointer duration-300 border p-3 xl:px-6 flex gap-5 items-center justify-center lg:justify-between my-5`,
				activeTab === t.icon ? "border-[#70C5A1] bg-white " : "border-transparent bg-[#70C5A1]",
			)}>
			<div className="text-[#70C5A1] whitespace-nowrap group-hover:lg:hidden hidden group-hover:flex w-auto absolute left-12 animate__animated animate__fastest animate__fadeIn p-2 px-5 text-sm bg-white border border-[#70C5A1]">
				{t.label}
			</div>
			<span className={`xl:flex hidden text-sm ${activeTab === t.icon ? "text-[#70C5A1]" : "text-white"}`}>
				{t.label}
			</span>
			<IconComp
				{...{
					...t.iconProps,
					color: activeTab === t.icon ? "#70C5A1" : "#ffffff",
					className: "h-4 w-4",
				}}
			/>
		</div>
	);
};

export const adminTabs: AdminDashboardTabType[] = [
	{
		icon: "DashboardIcon",
		label: "Dashboard",
		link: "/#dashboard",
	},
	{ icon: "CoursesIcon", label: "Courses", link: "/#courses", iconProps: { className: "h-6 w-6 lg:h-4 w-4" } },
	{ icon: "WorkshopIcon", label: "Workshop", link: "/#workshop", iconProps: { className: "h-6 w-6 lg:h-4 w-4" } },
	{ icon: "MentorIcon", label: "Mentors", link: "/#mentors", iconProps: { className: "h-6 w-6 lg:h-4 w-4" } },
	{
		icon: "UsersIcon",
		label: "Users",
		link: "/#users",
	},
	{ icon: "ReportIcon", label: "Report", link: "/#report", iconProps: { className: "h-6 w-6 lg:h-4 w-4" } },
	{
		icon: "SettingsIcon",
		label: "Role Settings",
		link: "/#settings",
	},
];

export default AdminDashboardLayout;
