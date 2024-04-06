import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { VideocamOff, MicOff, EllipsisVertical, MicSharp, Videocam } from "react-ionicons";

const TestCallMedia = () => {
	const streamRef = useRef<HTMLVideoElement>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [mediaPermissions, setMediaPermissions] = useState<MediaPermission>({ audio: false, video: false });
	const [permissionsDenied, setPermissionsDenied] = useState<boolean>(true);

	const toggleAudio = async () => {
		try {
			if (mediaPermissions.audio) {
				stream?.getAudioTracks()[0].stop();
				setMediaPermissions((prev) => ({ ...prev, audio: false }));
			} else {
				const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
				const newStream = new MediaStream([
					...(stream?.getVideoTracks() || []),
					...audioStream.getAudioTracks(),
				]);
				setStream(newStream);
				setMediaPermissions((prev) => ({ ...prev, audio: true }));
			}
		} catch (error) {
			console.error("Error toggling audio:", error);
		}
	};

	const toggleVideo = async () => {
		try {
			if (mediaPermissions.video) {
				stream?.getVideoTracks()[0].stop();
				setMediaPermissions((prev) => ({ ...prev, video: false }));
			} else {
				const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
				const newStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...(stream?.getAudioTracks() || []),
				]);
				setStream(newStream);
				setMediaPermissions((prev) => ({ ...prev, video: true }));
			}
		} catch (error) {
			console.error("Error toggling video:", error);
		}
	};

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: true, preferCurrentTab: true })
			.then((currentStream) => {
				setStream(currentStream);
				if (streamRef.current) streamRef.current.srcObject = currentStream;
				console.log({ audioTracks: currentStream.getAudioTracks() });
				setMediaPermissions({ audio: true, video: true });
				setPermissionsDenied(false);
			})
			.catch((err: any) => {
				console.error("error getting user media:", err);
				setMediaPermissions({ audio: false, video: false });
				setPermissionsDenied(true);
			});
	}, []);

	return (
		<div className="w-screen h-screen fixed top-0 left-0 pt-[10vh] md:pt-[20vh]">
			<div className="w-full h-full grid grid-cols-12 gap-4 p-6 sm:px-12">
				<div className="bg-black/10 w-full h-[50%] md:h-[65%] col-span-12 md:col-span-7 overflow-hidden flex justify-center rounded-lg relative">
					{permissionsDenied ? (
						<div className="bg-black absolute top-0 left-0 w-full h-full flex justify-center items-center">
							<p className="text-white text-center z-10 relative">Allow video and audio permissions</p>
						</div>
					) : (
						!mediaPermissions.video && (
							<div className="bg-black absolute top-0 left-0 w-full h-full flex justify-center items-center">
								<p className="text-white text-center z-10 relative">Camera is off</p>
							</div>
						)
					)}
					<div className="h-full w-full">
						{mediaPermissions.video && (
							<video
								className="w-full h-full scale-x-[-1]"
								muted
								disablePictureInPicture
								controlsList="nodownload"
								autoPlay
								ref={streamRef}
								onContextMenu={(e) => e.preventDefault()}
							/>
						)}
					</div>
					<div className="absolute w-full max-w-sm mx-auto bottom-2">
						<Controls
							{...{
								allowAudio: mediaPermissions.audio,
								allowVideo: mediaPermissions.video,
								toggleAudio,
								toggleVideo,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const Controls = ({
	allowVideo,
	allowAudio,
	toggleVideo,
	toggleAudio,
}: {
	allowVideo: boolean;
	allowAudio: boolean;
	toggleVideo: () => void;
	toggleAudio: () => void;
}) => {
	return (
		<div className="flex items-center gap-4 justify-between w-full max-w-md p-2 px-4 text-white bg-white/50 backdrop-blur-sm rounded-lg mx-auto">
			<span
				onClick={toggleVideo}
				title="Toggle video"
				className={classNames(
					"shadow hover:shadow-lg flex justify-center items-center  p-2 rounded-full cursor-pointer duration-300",
					!allowVideo ? "bg-red-500" : "bg-zinc-200",
				)}>
				{allowVideo ? <Videocam /> : <VideocamOff color={"#fff"} />}
			</span>
			<span
				title="Toggle audio"
				onClick={toggleAudio}
				className={classNames(
					"shadow hover:shadow-lg flex justify-center items-center  p-2 rounded-full cursor-pointer duration-300",
					!allowAudio ? "bg-red-500" : "bg-zinc-200",
				)}>
				{allowAudio ? <MicSharp /> : <MicOff color={"#fff"} />}
			</span>
			<span
				title="Preferences"
				className="shadow hover:shadow-lg flex justify-center items-center p-2 bg-zinc-200 rounded-full cursor-pointer duration-300">
				<EllipsisVertical />
			</span>
		</div>
	);
};

type MediaPermission = {
	audio: boolean;
	video: boolean;
};

export default TestCallMedia;
