import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Instance, SignalData } from "simple-peer";
import { ToastDefaultOptions } from "../constants";
import { IAppointment } from "../interfaces/mentor.interface";
import { IUser } from "../interfaces/user.interface";
import { currentUser } from "../redux/reducers/auth/authSlice";
import { useSocketContext, socketUrl } from "./socket-io.context";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";

interface IMentorshipSessionContext {
	connected: boolean;
	client: Socket;
	errorMessage: string;
	loading: boolean;
	MAX_PARTICIPANTS: number;
	handleConnection: () => void;
	handleEndSession: () => void;
	handleAllowJoinSession: (action: "allow" | "ignore") => void;
	stream: MediaStream | null;
	setStream: Dispatch<SetStateAction<MediaStream | null>>;
	remoteStream: MediaStream | null;
	setRemoteStream: Dispatch<SetStateAction<MediaStream | null>>;
	connectionRef: any;
	currentSession: CurrentSession;
	is_mentor: boolean;
	newJoinRequest: MentorshipSessionUser | null;
	setConnected: Dispatch<SetStateAction<boolean>>;
	appointment: IAppointment;
}

const initialContext: IMentorshipSessionContext = {
	appointment: {} as IAppointment,
	client: {} as Socket,
	connected: false,
	setConnected: () => {},
	connectionRef: {},
	currentSession: {} as CurrentSession,
	errorMessage: "",
	handleAllowJoinSession: () => {},
	handleEndSession: () => {},
	handleConnection: () => {},
	is_mentor: false,
	loading: false,
	MAX_PARTICIPANTS: 2,
	newJoinRequest: {} as MentorshipSessionUser,
	stream: null,
	setStream: () => {},
	remoteStream: null,
	setRemoteStream: () => {},
};

const MentorshipSessionContext = createContext<IMentorshipSessionContext>(initialContext);

const MentorshipSessionProvider = ({
	children,
	appointment,
}: {
	children?: ReactNode;
	appointment: IAppointment | null;
}) => {
	const toastId = useId();
	const MAX_PARTICIPANTS = 2;
	const user = useSelector(currentUser);
	const { manager } = useSocketContext();
	const [connected, setConnected] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
	const connectionRef = useRef<Instance | null>(null);
	const [currentSession, setCurrentSession] = useState<CurrentSession>(initialSessionState);
	const [peers, setPeers] = useState<{ user: MentorshipSessionUser; peer: Instance }[]>([]);
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
		client.on("request_rejected", ({ message }) => {
			if (!is_mentor) {
				toast.error(message, { ...ToastDefaultOptions(), toastId });
				setConnected(false);
				setLoading(false);
				// setErrorMessage(message);
			}
		});
		client.on("request_to_join_session", (data: any) => {
			if (is_mentor) {
				const signal = data.data.signal;
				const requestingUser = data.data.user;
				console.log({ signal, requestingUser });
				setCurrentSession({ signal: signal, user: requestingUser });
				if (!connected) setNewJoinRequest(requestingUser);
				// setLoading(false);
				// setConnected(true);
			}
		});
	}, []);

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
		client.on("session_created", (data) => {
			if (is_mentor)
				if (data.message && data.message === "success") {
					console.log({ data });
					setLoading(false);
					setConnected(true);
				}
		});
	};

	const handleRequestJoin = () => {
		if (!is_mentor)
			if (stream) {
				// Todo: user must provide sessionKey
				const remotePeer = new Peer({
					trickle: false,
					initiator: true,
					stream,
				});
				remotePeer.on("signal", (signal) => {
					client.emit("request_to_join_session", {
						signal,
						sessionId,
						is_mentor,
						user: { name: user?.name, id: user?.id, email: user?.email, avatar: user?.avatar },
						sessionKey,
					});
				});
				remotePeer.on("stream", (currentStream) => {
					setRemoteStream(currentStream);
				});
				client.on("request_accepted", (data) => {
					if (!is_mentor) {
						console.log({ data: data.data });
						const signal = data.data.signal;
						const requestingUser = data.data.user;
						setLoading(false);
						setConnected(true);
						remotePeer.signal(signal);
						setCurrentSession({ signal, user: requestingUser });
						// setNewJoinRequest(null);
						const peerIndex = peers.findIndex((p) => p.user.id == user?.id);
						console.log({ peerIndex1: peerIndex });
						if (peerIndex === -1) {
							setPeers((p) => {
								return [...p, { user: user as MentorshipSessionUser, peer: remotePeer }];
							});
						}
					}
				});
				if (connectionRef.current) connectionRef.current = remotePeer;
			}
	};

	const handleAllowJoinSession = (action: "allow" | "ignore") => {
		// if (is_mentor && stream) {
		if (stream) {
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
						user: { name: user?.name, id: user?.id, email: user?.email, avatar: user?.avatar },
						sessionKey,
					});
				});
				peer.on("stream", (currentStream) => {
					setRemoteStream(currentStream);
				});
				const peerIndex = peers.findIndex((p) => p.user.id == user?.id);
				console.log({ peerIndex1: peerIndex });
				if (peerIndex === -1) {
					peer.signal(currentSession.signal);
					setPeers((p) => {
						return [...p, { user: user as MentorshipSessionUser, peer }];
					});
				}
				if (connectionRef.current) connectionRef.current = peer;
			} else {
				client.emit("request_rejected", { user: newJoinRequest, is_mentor, sessionId });
			}

			setNewJoinRequest(null);
		}
	};

	const handleEndSession = () => {
		const peerIndex = peers.findIndex((p) => p.user.id == user?.id);
		console.log({ peerIndex });

		// if (client) {
		// 	console.log({ client: client.id });
		// }
		// setConnected(false);
		// // connectionRef.current.destroy();
		// setStream(null);
		// setRemoteStream(null);
	};

	return (
		<MentorshipSessionContext.Provider
			value={{
				appointment: appointment as IAppointment,
				client,
				handleEndSession,
				connected,
				connectionRef,
				currentSession,
				errorMessage,
				handleAllowJoinSession,
				handleConnection,
				is_mentor,
				loading,
				MAX_PARTICIPANTS,
				newJoinRequest,
				remoteStream,
				setConnected,
				setRemoteStream,
				setStream,
				stream,
			}}>
			{children}
		</MentorshipSessionContext.Provider>
	);
};

const initialSessionState: CurrentSession = { signal: {} as SignalData, user: {} };

export type CurrentSession = {
	signal: SignalData;
	user: Partial<MentorshipSessionUser>;
};

export type MentorshipSessionUser = Pick<IUser, "name" | "email" | "id" | "avatar">;

export const useMentorshipSessionContext = () => {
	const context = useContext(MentorshipSessionContext);
	if (!context) throw new Error("useMentorshipSessionContext must be used within the MentorshipSessionProvider");
	return context;
};
export default MentorshipSessionProvider;
