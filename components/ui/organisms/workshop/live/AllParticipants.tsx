import React from "react";
import VideoCallParticipantCard from "../../../atom/cards/call/VideoCallParticipantCard";
import { IWorkshop } from "../../../../../interfaces";
import { useRemoteUsers, useCurrentUID, useRemoteAudioTracks, IMicrophoneAudioTrack, LocalUser } from "agora-rtc-react";
import { MicMuted, SpeakingIcon } from "../../../atom/icons/svgs/call";

const LiveWorkshopParticipants = ({ isWorkshopOwner, workshop, micOn, localMicrophoneTrack, toggleMute }: Props) => {
	const uid = useCurrentUID();
	const participants = useRemoteUsers();
	const { audioTracks } = useRemoteAudioTracks(participants);
	audioTracks.map((a) => a.play());

	return (
		<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full pt-4">
			<div className="flex-grow w-full bg-white py-0 p-6">
				<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
				<div className="grid sm:grid-cols-2 gap-3 h-full w-full bg-white">
					{!isWorkshopOwner && (
						<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
							<div className="flex justify-between items-center">
								<p className="text-sm">You</p>
								<div className="" title={!micOn ? "Unmute" : "Mute"}>
									{!micOn ? (
										<MicMuted size={15} onClick={toggleMute} className="cursor-pointer" />
									) : (
										<SpeakingIcon size={15} onClick={toggleMute} className="cursor-pointer" />
									)}
								</div>
							</div>
							<div className="flex justify-center items-center h-full w-full rounded-full">
								<div className="h-28 w-28 rounded-full overflow-hidden relative">
									<img
										src="/assets/images/avatar.png"
										className="absolute top-0 left-0 h-full w-full z-20"
									/>
									<LocalUser
										audioTrack={localMicrophoneTrack}
										videoTrack={null}
										cameraOn={false}
										micOn={micOn}
										playAudio={false}
										playVideo={false}
										height={100}
										width={100}
									/>
								</div>
							</div>
						</div>
					)}
					{participants.filter((u) => u !== null).length >= 1 &&
						participants
							.filter((u) => u.uid !== uid)
							.map((participant) => {
								return (
									<VideoCallParticipantCard
										user={participant}
										isHost={isWorkshopOwner}
										key={participant.uid}
									/>
								);
							})
							.slice(0, 8)}
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

type Props = {
	micOn: boolean;
	isWorkshopOwner: boolean;
	workshop: IWorkshop;
	localMicrophoneTrack: IMicrophoneAudioTrack | null;
	toggleMute: () => void;
};

export default LiveWorkshopParticipants;
