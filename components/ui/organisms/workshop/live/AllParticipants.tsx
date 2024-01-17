import React from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import VideoCallParticipantCard from "../../../atom/cards/call/VideoCallParticipantCard";
import { useSelector } from "react-redux";

import { IWorkshop } from "../../../../../interfaces";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { slugify } from "../../../../../utils";
import { ConferenceUser } from "../../../../../hooks/useLiveWorkshop";
import { IAgoraRTCRemoteUser, useRemoteUsers } from "agora-rtc-react";

type Props = {
	isWorkshopOwner: boolean;
	workshop: IWorkshop;
	participants: IAgoraRTCRemoteUser[];
};
const LiveWorkshopParticipants = ({ isWorkshopOwner, workshop, participants }: Props) => {
	const user = useSelector(currentUser);
	// const isWorkshopOwner = Boolean(user && user?.mentor?.id === workshop.mentor.id);
	// const remoteUsers = useRemoteUsers();

	return (
		<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full">
			<div className="flex-grow w-full bg-white py-0 p-6">
				<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
				{/* All Participants Component */}
				<div className="grid sm:grid-cols-2 gap-3 h-full w-full bg-white">
					{participants
						.map((participant, index) => {
							return (
								<VideoCallParticipantCard
									user={participant}
									isHost={isWorkshopOwner}
									key={index}
									hideUser={(id) => {
										console.log(id);
										// participants.splice(
										// 	participants.findIndex((username) => username === id),
										// 	1,
										// );
										// displayedParticipants.push()
									}}
								/>
							);
						})
						.slice(0, 8)}
					{participants.filter((u) => u !== null).length < 1 && (
						<div className="flex justify-center items-center">
							{/* <ActivityIndicator size={30} /> */}
							<p className="text-sm text-zinc-300">Nobody has joined yet.</p>
						</div>
					)}
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
