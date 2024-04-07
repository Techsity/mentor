import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../constants";
import { useSocketContext, socketUrl } from "../context/socket-io.context";
import { currentUser } from "../redux/reducers/auth/authSlice";
import Peer, { SignalData } from "simple-peer";
import { IAppointment } from "../interfaces/mentor.interface";
import { IUser } from "../interfaces/user.interface";

const initialSessionState: CurrentSession = { signal: {} as SignalData, user: {} };

const useMentorshipSession = (appointment: IAppointment | null) => {
	const toastId = useId();
	const MAX_PARTICIPANTS = 2;
	const user = useSelector(currentUser);
	const { manager } = useSocketContext();
	const [connected, setConnected] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [stream, setStream] = useState<MediaStream | null>(null);
	const localStreamRef = useRef<HTMLVideoElement>(null);
	const remoteStreamRef = useRef<any>(null);
	const [currentSession, setCurrentSession] = useState<CurrentSession>(initialSessionState);
	const [newJoinRequest, setNewJoinRequest] = useState<MentorshipSessionUser | null>(null);
	// const sessionKey = pseudoRandomBytes;
	const sessionKey = "sessionKey-sessionKey";

	const sessionId = appointment?.id;

	const is_mentor = useMemo(() => {
		if (user && appointment) return user.is_mentor && appointment.mentor.id === user.mentor?.id;
		return false;
	}, [appointment, user]);

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
		client.on("session_created", (data) => {
			if (is_mentor)
				if (data.message && data.message === "success") {
					console.log({ data });
					setLoading(false);
					setConnected(true);
				}
		});
		client.on("request_to_join_session", (data: any) => {
			if (is_mentor) {
				const signal = data.data.signal;
				const requestingUser = data.data.user;
				console.log({ signal, requestingUser });
				setCurrentSession({ signal: signal, user: requestingUser });
				setNewJoinRequest(requestingUser);
				// setLoading(false);
				// setConnected(true);
			}
		});
		client.on("request_accepted", (data) => {
			if (!is_mentor) {
				console.log({ data });
				setLoading(false);
				setConnected(true);
			}
		});
	}, [client]);

	const handleConnection = () => {
		setLoading(true);
		if (is_mentor) handleCreateSession();
		else handleRequestJoin();
	};

	const handleCreateSession = () => {
		if (stream) {
			client.emit("create_session", {
				sessionId,
				is_mentor,
				user: { name: user?.name, id: user?.id, email: user?.email, avatar: user?.avatar },
				sessionKey,
			});
		}
	};

	const handleRequestJoin = () => {
		if (stream) {
			// Todo: user must provide sessionKey
			const peer = new Peer({
				trickle: false,
				initiator: true,
			});
			peer.on("signal", (signal) => {
				client.emit("request_to_join_session", {
					signal,
					sessionId,
					is_mentor,
					user: { name: user?.name, id: user?.id, email: user?.email, avatar: user?.avatar },
					sessionKey,
				});
			});
			peer.on("stream", (currentStream) => {
				if (localStreamRef.current) localStreamRef.current.srcObject = currentStream;
			});
		}
	};

	const handleAllowJoinSession = (action: "allow" | "ignore") => {
		if (is_mentor && stream) {
			if (action === "allow") {
				const peer = new Peer({
					stream,
					trickle: false,
					initiator: false,
				});
				peer.on("signal", (signal) => {
					client.emit("accept_request", {
						signal,
						sessionId,
						is_mentor,
						user: { name: user?.name, id: user?.id, email: user?.email, avatar: user?.avatar },
						sessionKey,
					});
				});
				peer.on("stream", (currentStream) => {
					if (localStreamRef.current) localStreamRef.current.srcObject = currentStream;
				});
				peer.signal(currentSession.signal);
				if (remoteStreamRef.current) remoteStreamRef.current = peer;
			} else client.emit("request_rejected", { user: newJoinRequest });

			setNewJoinRequest(null);
		}
	};

	return {
		connected,
		client,
		errorMessage,
		loading,
		MAX_PARTICIPANTS,
		handleConnection,
		handleAllowJoinSession,
		// handleCreateSession,
		// handleRequestJoin,
		localStreamRef,
		stream,
		setStream,
		remoteStreamRef,
		currentSession,
		is_mentor,
		newJoinRequest,
	};
};
type CurrentSession = {
	signal: SignalData;
	user: Partial<MentorshipSessionUser>;
};

export type MentorshipSessionUser = Pick<IUser, "name" | "email" | "id" | "avatar">;

export default useMentorshipSession;
