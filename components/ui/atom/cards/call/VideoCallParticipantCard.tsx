import React, { FC, memo, useEffect, useRef, useState } from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import { MicMuted, SpeakingIcon } from "../../icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import { IAgoraRTCRemoteUser, ClientRole, ClientRoleOptions, useClientEvent, } from "agora-rtc-react";

import dynamic from "next/dynamic";

const RemoteUser = dynamic(() => import("agora-rtc-react").then(({ RemoteUser }) => RemoteUser), {
	ssr: false,
});

type Props = {
	user: IAgoraRTCRemoteUser;
	isHost: boolean;
	hideUser: (userId: string) => void;
};

const VideoCallParticipantCard = memo(function VideoCallParticipantCard({ isHost, user }: Props) {
	const [muted, setMuted] = useState<boolean>(true);
	const signedInUser = useSelector(currentUser);
	const [cameraOn, setCameraOn] = useState<boolean>(true);

	const toggleMute = () => {
		setMuted((a) => !a);
	};

	if (!user) return <></>;
	// console.log({ user: user });

	return (
		<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
			<div className="flex justify-between items-center">
				<p className="capitalize text-sm">Username</p>
				<div className="" title={!muted ? "Unmute" : "Mute"}>
					{!muted ? (
						<MicMuted size={15} onClick={toggleMute} className="cursor-pointer" />
					) : (
						<SpeakingIcon size={15} onClick={toggleMute} className="cursor-pointer" />
					)}
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
			<span onClick={() => setCameraOn((b) => !b)} className="text-sm cursor-pointer text-[#] select-none">
				{!cameraOn ? "Open Camera" : "Hide"}
			</span>
		</div>
	);
});

export default VideoCallParticipantCard;
