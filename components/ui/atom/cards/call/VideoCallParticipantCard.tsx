import React, { memo, useEffect, useState } from "react";
import { MicMuted, SpeakingIcon } from "../../icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { IAgoraRTCRemoteUser, RemoteUser, useRTCClient } from "agora-rtc-react";

import dynamic from "next/dynamic";
import { client } from "../../../../../hooks/agora";

const RemoteAudioTrack = dynamic(() => import("agora-rtc-react").then(({ RemoteAudioTrack }) => RemoteAudioTrack), {
	ssr: false,
});

type Props = {
	user: IAgoraRTCRemoteUser;
	isHost: boolean;
};

const VideoCallParticipantCard = memo(function VideoCallParticipantCard({ isHost, user }: Props) {
	const signedInUser = useSelector(currentUser);
	const [muted, setMuted] = useState<boolean>(false);

	const rtcClient = useRTCClient(client);

	useEffect(() => {
		console.log({ status: user.audioTrack?.getMediaStreamTrack().muted });
	}, [user.audioTrack]);

	return !user ? (
		<></>
	) : (
		<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
			<div className="flex justify-between items-center">
				<p className="lowercase text-sm">{user.uid}</p>
				<div className="" title={!user.audioTrack?.getMediaStreamTrack().muted ? "Speaking" : "Muted"}>
					{user.audioTrack?.getMediaStreamTrack().muted ? <MicMuted size={15} /> : <SpeakingIcon size={15} />}
				</div>
			</div>
			<div className="flex justify-center items-center h-full w-full rounded-full">
				<div className="h-28 w-28 rounded-full overflow-hidden relative">
					<div className="h-28 w-28 rounded-full overflow-hidden relative">
						<img src="/assets/images/avatar.png" className="absolute top-0 left-0 h-full w-full z-20" />
						<RemoteAudioTrack track={user.audioTrack} play volume={100} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default VideoCallParticipantCard;
