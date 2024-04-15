import React, { useEffect, useId, useMemo, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { IWorkshop } from "../../../../../interfaces";
import dynamic from "next/dynamic";
import {
	useRemoteUsers,
	RemoteUser,
	IAgoraRTCRemoteUser,
	IMicrophoneAudioTrack,
	ICameraVideoTrack,
	useCurrentUID,
	useRTCClient,
} from "agora-rtc-react";
import { VideocamOffOutline, VideocamOutline } from "react-ionicons";
import { client } from "../../../../../hooks/agora";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import Avatar from "../../../atom/common/user/Avatar";

const LocalUser = dynamic(() => import("agora-rtc-react").then(({ LocalUser }) => LocalUser), {
	ssr: false,
});

const ConferenceCallComponent = ({
	workshop,
	micOn,
	cameraOn,
	localMicrophoneTrack,
	localCameraTrack,
	toggleMute,
	handleToggleCamera,
}: Props) => {
	const user = useSelector(currentUser);

	const [hostVideoActive, setHostVideoActive] = useState(false);

	const isWorkshopOwner = useMemo(() => {
		return Boolean(user && user?.mentor?.id === workshop.mentor.id);
	}, [user, workshop]);

	const mentorEmail = workshop.mentor.user.email;
	const participants = useRemoteUsers();

	const workshopHost = participants.find((participant) => participant.uid === mentorEmail);

	const rtcClient = useRTCClient(client);

	useEffect(() => {
		rtcClient.on("user-info-updated", (uid, msg) => {
			console.log({ uid, msg, hostVideoActive });
			if (workshopHost?.uid === uid) {
				if (msg === "mute-video") setHostVideoActive(false);
				else if (msg === "unmute-video") setHostVideoActive(true);
			}
		});
	}, [participants]);

	useEffect(() => {
		if (isWorkshopOwner) setHostVideoActive(Boolean(localCameraTrack?.enabled));
	}, [handleToggleCamera]);

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group z-10">
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* Video */}
				<div className="h-full w-full">
					<div className="flex flex-col justify-center items-center w-full h-full object-contain">
						{isWorkshopOwner && (
							<LocalUser
								audioTrack={localMicrophoneTrack}
								videoTrack={localCameraTrack}
								cameraOn={cameraOn}
								micOn={micOn}
								playAudio={false}
								playVideo={cameraOn}
								height={100}
								width={100}
							/>
						)}
						{!isWorkshopOwner && workshopHost ? (
							<RemoteUser user={workshopHost} playAudio playVideo height={100} width={100} />
						) : (
							<p>Host is not in the meeting</p>
						)}
						{!hostVideoActive && (
							<div className="absolute">
								<Avatar user={workshop.mentor.user} useName className="w-32 h-32" />
							</div>
						)}
					</div>
				</div>
			</div>
			{/* Controls */}
			<div className="absolute z-40 bottom-0 w-full">
				<CallControls
					isMuted={!micOn}
					handleMute={toggleMute}
					{...{ handleToggleCamera: handleToggleCamera, cameraOn, isWorkshopOwner }}
				/>
			</div>
		</div>
	);
};
const CallControls = ({
	handleMute,
	isMuted,
	handleToggleCamera,
	cameraOn,
	isWorkshopOwner,
}: {
	handleMute: () => void;
	isMuted: boolean;
	cameraOn: boolean;
	handleToggleCamera: () => void;
	isWorkshopOwner: boolean;
}) => {
	return (
		<div className="flex text-white w-full p-4 bg-black/60 backdrop-blur-md border-t border-white/10 items-center justify-center sm:justify-between gap-3 select-none">
			<div className="flex gap-6 text-sm items-center justify-between w-full">
				<span className="flex gap-2 items-center">
					<span className="bg-red-600 p-1 rounded-full animate__animated animate__fadeIn animate__infinite animate__slow" />
					Live
				</span>

				{isWorkshopOwner && (
					<>
						<div className="flex gap-1 items-center cursor-pointer">
							<p className="">Share Screen</p>
							<ShareScreenIcon />
						</div>

						<div onClick={handleToggleCamera} className="flex gap-1 items-center cursor-pointer">
							<p className="">Camera</p>
							{!cameraOn ? <VideocamOffOutline color="#fff" /> : <VideocamOutline color="#fff" />}
						</div>

						<div onClick={handleMute} className="flex gap-1 items-center cursor-pointer">
							<p className="">{!isMuted ? "Mute" : "Unmute"}</p>
							{!isMuted ? <MicMuted size={15} /> : <SpeakingIcon size={15} />}
						</div>

						<div className="hidden sm:flex gap-1 items-center cursor-pointer">
							<p className="">Record Session</p>
							<RecIcon />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
type Props = {
	micOn: boolean;
	cameraOn: boolean;
	workshop: IWorkshop;
	localMicrophoneTrack: IMicrophoneAudioTrack | null;
	localCameraTrack: ICameraVideoTrack | null;
	toggleMute: () => void;
	handleToggleCamera: () => void;
};

export default ConferenceCallComponent;
