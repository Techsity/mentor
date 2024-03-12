import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser, Notification } from "../interfaces/user.interface";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MARK_NOTIFICATION_AS_READ, VIEW_ALL_NOTIFICATIONS } from "../services/graphql/mutations/user";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { currentUser } from "../redux/reducers/authSlice";
import { useSocketContext } from "./socket-io.context";
import EVENTS from "../constants/events.constant";

interface INotificationsContext {
	isOpen: boolean;
	newerNotifications?: Notification[];
	olderNotifications?: Notification[];
	notifications?: Notification[];
	markRead: (id: string) => void;
	loading: boolean;
	toggleVisibility: () => void;
	openPanel: () => void;
	closePanel: () => void;
	newNotification: boolean;
}

const NotificationsContext = createContext<INotificationsContext>({
	isOpen: false,
	markRead: () => {},
	toggleVisibility: () => {},
	openPanel: () => {},
	closePanel: () => {},
	loading: false,
	newNotification: false,
});

export const NotificationsContextProvider = ({ children }: { children?: ReactNode }) => {
	const user = useSelector(currentUser);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [newNotifications, setNewNotifications] = useState<Notification[]>(notifications);
	const [fetchNotifications, { loading: fetchLoading }] = useLazyQuery<{ viewAllNotifications: Notification[] }, any>(
		VIEW_ALL_NOTIFICATIONS,
	);

	const { client } = useSocketContext();

	const [markAsRead, { loading: readLoading }] = useMutation<
		{ readNotification: boolean },
		{ notificationId: string }
	>(MARK_NOTIFICATION_AS_READ);

	const loading = useMemo(() => readLoading || fetchLoading, [fetchLoading, readLoading]);

	const markRead = async (id: string) => {
		await markAsRead({ variables: { notificationId: id } }).then(() => {
			setNotifications((prev) => {
				const updated = [...prev];
				const notificationToBeRead = updated.find((n) => n.id === id);
				if (notificationToBeRead) notificationToBeRead.read = true;
				return updated;
			});
		});
	};

	const openPanel = () => {
		setIsOpen(() => true);
	};
	const toggleVisibility = () => {
		setIsOpen((p) => !p);
	};
	const closePanel = () => {
		setIsOpen(() => false);
	};

	client.on(EVENTS.NEW_NOTIFICATION, (data: any) => {
		console.log({ data });
	});

	// Todo: implement socket to listen to latest notifications
	// fetch new notifications on panel toggle
	// useEffect(() => {
	// 	if (isOpen) {
	// 		fetchNotifications().then(({ data }) => {
	// 			console.log({ data });
	// 			if (data) setNewNotifications(data.viewAllNotifications);
	// 		});
	// 	}
	// }, [isOpen]);

	const newNotification = Boolean(newNotifications.length > notifications.length);

	const now = dayjs();
	const anHourAgo = now.subtract(1, "hour");

	const newerNotifications = notifications?.filter((notification) =>
		dayjs(new Date(notification.created_at)).isAfter(anHourAgo),
	);

	const olderNotifications = notifications?.filter((notification) =>
		dayjs(new Date(notification.created_at)).isBefore(anHourAgo),
	);

	useEffect(() => {
		if (user) if (user.notifications) setNotifications(user.notifications);
	}, [user]);

	return (
		<NotificationsContext.Provider
			value={{
				isOpen,
				toggleVisibility,
				openPanel,
				closePanel,
				loading,
				markRead,
				olderNotifications,
				newerNotifications,
				newNotification,
			}}>
			{children}
		</NotificationsContext.Provider>
	);
};

export const useNotificationContext = () => {
	const context = useContext(NotificationsContext);
	if (!context) throw new Error("useNotificationContext must be used within a NotificationsContextProvider");
	return context;
};
