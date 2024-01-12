import React, { RefObject, useEffect, useRef, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import { IUser } from "../../../../../interfaces/user.interface";
import { IWorkshop } from "../../../../../interfaces";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { slugify } from "../../../../../utils";
import { ConferenceUser } from "../../../../../hooks/useLiveWorkshop";
import { isCameraVideoTrack, iseAudioTrack } from "../../../atom/cards/call/VideoCallParticipantCard";

const ConferenceCallComponent = ({
	isWorkshopOwner,
	participants,
	workshop,
	callHost,
}: {
	isWorkshopOwner: boolean;
	participants: ConferenceUser[];
	workshop: IWorkshop;
	callHost: ConferenceUser | undefined;
}) => {
	const user = useSelector(currentUser);
	const [videoIsMuted, setVideoIsMuted] = useState<boolean>(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	// const mainUsername = participants.find(
	// 	(participant) => slugify(participant.username) === slugify(workshop.mentor.user?.name),
	// )?.username as string;

	const ref = useRef<HTMLDivElement>(null);

	const toggleMute = () => {
		// if (Boolean(user && slugify(user?.name) === slugify(user.username)) || isHost) {
		if (callHost)
			if (isCameraVideoTrack(callHost.videoTrack) && iseAudioTrack(callHost.audioTrack))
				if (callHost.videoTrack && callHost.audioTrack && ref.current) {
					if (callHost.audioTrack.muted && videoIsMuted) {
						callHost.audioTrack.setMuted(false);
						setVideoIsMuted(false);
					} else {
						callHost.audioTrack.setMuted(true);
						setVideoIsMuted(true);
					}
				}
	};
	// };

	useEffect(() => {
		if (callHost)
			if (isCameraVideoTrack(callHost.videoTrack) && iseAudioTrack(callHost.audioTrack)) {
				if (callHost.videoTrack && callHost.audioTrack && ref.current) {
					callHost.videoTrack.play(ref.current);
					callHost.audioTrack.play();
					callHost.videoTrack.setMuted(true);
					callHost.audioTrack.setMuted(true);
					setVideoIsMuted(true);
					// callHost.audioTrack.setVolume(0);
					// if (callHost.username === ) {
					// callHost.audioTrack.play();
					// }
				}
			}
		return () => {};
	}, [callHost?.videoTrack, callHost?.audioTrack, callHost]);

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group">
			<h1 className="">{callHost?.username}</h1>
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* Video */}
				<div className="h-full w-full" id={slugify(callHost?.username as string)} ref={ref}>
					{!callHost?.username && (
						<div className="flex flex-col justify-center items-center py-44">
							<ActivityIndicator size={50} />
							{!isWorkshopOwner ? (
								<p className="">The host hasn&apos;t joined yet</p>
							) : (
								<p className="">Joining...</p>
							)}
						</div>
					)}
				</div>
			</div>
			{/* Controls */}
			{callHost?.username && (
				<CallControls
					callHost={callHost}
					isWorkshopOwner={isWorkshopOwner}
					isMuted={videoIsMuted}
					handleMute={toggleMute}
				/>
			)}
		</div>
	);
};
const CallControls = ({
	handleMute,
	isMuted,
	isWorkshopOwner,
	callHost,
}: {
	handleMute: any;
	isMuted: boolean;
	isWorkshopOwner: boolean;
	callHost: ConferenceUser | undefined;
}) => {
	return (
		<div className="group-hover:flex hidden sm:flex absolute z-60 bottom-0 text-white left-0 w-full p-4 sm:p-6 bg-black/60 backdrop-blur-md items-center justify-center sm:justify-between gap-3 select-none">
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
