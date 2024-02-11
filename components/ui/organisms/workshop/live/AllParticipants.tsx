import React, { useState } from "react";
import VideoCallParticipantCard from "../../../atom/cards/call/VideoCallParticipantCard";
import { useSelector } from "react-redux";
import { IWorkshop } from "../../../../../interfaces";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import {
	LocalUser,
	useLocalCameraTrack,
	useLocalMicrophoneTrack,
	useRemoteUsers,
	useRemoteAudioTracks,
} from "agora-rtc-react";
import { MicMuted, SpeakingIcon } from "../../../atom/icons/svgs/call";

type Props = {
	isWorkshopOwner: boolean;
	workshop: IWorkshop;
	// participants: IAgoraRTCRemoteUser[];
};
const LiveWorkshopParticipants = ({ isWorkshopOwner, workshop }: Props) => {
	const user = useSelector(currentUser);
	const [muted, setMuted] = useState<boolean>(true);
	const [cameraOn, setCameraOn] = useState<boolean>(true);

	const { localMicrophoneTrack } = useLocalMicrophoneTrack(muted);
	const { localCameraTrack } = useLocalCameraTrack(cameraOn);

	const toggleMute = () => {
		setMuted((a) => !a);
	};

	const participants = useRemoteUsers();
	const { audioTracks } = useRemoteAudioTracks(participants);

	audioTracks.forEach((track) => track.play());

	const toggleCamera = () => {
		setCameraOn((b) => !b);
	};

	return (
		<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full">
			<div className="flex-grow w-full bg-white py-0 p-6">
				<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
				<div className="grid sm:grid-cols-2 gap-3 h-full w-full bg-white">
					{!isWorkshopOwner && (
						<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
							<div className="flex justify-between items-center">
								<p className="text-sm">You</p>
								<div className="" title={!muted ? "Unmute" : "Mute"}>
									{!muted ? (
										<MicMuted size={15} onClick={toggleMute} className="cursor-pointer" />
									) : (
										<SpeakingIcon size={15} onClick={toggleMute} className="cursor-pointer" />
									)}
								</div>
							</div>
							<div className="flex justify-center items-center h-full w-full rounded-full">
								<div className="h-28 w-28 rounded-full overflow-hidden">
									<LocalUser
										audioTrack={localMicrophoneTrack}
										videoTrack={localCameraTrack}
										cameraOn={cameraOn}
										micOn={muted}
										playAudio={muted}
										playVideo={cameraOn}
										height={100}
										width={100}
										// volume={0}
									/>
								</div>
							</div>
							<span onClick={toggleCamera} className="text-sm cursor-pointer text-[#] select-none">
								{/* {cameraOn ? "Turn off video" : "Turn on video"} */} Toggle Camera
							</span>
						</div>
					)}
					{participants.filter((u) => u !== null).length >= 1 &&
						participants
							.map((participant, index) => {
								return (
									<VideoCallParticipantCard user={participant} isHost={isWorkshopOwner} key={index} />
								);
							})
							.slice(0, 8)}
					{/*  ) : (
			 	<div className="flex justify-center items-center">
						 <ActivityIndicator size={30} /> 
					 <p className="text-sm text-zinc-300">Waiting for others.</p> 
					</div> */}
					{/* )} */}
				</div>
				{participants.length > 8 && (
					<h1 className="text-[#094B10] text-sm text-left mb-5 select-none cursor-pointer font-medium">
						View all {participants.length} participants
					</h1>
				)}
			</div>
		</div>
	);
};

export default LiveWorkshopParticipants;
