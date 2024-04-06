import React, { useEffect, useId, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../constants";
import { useSocketContext, socketUrl } from "../context/socket-io.context";
import { currentUser } from "../redux/reducers/auth/authSlice";

const useMentorshipSession = (sessionId: string) => {
	const toastId = useId();
	const MAX_PARTICIPANTS = 2;
	const user = useSelector(currentUser);
	const [connected, setConnected] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const { manager } = useSocketContext();
	const [errorMessage, setErrorMessage] = useState<string>("");

	const client = useMemo(() => {
		const socket = manager.socket(`/appointments`, { auth: { token: 123, sessionId } });
		console.log("connecting to session socket:", socketUrl);
		socket.on("connect", () => {
			console.log("connected to session...");
			// setConnected(true);
			setLoading(false);
		});

		socket.on("disconnect", () => {
			setConnected(false);
			setLoading(true);
		});
		return socket;
	}, [sessionId]);

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
	}, [client]);

	useEffect(() => {
		if (!user) {
			client.disconnect();
			client.close();
		}
		// else if (user) client.connect();
	}, [user]);

	useEffect(() => {
		client.on("forbidden_request", ({ message }) => {
			toast.error(message, { ...ToastDefaultOptions(), toastId });
			setConnected(false);
			setLoading(false);
			setErrorMessage(message);
		});
	}, [client]);

	return { connected, client, errorMessage, loading, MAX_PARTICIPANTS };
};

export default useMentorshipSession;
