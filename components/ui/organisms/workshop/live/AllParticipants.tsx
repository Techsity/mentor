import React from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import VideoCallParticipantCard from "../../../atom/cards/call/VideoCallParticipantCard";
import { useSelector } from "react-redux";

import { IWorkshop } from "../../../../../interfaces";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";

type Props = {
	participants: IUser[];
	workshop: IWorkshop;
};
const LiveWorkshopParticipants = ({ participants, workshop }: Props) => {
	const user = useSelector(currentUser);

	const isWorkshopOwner = Boolean(user && user?.mentor?.id === workshop.mentor.id);

	return (
		<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full">
			<div className="flex-grow w-full bg-white py-0 p-6">
				<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
				{/* All Participants Component */}
				<div className="grid sm:grid-cols-2 gap-3 h-full w-full bg-white">
					{participants
						.filter((u) => u !== null)
						.map((liveUser, index) => {
							return (
								<VideoCallParticipantCard
									user={liveUser}
									isHost={isWorkshopOwner}
									key={index}
									hideUser={(id) => {
										participants.splice(
											participants.findIndex((u) => u.id === id),
											1,
										);
										// displayedParticipants.push()
									}}
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
