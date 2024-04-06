import React from "react";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import { CallOutline, EllipsisVertical, MicOff, VideocamOff } from "react-ionicons";
import { ShareScreenIcon } from "../../../ui/atom/icons/svgs/call";
import { IAppointment } from "../../../../interfaces/mentor.interface";

const MentorshipSessionCallTemplate = ({ appointment }: { appointment: IAppointment }) => {
	return (
		<>
			{/* {activeConnection && !error && !isJoining ? ( */}
			<div className="w-screen h-screen bg-slate-100 fixed py-6 md:px-12">
				{/* <label
						style={{ color: networkLabels[networkQuality.uplinkNetworkQuality].color }}
						className="text-sm float-end">
						Network Quality: {networkLabels[networkQuality.uplinkNetworkQuality].message}
					</label> */}
				<div className="h-full w-full flex flex-col items-center justify-center gap-3 relative pb-[15vh]">
					<div className="w-full h-full bg-black/20 sm:rounded-lg overflow-hidden flex justify-center items-center">
						{/* {remoteUser ? (
								<RemoteUser user={remoteUser} height={100} width={100} muted={micOn} />
							) : ( */}
						<ActivityIndicator />
						{/* )} */}
					</div>
					<div className="w-[45vw] sm:w-[35vw] md:w-[25vw] h-[25vh] md:h-[30vh] bg-black/20 rounded-lg overflow-hidden absolute sm:top-auto top-3 sm:bottom-[15%] right-3">
						{/* <LocalUser
								audioTrack={localMicrophoneTrack}
								videoTrack={localCameraTrack}
								cameraOn={cameraOn}
								micOn={micOn}
								// playAudio={false}
								playVideo={cameraOn}
								height={100}
								width={100}
								muted={micOn}
							/> */}
					</div>
					<div className="absolute bottom-[15%] overflow-hidden w-full">
						<Controls
							onEndSession={() => {
								// setActiveConnection(false);
							}}
						/>
					</div>
				</div>
			</div>
			{/* ) : (
				<ChannelEntrance
					error={error}
					next={(c) => {
						if (c) setChannelName(c);
						setActiveConnection(true);
					}}
					onErrorJoin={() => {
						const timeout = setTimeout(function () {
							setActiveConnection(false);
							clearTimeout(timeout);
						}, 10000);
					}}
					retry={10000}
					loading={isJoining}
				/>
			)} */}
		</>
	);
};

const Controls = ({ onEndSession }: { onEndSession: () => void }) => {
	// const rtcClient = useRTCClient(client);
	const endSession = async () => {
		console.log("You Ended The Session");
		// rtcClient.unpublish();
		// rtcClient.leave();
		// rtcClient.removeAllListeners();
		onEndSession();
	};

	return (
		<div className="flex items-center gap-4 justify-between w-full max-w-md p-2 px-4 text-white bg-black/10 backdrop-blur-sm rounded-lg mx-auto">
			<span
				title="Share screen"
				className="shadow hover:shadow-lg flex justify-center items-center bg-zinc-200 p-2 rounded-full cursor-pointer duration-300">
				<ShareScreenIcon color="#000" size={20} />
			</span>
			<span
				title="Toggle video"
				className="shadow hover:shadow-lg flex justify-center items-center bg-zinc-200 p-2 rounded-full cursor-pointer duration-300">
				{/* <Videocam /> */}
				<VideocamOff />
			</span>
			<span
				title="Toggle audio"
				className="shadow hover:shadow-lg flex justify-center items-center bg-zinc-200 p-2 rounded-full cursor-pointer duration-300">
				{/* <MicSharp /> */}
				<MicOff />
			</span>
			<span
				title="Preferences"
				className="shadow hover:shadow-lg flex justify-center items-center p-2 bg-zinc-200 rounded-full cursor-pointer duration-300">
				<EllipsisVertical />
			</span>
			<span
				title="Leave session"
				onClick={endSession}
				className="shadow hover:shadow-lg flex justify-center items-center p-2 bg-red-500 hover:bg-red-800 rounded-full cursor-pointer duration-300">
				<CallOutline cssClasses={"rotate-[135deg]"} color="#fff" />
			</span>
		</div>
	);
};

export default MentorshipSessionCallTemplate;
