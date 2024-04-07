import classNames from "classnames";
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { VideocamOff, MicOff, EllipsisVertical, MicSharp, Videocam } from "react-ionicons";
import { PrimaryButton } from "../../../atom/buttons";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";

const TestCallMedia = (props: TestCallMediaProps) => {
	const { localStreamRef, onPermissionSet, setStream, stream, loading } = props;
	const [mediaPermissions, setMediaPermissions] = useState<MediaPermission>({ audio: false, video: false });
	const [permissionsDenied, setPermissionsDenied] = useState<boolean>(true);

	const toggleAudio = async () => {
		// try {
		// 	if (mediaPermissions.audio) {
		// 		stream?.getAudioTracks().forEach((track) => track.stop());
		// 		// setMediaPermissions({ ...mediaPermissions, audio: false });
		// 	} else {
		// 		const updatedStream = await navigator.mediaDevices.getUserMedia({
		// 			audio: true,
		// 			video: mediaPermissions.video,
		// 		});
		// 		setStream(updatedStream);
		// 	}
		// 	setMediaPermissions({ ...mediaPermissions, audio: !mediaPermissions.audio });
		// 	setPermissionsDenied(false);
		// } catch (err: any) {
		// 	// console.log({ err: err.toString() });
		// 	console.error("Error toggling audio:", err);
		// 	setMediaPermissions({ ...mediaPermissions, audio: false });
		// 	setPermissionsDenied(true);
		// }
	};

	const toggleVideo = async () => {
		// try {
		// 	if (mediaPermissions.video) {
		// 		stream?.getVideoTracks().forEach((track) => track.stop());
		// 		setMediaPermissions({ ...mediaPermissions, video: false });
		// 		if (localStreamRef.current) localStreamRef.current.srcObject = null;
		// 	} else {
		// 		const updatedStream = await navigator.mediaDevices.getUserMedia({
		// 			audio: mediaPermissions.audio,
		// 			video: true,
		// 		});
		// 		setStream(updatedStream);
		// 		if (localStreamRef.current) localStreamRef.current.srcObject = updatedStream;
		// 	}
		// 	setMediaPermissions({ ...mediaPermissions, video: true });
		// 	setPermissionsDenied(false);
		// } catch (err) {
		// 	console.error("Error toggling video:", err);
		// 	setPermissionsDenied(true);
		// }
	};

	const handleJoin = () => {
		onPermissionSet(mediaPermissions);
	};

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: true, preferCurrentTab: true })
			.then((currentStream) => {
				setStream(currentStream);
				if (localStreamRef.current) localStreamRef.current.srcObject = currentStream;
				setMediaPermissions({ audio: true, video: true });
				setPermissionsDenied(false);
			})
			.catch((err: any) => {
				console.error("error getting user media:", err);
				setMediaPermissions({ audio: false, video: false });
				setPermissionsDenied(true);
			});
		return () => {
			// navigator.mediaDevices.getUserMedia({ audio: false, video: false });
			// setMediaPermissions({ audio: false, video: false });
			// setPermissionsDenied(true);
		};
	}, []);

	return (
		<div className="w-screen h-screen fixed top-0 left-0 pt-[10vh] md:pt-[20vh]">
			<div className="w-full md:h-full grid grid-cols-12 gap-4 p-6 sm:px-12 items-center justify-center">
				<div className="bg-black/10 w-full h-[30vh] md:h-[65%] col-span-12 md:col-span-7 overflow-hidden flex justify-center rounded-lg relative">
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
						{/* {mediaPermissions.video && ( */}
						<video
							className="w-full h-full scale-x-[-1]"
							muted
							disablePictureInPicture
							controlsList="nodownload"
							autoPlay
							ref={localStreamRef}
							onContextMenu={(e) => e.preventDefault()}
						/>
						{/* )} */}
					</div>
					<div className="absolute w-full md:max-w-sm mx-auto bottom-0 md:bottom-2">
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
				<div className="col-span-12 md:col-span-5 flex flex-col gap-2 items-center justify-center">
					<p className="font-medium" style={{ fontFamily: "Days One" }}>
						Ready to join session?
					</p>
					<PrimaryButton
						title={!loading ? "Join" : ""}
						onClick={handleJoin}
						disabled={loading}
						icon={loading ? <ActivityIndicator /> : <></>}
						className="p-1.5 px-5 flex items-center justify-center text-sm w-full"
					/>
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
		<div className="flex items-center gap-4 justify-between w-full p-1 md:p-2 px-4 text-white bg-white/50 backdrop-blur-sm md:rounded-lg mx-auto">
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
					"shadow hover:shadow-lg flex justify-center items-center p-2 rounded-full cursor-pointer duration-300",
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

export type MediaPermission = {
	audio: boolean;
	video: boolean;
};

export type TestCallMediaProps = {
	onPermissionSet: (mediaPermissions: MediaPermission) => void;
	localStreamRef: RefObject<HTMLVideoElement>;
	stream: MediaStream | null;
	setStream: Dispatch<SetStateAction<MediaStream | null>>;
	loading: boolean;
};

export default TestCallMedia;
