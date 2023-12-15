import React, { RefObject, useEffect, useRef, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import { IUser } from "../../../../../interfaces/user.interface";
import { IWorkshop } from "../../../../../interfaces";

const ConferenceCallComponent = ({
	isWorkshopOwner,
	participants,
	workshop,
}: {
	isWorkshopOwner: boolean;
	participants: IUser[];
	workshop: IWorkshop;
}) => {
	const user = useSelector(currentUser);
	const [videoIsMuted, setVideoIsMuted] = useState<boolean>(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleMute = () => setVideoIsMuted(!videoIsMuted);

	// useEffect(() => {
	// 	if (videoRef.current) {
	// 		setVideoIsMuted(videoRef.current?.muted ? true : false);
	// 	}
	// 	console.log(videoRef.current?.muted);
	// }, [videoRef.current?.muted]);
	const mainUserId = participants.find((u) => u.id === workshop.mentor.user?.id)?.id as string;

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group">
			{/* Video */}
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* {hasMediaAccess && <video ref={videoRef} width={"100%"} height={"100%"} className="w-full h-full" />} */}
				{/* <video
					muted={videoIsMuted}
					autoPlay
					ref={videoRef}
					width={"100%"}
					height={"100%"}
					className="w-full h-full border"
				/> */}
				<div className="h-full w-full" id={`user__${mainUserId}`}></div>
			</div>
			{/* Controls */}
			<CallControls isMuted={videoIsMuted} videoRef={videoRef} handleMute={handleMute} />
		</div>
	);
};
const CallControls = ({
	videoRef,
	handleMute,
	isMuted,
}: {
	videoRef: RefObject<HTMLVideoElement>;
	handleMute: any;
	isMuted: boolean;
}) => {
	return (
		<div className="group-hover:flex hidden sm:flex absolute z-60 bottom-0 text-white left-0 w-full p-4 sm:p-6 bg-black/50 backdrop-blur-sm items-center justify-center sm:justify-between gap-3 select-none">
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
					<p className="">{isMuted ? "Unmute" : "Mute"}</p>
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
