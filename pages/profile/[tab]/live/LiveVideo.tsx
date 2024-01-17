import React, { useEffect, useState } from "react";

import {
	ClientConfig,
	useJoin,
	useLocalCameraTrack,
	useLocalMicrophoneTrack,
	usePublish,
	useRemoteAudioTracks,
	useRemoteUsers,
} from "agora-rtc-react";
import dynamic from "next/dynamic";
const LocalUser = dynamic(() => import("agora-rtc-react").then(({ LocalUser }) => LocalUser), {
	ssr: false,
});
const LocalVideoTrack = dynamic(() => import("agora-rtc-react").then(({ LocalVideoTrack }) => LocalVideoTrack), {
	ssr: false,
});
const RemoteUser = dynamic(() => import("agora-rtc-react").then(({ RemoteUser }) => RemoteUser), {
	ssr: false,
});

const LiveVideo = () => {
	const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;
	const channelName = "test-channel";
	const [activeConnection, setActiveConnection] = useState<boolean>(true);
	const [micOn, setMic] = useState<boolean>(true);
	const [cameraOn, setCamera] = useState<boolean>(true);
	const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
	const { localCameraTrack } = useLocalCameraTrack(cameraOn);

	const {
		data,
		error: joinError,
		isConnected,
		isLoading: isJoining,
	} = useJoin(
		{
			appid: appId,
			channel: channelName!,
			token: null,
		},
		activeConnection,
	);
	const { error: publishError, isLoading } = usePublish([localMicrophoneTrack, localCameraTrack]);

	const remoteUsers = useRemoteUsers();
	const { audioTracks } = useRemoteAudioTracks(remoteUsers);

	audioTracks.forEach((track) => track.play());

	useEffect(() => {
		console.log({ remoteUsers: remoteUsers });
	}, [remoteUsers]);

	return (
		typeof window !== "undefined" && (
			<div className="flex items-center gap-8 my-6">
				<div className="flex items-center gap-4 flex-wrap">
					{remoteUsers.map((user) => (
						<div key={user.uid} className="w-32 h-32">
							<RemoteUser user={user} />
						</div>
					))}
				</div>
				<div className="w-32 h-32">
					<LocalUser
						audioTrack={localMicrophoneTrack}
						videoTrack={localCameraTrack}
						cameraOn={cameraOn}
						micOn={micOn}
						playAudio={micOn}
						playVideo={cameraOn}
						className=""
					/>
					<div id="controlsToolbar">
						<div id="mediaControls">
							<button className="btn" onClick={() => setMic((a) => !a)}>
								Mic
							</button>
							<button className="btn" onClick={() => setCamera((b) => !b)}>
								Camera
							</button>
						</div>
						<button
							id="endConnection"
							className=""
							onClick={() => {
								setActiveConnection(!activeConnection);
							}}>
							Disconnect
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default LiveVideo;
