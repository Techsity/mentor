import React, { useEffect, useMemo, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import { IWorkshop } from "../../../../../interfaces";
import dynamic from "next/dynamic";
import { useLocalMicrophoneTrack, useLocalCameraTrack, usePublish, useRemoteUsers, RemoteUser } from "agora-rtc-react";

const LocalUser = dynamic(() => import("agora-rtc-react").then(({ LocalUser }) => LocalUser), {
	ssr: false,
});

const ConferenceCallComponent = ({
	// isWorkshopOwner ,
	workshop,
}: {
	isWorkshopOwner: boolean;
	workshop: IWorkshop;
}) => {
	const user = useSelector(currentUser);
	const [micOn, setMicOn] = useState<boolean>(false);
	const [cameraOn, setCamera] = useState<boolean>(true);
	const { localMicrophoneTrack } = useLocalMicrophoneTrack();
	const { localCameraTrack } = useLocalCameraTrack(true, { optimizationMode: "motion" });
	const [hostIsJoining, setHostIsJoining] = useState<boolean>(false);
	usePublish([localMicrophoneTrack, localCameraTrack]);
	const participants = useRemoteUsers();

	const toggleMute = () => {
		setMicOn((a) => !a);
		localMicrophoneTrack?.setEnabled(false);
	};
	//! Temp
	const userEmail = "josh@dev.ts";
	// const workshopHost = participants.find((participant) => participant.uid === workshop.mentor.user.email);
	const workshopHost = participants.find((participant) => participant.uid === userEmail);
	const isWorkshopOwner = user?.email === userEmail;

	let timeout: NodeJS.Timeout;

	// useEffect(() => {
	// 	if (!hostIsJoining) {
	// 		setHostIsJoining(true);
	// 		timeout = setTimeout(function () {
	// 			setHostIsJoining(false);
	// 		}, 1000);
	// 	}
	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// }, [workshopHost]);

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group">
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* Video */}
				<div className="h-full w-full">
					{/* {!callHost?.username && ( */}
					<div className="flex flex-col justify-center items-center w-full h-full">
						{/* {owner && isWorkshopOwner ? ( */}
						{isWorkshopOwner ? (
							<LocalUser
								audioTrack={localMicrophoneTrack}
								videoTrack={localCameraTrack}
								cameraOn={cameraOn}
								micOn={micOn}
								playAudio={false}
								playVideo={cameraOn}
								height={100}
								width={100}
								muted={micOn}
							/>
						) : (
							participants.length >= 1 &&
							workshopHost &&
							!hostIsJoining && (
								<RemoteUser
									user={workshopHost}
									playAudio={true}
									playVideo={true}
									height={100}
									width={100}
								/>
							)
						)}
						{!workshopHost && !isWorkshopOwner && !hostIsJoining ? (
							<p>Host is yet to join</p>
						) : (
							hostIsJoining && !isWorkshopOwner && <p>Host is joining...</p>
						)}
					</div>
					{/* )} */}
				</div>
			</div>
			{/* Controls */}
			{isWorkshopOwner && (
				<CallControls isMuted={Boolean(localMicrophoneTrack?.enabled)} handleMute={toggleMute} />
			)}
		</div>
	);
};
const CallControls = ({ handleMute, isMuted }: { handleMute: any; isMuted: boolean }) => {
	return (
		<div className="group-hover:flex hidden sm:flex absolute z-10 bottom-0 text-white left-0 w-full p-4 sm:p-6 bg-black/60 backdrop-blur-md items-center justify-center sm:justify-between gap-3 select-none">
			<div className="flex gap-6 text-sm items-center">
				<span className="flex gap-2 items-center">
					<span className="bg-red-600 p-1 rounded-full animate__animated animate__fadeIn animate__infinite animate__slow" />
					Live
				</span>

				<div className="flex gap-1 items-center cursor-pointer">
					<p className="">Share Screen</p>
					<ShareScreenIcon />
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
export default ConferenceCallComponent;
