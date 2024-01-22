import React, { FC, memo, useEffect, useRef, useState } from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import { MicMuted, SpeakingIcon } from "../../icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import {
	IAgoraRTCRemoteUser,
	ClientRole,
	ClientRoleOptions,
	useClientEvent,
	useRemoteAudioTracks,
	useRemoteUserTrack,
	useRemoteUsers,
	useRTCClient,
} from "agora-rtc-react";

import dynamic from "next/dynamic";
import { client } from "../../../../../hooks/agora";

const RemoteUser = dynamic(() => import("agora-rtc-react").then(({ RemoteUser }) => RemoteUser), {
	ssr: false,
});

type Props = {
	user: IAgoraRTCRemoteUser;
	isHost: boolean;
};

const VideoCallParticipantCard = memo(function VideoCallParticipantCard({ isHost, user }: Props) {
	const signedInUser = useSelector(currentUser);
	const [muted, setMuted] = useState<boolean>(false);
	const [cameraOn, setCameraOn] = useState<boolean>(true);

	const participants = useRemoteUsers();
	const { audioTracks } = useRemoteAudioTracks(participants);

	const toggleCamera = () => {
		setCameraOn((b) => !b);
		// console.log({ isPlaying: audioTracks });
		console.log({ isPlaying: user });
	};

	// const remoteUser = useRemoteUserTrack(user, user);
	// const remoteTracks= useRemoteAudioTracks()

	// useEffect(()=>{},[])

	const rtcClient = useRTCClient(client);

	// useEffect(() => {
	// 	(async function () {
	// 		await rtcClient.subscribe(user, "audio");
	// 	})();
	// }, [rtcClient]);

	return !user ? (
		<></>
	) : (
		<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
			<div className="flex justify-between items-center">
				<p className="lowercase text-sm">{user.uid}</p>
				<div className="" title={user.audioTrack?.getMediaStreamTrack().muted ? "Unmuted" : "Muted"}>
					{!user.audioTrack?.isPlaying ? <MicMuted size={15} /> : <SpeakingIcon size={15} />}
				</div>
			</div>
			<div className="flex justify-center items-center h-full w-full rounded-full">
				<div className="h-28 w-28 rounded-full overflow-hidden">
					<RemoteUser
						user={user}
						// style={{
						// 	background: `url("/assets/images/avatar.png")`,
						// 	backgroundSize: "100% 100%",
						// 	backgroundRepeat: "no-repeat",
						// }}
						playAudio={muted}
						playVideo={cameraOn}
						height={100}
						width={100}
					/>
				</div>
			</div>
			<span onClick={toggleCamera} className="text-sm cursor-pointer text-[#] select-none">
				{!cameraOn ? "Show" : "Hide"}
			</span>
		</div>
	);
});

export default VideoCallParticipantCard;
