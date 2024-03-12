import React, { FC } from "react";
import { Notification } from "../../../../../interfaces/user.interface";
import { useNotificationContext } from "../../../../../context/notification.context";

const NotificationCard = () => {
	const { newerNotifications, notifications, olderNotifications, closePanel, markRead, loading } =
		useNotificationContext();
	// &&

	return (
		<div className="animate__animated animate__bounceInRight animate__faster absolute bg-white border-2 border-[#70C5A1] p-5 py-8 right-0 md:w-[35vw] md:right-12 top-24 w-full lg:w-[30vw] overflow-y-scroll overflow-hidden h-[60vh]">
			<div className="w-full grid gap-3">
				{newerNotifications && newerNotifications?.length >= 1 ? (
					<div className="grid gap-1 w-full">
						<h1 className="font-semibold text-[#70C5A1] text-sm">Newer Notifications</h1>
						<div className="w-full">
							{notifications?.map((notification, index) => {
								return <NotificationItem {...{ notification, closePanel, markRead }} key={index} />;
							})}
						</div>
					</div>
				) : (
					<p className="text-sm">No newer notifications. You're all caught up! 🎉</p>
				)}
				{olderNotifications && olderNotifications.length >= 1 && (
					<div className="grid gap-1 w-full">
						<h1 className="font-semibold text-[#70C5A1] text-sm">Older Notifications</h1>
						<div className="w-full">
							{olderNotifications?.map((notification, index) => {
								return <NotificationItem {...{ notification, closePanel, markRead }} key={index} />;
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
const NotificationItem: FC<{ notification: Notification; closePanel: () => void; markRead: (id: string) => void }> = ({
	notification,
	closePanel,
	markRead,
}) => {
	const handleClick = () => {
		console.log(notification.id);
		closePanel();
	};
	return (
		<div className="flex items-start w-full" onClick={handleClick}>
			<div className="flex-grow grid gap-1">
				<h1 className="">{}title</h1>
				<p className="">{}body</p>
			</div>
			<div className="max-w-sm w-full"></div>
		</div>
	);
};

export default NotificationCard;
