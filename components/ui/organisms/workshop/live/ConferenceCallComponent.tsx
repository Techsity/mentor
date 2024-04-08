import React, { useEffect, useId, useMemo, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { IWorkshop } from "../../../../../interfaces";
import dynamic from "next/dynamic";
import { useRemoteUsers, RemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack, useCurrentUID } from "agora-rtc-react";
import { VideocamOffOutline, VideocamOutline } from "react-ionicons";
import { client } from "../../../../../hooks/agora";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";

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
	const toastId = useId();

	const isWorkshopOwner = useMemo(() => {
		return Boolean(user && user?.mentor?.id === workshop.mentor.id);
	}, [user, workshop]);

	const mentorEmail = workshop.mentor.user.email;
	const currentUID = useCurrentUID();
	const participants = useRemoteUsers();

	const workshopHost = participants.find((participant) => participant.uid === mentorEmail);

	useEffect(() => {
		console.log({ track: workshopHost?.videoTrack?.getMediaStreamTrack().enabled, workshopHost });
	}, [workshopHost]);

	useEffect(() => {
		client.on("user-joined", ({ uid }) => {
			if (uid !== currentUID) toast.info(`${String(uid).slice(0, 9)}... joined`, { toastId, ...ToastDefaultOptions() });
		});
	}, []);

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group">
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* Video */}
				<div className="h-full w-full">
					<div className="flex flex-col justify-center items-center w-full h-full">
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
						{!isWorkshopOwner && workshopHost && (
							<RemoteUser user={workshopHost} playAudio playVideo height={100} width={100} />
						)}
						{!workshopHost && <p>Host is yet to join</p>}
					</div>
				</div>
			</div>
			{/* Controls */}
			{isWorkshopOwner && (
				<CallControls
					isMuted={!micOn}
					handleMute={toggleMute}
					{...{ handleToggleCamera: handleToggleCamera, cameraOn }}
				/>
			)}
		</div>
	);
};
const CallControls = ({
	handleMute,
	isMuted,
	handleToggleCamera,
	cameraOn,
}: {
	handleMute: () => void;
	isMuted: boolean;
	cameraOn: boolean;
	handleToggleCamera: () => void;
}) => {
	return (
		<div className="group-hover:flex hidden sm:flex absolute z-20 bottom-0 text-white left-0 w-full p-4 sm:p-6 bg-black/60 backdrop-blur-md border-t border-white/10 items-center justify-center sm:justify-between gap-3 select-none">
			<div className="flex gap-6 text-sm items-center justify-between w-full">
				<span className="flex gap-2 items-center">
					<span className="bg-red-600 p-1 rounded-full animate__animated animate__fadeIn animate__infinite animate__slow" />
					Live
				</span>

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
