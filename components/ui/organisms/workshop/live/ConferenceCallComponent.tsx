import React, { RefObject, useEffect, useRef, useState } from "react";
import { MicMuted, RecIcon, ShareScreenIcon, SpeakingIcon } from "../../../atom/icons/svgs/call";

const ConferenceCallComponent = ({ isWorkshopOwner }: { isWorkshopOwner: boolean }) => {
	const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
	const [videoIsMuted, setVideoIsMuted] = useState<boolean>(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleMute = () => setVideoIsMuted(!videoIsMuted);

	// useEffect(() => {
	// 	if (videoRef.current) {
	// 		setVideoIsMuted(videoRef.current?.muted ? true : false);
	// 	}
	// 	console.log(videoRef.current?.muted);
	// }, [videoRef.current?.muted]);

	useEffect(() => {
		// console.log(hasMediaAccess);
		if (!hasMediaAccess)
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices
					.getUserMedia({
						audio: { echoCancellation: true, noiseSuppression: true, },
						video: { width: 640, height: 480, frameRate: { ideal: 15, max: 30 } },
						// video: true,
					})
					.then((stream) => {
						if (isWorkshopOwner) {
							if (videoRef.current) {
								videoRef.current.srcObject = stream;
								videoRef.current.volume = 0;
							}
							setHasMediaAccess(true);
						}
					})
					.catch((error) => {
						setHasMediaAccess(false);
						console.error("Error accessing microphone and camera:", error.message);
					});
			} else {
				setHasMediaAccess(false);
				console.error("getUserMedia is not supported in this browser");
			}
		// return () => {
		// 	setHasMediaAccess(false);
		// };
	}, [hasMediaAccess]);

	return (
		<div className="relative md:max-w-[95%] md:w-full md:h-full flex-grow group">
			{/* Video */}
			<div className="left-0 bg-zinc-200 w-auto h-auto md:w-full md:h-full">
				{/* {hasMediaAccess && <video ref={videoRef} width={"100%"} height={"100%"} className="w-full h-full" />} */}
				<video
					muted={videoIsMuted}
					autoPlay
					ref={videoRef}
					width={"100%"}
					height={"100%"}
					className="w-full h-full border"
				/>
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
				<p className="">30:23 / 1:00:05</p>
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
