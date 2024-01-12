import React, { FC, memo, useEffect, useRef, useState } from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import { MicMuted, SpeakingIcon } from "../../icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import { slugify } from "../../../../../utils";
import {
	IAgoraRTCRemoteUser,
	IDataChannelConfig,
	IMicrophoneAudioTrack,
	ICameraVideoTrack,
	IAgoraRTCClient,
	IRemoteAudioTrack,
	IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { ConferenceUser } from "../../../../../hooks/useLiveWorkshop";

type Props = {
	user: ConferenceUser;
	isHost: boolean;
	hideUser: (userId: string) => void;
};

export const isCameraVideoTrack = (track: any): track is ICameraVideoTrack => {
	return track instanceof Object;
};
export const iseAudioTrack = (track: any): track is IMicrophoneAudioTrack => {
	return track instanceof Object;
};

const VideoCallParticipantCard = memo(function VideoCallParticipantCard({ isHost, user }: Props) {
	const [muted, setMuted] = useState<boolean>(true);
	const signedInUser = useSelector(currentUser);
	const ref = useRef<HTMLDivElement>(null);

	const toggleMute = () => {
		if (Boolean(signedInUser && slugify(signedInUser?.name) === slugify(user.username)) || isHost) {
			if (isCameraVideoTrack(user.videoTrack) && iseAudioTrack(user.audioTrack))
				if (user.videoTrack && user.audioTrack && ref.current) {
					if (user.audioTrack.muted) {
						user.audioTrack.setMuted(false);
						setMuted(false);
					} else {
						user.audioTrack.setMuted(true);
						setMuted(true);
					}
				}
		}
	};

	useEffect(() => {
		if (isCameraVideoTrack(user.videoTrack) && iseAudioTrack(user.audioTrack)) {
			if (user.videoTrack && user.audioTrack && ref.current) {
				// user.videoTrack.play(ref.current);
				user.audioTrack.play();
				// user.videoTrack.setMuted(true);
				user.audioTrack.setMuted(true);
				setMuted(true);
				// user.audioTrack.setVolume(0);
				// if (user.username === ) {
				// user.audioTrack.play();
				// }
			}
		}
	}, [user.videoTrack, user.audioTrack, user]);

	if (!user) return <></>;

	return (
		<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<p className="capitalize text-sm">
					{signedInUser && signedInUser?.name === user.username
						? "You"
						: user.username.length > 4
						? user.username.split("-").join(" ").slice(0, 4) + "..."
						: user.username.split("-").join(" ")}
				</p>
				<div className="" title={!muted ? "Unmute" : "Mute"}>
					{!muted ? (
						<MicMuted size={15} onClick={toggleMute} className="cursor-pointer" />
					) : (
						<SpeakingIcon size={15} onClick={toggleMute} className="cursor-pointer" />
					)}
				</div>
			</div>
			<div className="flex justify-center items-center h-full w-full">
				<div
					ref={ref}
					className="relative z-30 h-[150px] w-[150px] rounded-full bg-zinc-200 object-cover overflow-hidden"
					id={user.username}
					style={{
						background: `url("/assets/images/avatar.png")`,
						backgroundSize: "100% 100%",
						backgroundRepeat: "no-repeat",
					}}></div>
			</div>
			<span className="text-sm cursor-pointer text-[#] select-none">Hide</span>
		</div>
	);
});

export default VideoCallParticipantCard;
