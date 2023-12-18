import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
	IMicrophoneAudioTrack,
	IRemoteAudioTrack,
	ICameraVideoTrack,
	IRemoteVideoTrack,
	IAgoraRTCClient,
} from "agora-rtc-sdk-ng";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import workshops from "../data/workshops";
import { currentUser } from "../redux/reducers/features/authSlice";
import { IWorkshop } from "../interfaces";

export type ConferenceUser = {
	username: string;
	audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack;
	videoTrack: ICameraVideoTrack | IRemoteVideoTrack;
};

type ReturnProps = {
	participants: ConferenceUser[];
	showParticipants: boolean;
	setShowParticipants: Dispatch<SetStateAction<boolean>>;
	currentUserIsWorkshopOwner: boolean;
	localTracks: any;
	workshop: IWorkshop;
};

const useLiveWorkshop = (): ReturnProps => {
	const router = useRouter();
	const workshopId = router.query.id as string;

	const user = useSelector(currentUser);
	const workshop = workshops[0];

	const [participants, setParticipants] = useState<ConferenceUser[]>([]);

	const [showParticipants, setShowParticipants] = useState<boolean>(true);

	const currentUserIsWorkshopOwner = useMemo(() => {
		return Boolean(user && user?.mentor?.id === workshop.mentor.id);
	}, [user, workshop]);

	const [localTracks, setLocalTracks] = useState<any>([]); // For tracking and setting user permission -  i.e: show camera or not, unmute mic or not

	let client: IAgoraRTCClient;

	// const handleUserPublished = async (
	// 	user: IAgoraRTCRemoteUser,
	// 	mediaType: "audio" | "video" | "datachannel",
	// 	client: IAgoraRTCClient,
	// ) => {
	// 	await client.subscribe(user, mediaType);
	// 	// if (mediaType === "video") {
	// 	setParticipants((prev) => [
	// 		...prev,
	// 		{
	// 			username: user.uid.toString(),
	// 			audioTrack: user.audioTrack as IRemoteAudioTrack,
	// 			videoTrack: user.videoTrack as IRemoteVideoTrack,
	// 		},
	// 	]);
	// 	// }
	// };

	// const handleUserLeft = () => {
	// 	if (user) setParticipants((prev) => prev.filter((u) => slugify(u.username) !== slugify(user.name)));
	// };

	// const initAgoraSDK = async () => {
	// 	const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
	// 	client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
	// 	if (user && workshopId && client) {
	// 		await client
	// 			.join(process.env.NEXT_PUBLIC_AGORA_APP_ID as string, workshopId, null, slugify(user.name))
	// 			.then(async (uid) => {
	// 				return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
	// 			})
	// 			.then(([tracks, uid]) => {
	// 				const [audioTrack, videoTrack] = tracks;
	// 				setParticipants((prev) => [...prev, { username: uid.toString(), audioTrack, videoTrack }]);
	// 				client.publish(tracks);
	// 				setLocalTracks({ audio: audioTrack, video: videoTrack });
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 				// throw error;
	// 			});
	// 	}
	// };

	// useEffect(() => {
	// 	if (client) {
	// 		// client.on("user-published", (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video" | "datachannel") => {
	// 		// 	handleUserPublished(user, mediaType, client);
	// 		// });
	// 		client.on("user-left", handleUserLeft);
	// 	}
	// 	return () => {
	// 		// client.off("user-published", handleUserPublished);
	// 		client.off("user-left", handleUserLeft);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	console.log("initAgoraSDK");
	// 	if (!user) {
	// 		toast.error("Please Login", ToastDefaultOptions({ id: "error" }));
	// 		setParticipants([]);
	// 		return;
	// 	} else {
	// 		initAgoraSDK();
	// 		// .then((response) => {
	// 		// 	// console.log(response);
	// 		// })
	// 		// .catch((err) => {
	// 		// 	console.error(err);
	// 		// 	setParticipants([]);
	// 		// 	toast.error(
	// 		// 		"An error occured. Please check your network and reload the page.",
	// 		// 		ToastDefaultOptions({ id: "error" }),
	// 		// 	);
	// 		// });
	// 	}
	// 	return () => {
	// 		client.off("user-left", handleUserLeft);
	// 	};
	// }, []);

	return { setShowParticipants, currentUserIsWorkshopOwner, localTracks, participants, showParticipants, workshop };
};

export default useLiveWorkshop;
