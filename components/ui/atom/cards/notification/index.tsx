import React, { FC, useMemo } from "react";
import { Notification } from "../../../../../interfaces/user.interface";
import { useNotificationContext } from "../../../../../context/notification.context";
import classNames from "classnames";
import { PrimaryButton } from "../../buttons";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const NotificationCard = () => {
	const { notifications, closePanel, markRead, loading } = useNotificationContext();
	// and sign &&

	const unreadNotifications = (notifications as Notification[]).filter((notification) => !notification.read);

	const olderNotifications = (notifications as Notification[]).filter((notification) => notification.read);

	return (
		<div className="animate__animated animate__bounceInRight animate__faster absolute bg-white border-2 border-[#70C5A1] p-2 pt-4 pb-6 right-0 md:w-[40vw] md:right-12 top-24 w-full lg:w-[35vw] overflow-y-scroll overflow-hidden h-[60vh]">
			<div className="w-full divide-y">
				{unreadNotifications.length >= 1 && (
					<div className="grid gap-1 p-3 pb-3 w-full">
						<h1 className="font-semibold text-[#70C5A1] text-sm">Unread</h1>
						<div className="w-full">
							{unreadNotifications.map((notification, index) => (
								<NotificationItem {...{ notification, closePanel, markRead }} key={index} />
							))}
						</div>
					</div>
				)}
				{unreadNotifications.length < 1 && (
					<p className="text-sm">No newer notifications. You&apos;re all caught up! 🎉</p>
				)}
				{olderNotifications && olderNotifications.length >= 1 && (
					<div className="grid gap-1 p-3 pt-3 w-full">
						<h1 className="font-semibold text-[#70C5A1] text-sm">Previous Notifications</h1>
						<div className="w-full">
							{olderNotifications
								?.filter((n) => n.read)
								.map((notification, index) => {
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
	const router = useRouter();

	const handleClick = () => {
		if (notification.resourceId && notification.resourceType) {
			const link = `/${notification.resourceType.toLowerCase()}/${notification.resourceId}`;
			router.push(link);
		}
		markRead(notification.id);
		closePanel();
	};
	return (
		<div
			className={classNames(
				"flex items-start gap-4 p-2 px-3 cursor-default",
				!notification.read ? "bg-[#70C5A1]/10" : "",
			)}>
			<div className="flex-grow grid gap-1 tracking-tight">
				<h1 className="text-sm font-medium">{notification.title}</h1>
				<p className="text-sm text-[#A3A6A7] w-full">{notification.body}</p>
				<p className="text-xs">{dayjs(notification.created_at).fromNow()}</p>
			</div>
			{notification.resourceId && notification.resourceType && (
				<div className="max-w-sm">
					<PrimaryButton title="View" className="p-1 px-3 text-sm rounded" onClick={() => handleClick()} />
				</div>
			)}
		</div>
	);
};

export default NotificationCard;
