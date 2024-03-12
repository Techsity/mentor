import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { currentUser } from "../redux/reducers/authSlice";

interface ISocketContext {
	client: Socket;
	connected: boolean;
}

const SocketContext = createContext<ISocketContext>({ client: {} as Socket, connected: false });

export const SocketContextProvider = ({ children }: any) => {
	const [connected, setConnected] = useState<boolean>(false);
	const user = useSelector(currentUser);
	const userId = useMemo(() => user?.id, [user]);

	// const client = io(String(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL), {
	// 	query: { userId },
	// 	transports: ["websocket"],
	// 	autoConnect: true,
	// 	reconnectionAttempts: 1,
	// 	reconnection: true,
	// 	reconnectionDelay: 5000,
	// 	closeOnBeforeunload: true,
	// });

	const client = useMemo(() => {
		const socket = io(String(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL), {
			query: { userId },
			transports: ["websocket"],
			autoConnect: true,
			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 1000,
			closeOnBeforeunload: true,
		});

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
			console.error("Socket connection error:", error);
		};
		client.on("connect_error", errorHandler);
		client.on("connect_timeout", errorHandler);
		client.on("error", errorHandler);

		return () => {
			client.off("connect_error", errorHandler);
			client.off("connect_timeout", errorHandler);
			client.off("error", errorHandler);
		};
	}, [client]);

	return <SocketContext.Provider {...{ value: { client, connected } }}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
	const context = useContext(SocketContext);
	if (!context) throw new Error("useSocketContext must be used within a SocketContextProvider");
	return context;
};
