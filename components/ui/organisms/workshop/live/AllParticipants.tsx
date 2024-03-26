import React, { useEffect, useState } from "react";
import VideoCallParticipantCard from "../../../atom/cards/call/VideoCallParticipantCard";
import { IWorkshop } from "../../../../../interfaces";
import {
	useLocalMicrophoneTrack,
	useRemoteUsers,
	useCurrentUID,
	LocalAudioTrack,
	useRemoteAudioTracks,
} from "agora-rtc-react";
import { MicMuted, SpeakingIcon } from "../../../atom/icons/svgs/call";
import { client } from "../../../../../hooks/agora";

type Props = {
	isWorkshopOwner: boolean;
	workshop: IWorkshop;
	// participants: IAgoraRTCRemoteUser[];
};
const LiveWorkshopParticipants = ({ isWorkshopOwner, workshop }: Props) => {
	const [muted, setMuted] = useState<boolean>(true);
	const uid = useCurrentUID();
	const { localMicrophoneTrack } = useLocalMicrophoneTrack(true, { ANS: true, AEC: true });
	const participants = useRemoteUsers();

	const toggleMute = () => {
		setMuted((a) => !a);
		localMicrophoneTrack?.setEnabled(!muted);
	};

	const { audioTracks } = useRemoteAudioTracks(participants);
	audioTracks.map((a) => a.play());

	// useEffect(() => {
	// 	if (uid) client.publish([localMicrophoneTrack, {} as any]);
	// }, [localMicrophoneTrack]);

	return (
		<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full">
			<div className="flex-grow w-full bg-white py-0 p-6">
				<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
				<div className="grid sm:grid-cols-2 gap-3 h-full w-full bg-white">
					<div className="h-full w-full bg-white border border-[#70C5A1] p-2 flex flex-col gap-4 overflow-hidden">
						<div className="flex justify-between items-center">
							<p className="text-sm">You</p>
							<div className="" title={muted ? "Unmute" : "Mute"}>
								{muted ? (
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
								<LocalAudioTrack disabled={muted} play={false} track={localMicrophoneTrack} />
							</div>
						</div>
					</div>
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

export default LiveWorkshopParticipants;
