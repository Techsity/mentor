import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser, Notification } from "../interfaces/user.interface";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MARK_NOTIFICATION_AS_READ } from "../services/graphql/mutations/user";
import { useSelector } from "react-redux";
import { currentUser } from "../redux/reducers/auth/authSlice";
import { useSocketContext } from "./socket-io.context";
import EVENTS from "../constants/events.constant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { VIEW_ALL_NOTIFICATIONS } from "../services/graphql/queries/user";
dayjs.extend(relativeTime);

interface INotificationsContext {
	isOpen: boolean;
	notifications?: Notification[];
	markRead: (id: string) => void;
	loading: boolean;
	toggleVisibility: () => void;
	openPanel: () => void;
	closePanel: () => void;
	notificationsCount: number;
}

const NotificationsContext = createContext<INotificationsContext>({
	isOpen: false,
	markRead: () => {},
	toggleVisibility: () => {},
	openPanel: () => {},
	closePanel: () => {},
	loading: false,
	notificationsCount: 0,
});

export const NotificationsContextProvider = ({ children }: { children?: ReactNode }) => {
	const user = useSelector(currentUser);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const unreadNotifications = useMemo(() => {
		return notifications.filter((n) => !n.read);
	}, [notifications, user]);
	// const [notificationsCount, setNotificationsCount] = useState<number>(unreadNotifications.length || 0);
	const [fetchNotifications, { loading: fetchLoading, refetch, data }] = useLazyQuery<
		{ viewAllNotifications: Notification[] },
		any
	>(VIEW_ALL_NOTIFICATIONS);

	const { client } = useSocketContext();

	const [markAsRead, { loading: readLoading }] = useMutation<
		{ readNotification: boolean },
		{ notificationId: string }
	>(MARK_NOTIFICATION_AS_READ);

	const loading = useMemo(() => readLoading || fetchLoading, [fetchLoading, readLoading]);

	const markRead = async (id: string) => {
		const notificationIndex = notifications.findIndex((n) => n.id === id);
		if (notificationIndex !== -1 && !notifications[notificationIndex].read) {
			console.log(`Notification ${id} marked as read`);
			try {
				await markAsRead({ variables: { notificationId: id } });
				refetch();
				const updatedNotifications = [...notifications];
				updatedNotifications[notificationIndex] = {
					...updatedNotifications[notificationIndex],
					read: true,
				};
				setNotifications(updatedNotifications);
			} catch (err) {
				console.error("Error marking notification as read: ", err);
			}
		}
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

	// set notifications on initial load
	useEffect(() => {
		if (user) setNotifications(user.notifications);
	}, [user]);

	// socket listening to latest notifications events and update notifications
	useEffect(() => {
		client.on(EVENTS.NEW_NOTIFICATION, (data: Notification) => {
			setNotifications((p) => {
				const updatedNotifications = [...p];
				const exists = updatedNotifications.some((n) => n.id === data.id);
				if (exists) return updatedNotifications;
				updatedNotifications.concat(data);
				return updatedNotifications;
			});
			refetch();
		});
	}, [client]);

	// useEffect(() => {
	// 	if (isOpen) refetch();
	// }, [isOpen]);

	useEffect(() => {
		if (data) setNotifications(data.viewAllNotifications);
	}, [data]);

	return (
		<NotificationsContext.Provider
			value={{
				isOpen,
				toggleVisibility,
				openPanel,
				closePanel,
				loading,
				markRead,
				notificationsCount: unreadNotifications.length,
				notifications: notifications.slice().sort((a, b) => {
					return dayjs(b.created_at).unix() - dayjs(a.created_at).unix();
				}),
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
