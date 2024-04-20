import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Manager, Socket, io } from "socket.io-client";
import { currentUser } from "../redux/reducers/auth/authSlice";

interface ISocketContext {
	client: Socket;
	manager: Manager;
	connected: boolean;
}

const SocketContext = createContext<ISocketContext>({ client: {} as Socket, connected: false, manager: {} as Manager });
export const socketUrl = `${String(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL)}`;

export const SocketContextProvider = ({ children }: any) => {
	const [connected, setConnected] = useState<boolean>(false);
	const user = useSelector(currentUser);

	const manager = new Manager(socketUrl, {
		// reconnectionDelayMax: 10000,
		transports: ["websocket"],
		autoConnect: false,
		// reconnection: !true,
		// reconnectionAttempts: Infinity,
		reconnectionAttempts: 3,
		closeOnBeforeunload: true,
		multiplex: true,
	});

	const client = useMemo(() => {
		const socket = manager.socket("/", {
			auth: { userId: String(user?.id) },
		});

		console.log("connecting to socket:", socketUrl);

		socket.on("connect", () => {
			console.log("connected to socket: ", socket.id);
			setConnected(true);
		});

		socket.on("disconnect", () => {
			setConnected(false);
		});
		return socket;
	}, []);

	useEffect(() => {
		const errorHandler = (error: Error) => {
			console.error("Socket connection error:", error.message);
		};
		client.on("connect_error", errorHandler);
		client.on("connect_timeout", errorHandler);
		client.on("error", errorHandler);

		return () => {
			client.off("connect_error", errorHandler);
			client.off("connect_timeout", errorHandler);
			client.off("error", errorHandler);
		};
	}, []);

	useEffect(() => {
		if (!user) {
			client.disconnect();
			client.close();
		}
		// else if (user) client.connect();
		return () => {
			client.close();
		};
	}, [user]);

	return <SocketContext.Provider {...{ value: { client, connected, manager } }}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
	const context = useContext(SocketContext);
	if (!context) throw new Error("useSocketContext must be used within a SocketContextProvider");
	return context;
};
