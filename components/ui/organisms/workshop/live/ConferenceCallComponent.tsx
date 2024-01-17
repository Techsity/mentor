import React, { RefObject, useEffect, useRef, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import { IUser } from "../../../../../interfaces/user.interface";
import { IWorkshop } from "../../../../../interfaces";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { slugify } from "../../../../../utils";
import dynamic from "next/dynamic";
import {
	useLocalMicrophoneTrack,
	useLocalCameraTrack,
	usePublish,
	useRemoteAudioTracks,
	useRemoteUsers,
	useRTCClient,
} from "agora-rtc-react";

const LocalUser = dynamic(() => import("agora-rtc-react").then(({ LocalUser }) => LocalUser), {
	ssr: false,
});

const ConferenceCallComponent = ({ isWorkshopOwner }: { isWorkshopOwner: boolean }) => {
	const user = useSelector(currentUser);
	const [micOn, setMicOn] = useState<boolean>(false);
	const [cameraOn, setCamera] = useState<boolean>(true);
	const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
	const { localCameraTrack } = useLocalCameraTrack(cameraOn);
	const { error: publishError, isLoading } = usePublish([localMicrophoneTrack, localCameraTrack]);
	const remoteUsers = useRemoteUsers();
	const { audioTracks } = useRemoteAudioTracks(remoteUsers);

	// audioTracks.forEach((track) => track.play());

	// const mainUsername = participants.find(
	// 	(participant) => slugify(participant.username) === slugify(workshop.mentor.user?.name),
	// )?.username as string;

	// const client = useRTCClient()

	const ref = useRef<HTMLDivElement>(null);

	const toggleMute = () => {
		setMicOn((a) => !a);
	};

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group">
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* Video */}
				<div className="h-full w-full" id={slugify("username" as string)} ref={ref}>
					{/* {!callHost?.username && ( */}
					<div className="flex flex-col justify-center items-center w-full h-full">
						<LocalUser
							audioTrack={localMicrophoneTrack}
							videoTrack={localCameraTrack}
							cameraOn={cameraOn}
							micOn={micOn}
							playAudio={micOn}
							playVideo={cameraOn}
							height={100}
							width={100}
							volume={0}
						/>
					</div>
					{/* )} */}
				</div>
			</div>
			{/* Controls */}
			{/* {callHost?.username && ( */}
			<CallControls isWorkshopOwner={true} isMuted={micOn} handleMute={toggleMute} />
			{/* )} */}
		</div>
	);
};
const CallControls = ({
	handleMute,
	isMuted,
	isWorkshopOwner,
}: {
	handleMute: any;
	isMuted: boolean;
	isWorkshopOwner: boolean;
}) => {
	return (
		<div className="group-hover:flex hidden sm:flex absolute z-10 bottom-0 text-white left-0 w-full p-4 sm:p-6 bg-black/60 backdrop-blur-md items-center justify-center sm:justify-between gap-3 select-none">
			<div className="flex gap-6 text-sm items-center">
				<span className="flex gap-2 items-center">
					<span className="bg-red-600 p-1 rounded-full animate__animated animate__fadeIn animate__infinite animate__slow" />
					Live
				</span>
				{isWorkshopOwner && (
					<div className="flex gap-1 items-center cursor-pointer">
						<p className="">Share Screen</p>
						<ShareScreenIcon />
					</div>
				)}
				<div onClick={handleMute} className="flex gap-1 items-center cursor-pointer">
					{isWorkshopOwner && <p className="">{!isMuted ? "Mute" : "Unmute"}</p>}
					{!isMuted ? <MicMuted size={15} /> : <SpeakingIcon size={15} />}
				</div>
				{isWorkshopOwner && (
					<div className="hidden sm:flex gap-1 items-center cursor-pointer">
						<p className="">Record Session</p>
						<RecIcon />
					</div>
				)}
			</div>
		</div>
	);
};
export default ConferenceCallComponent;
