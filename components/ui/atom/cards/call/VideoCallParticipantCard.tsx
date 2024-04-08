import React, { memo, useEffect, useState } from "react";
import { MicMuted, SpeakingIcon } from "../../icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { IAgoraRTCRemoteUser, RemoteUser, useRTCClient } from "agora-rtc-react";
import dynamic from "next/dynamic";
import Avatar from "../../common/user/Avatar";
const RemoteAudioTrack = dynamic(() => import("agora-rtc-react").then(({ RemoteAudioTrack }) => RemoteAudioTrack), {
	ssr: false,
});

const VideoCallParticipantCard = memo(function VideoCallParticipantCard({ isHost, user }: Props) {
	console.log({ isEnabled: user.audioTrack?.getMediaStreamTrack().enabled, track: user.audioTrack });

	useEffect(() => {
		console.log({ isPlaying: user.audioTrack?.isPlaying });
	}, [user.audioTrack?.isPlaying]);

	return !user ? (
		<></>
	) : (
		<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
			<div className="flex justify-between items-center">
				<p className="lowercase text-sm">{String(user.uid).slice(0, 9) + "..."}</p>
				<div className="" title={!user.audioTrack?.getMediaStreamTrack().muted ? "Speaking" : "Muted"}>
					{user.audioTrack?.getMediaStreamTrack().enabled ? (
						<MicMuted size={15} />
					) : (
						<SpeakingIcon size={15} />
					)}
				</div>
			</div>
			<div className="flex justify-center items-center h-full w-full rounded-full">
				<div className="h-28 w-28 rounded-full overflow-hidden relative">
					<div className="h-28 w-28 rounded-full overflow-hidden relative">
						<img src="/assets/images/avatar.png" className="absolute top-0 left-0 h-full w-full z-20" />
						{/* <Avatar useName /> */}
						<RemoteAudioTrack play />
					</div>
				</div>
			</div>
		</div>
	);
});
type Props = {
	user: IAgoraRTCRemoteUser;
	isHost: boolean;
};

export default VideoCallParticipantCard;
