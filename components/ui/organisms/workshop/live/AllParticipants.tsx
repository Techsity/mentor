import React from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import VideoCallParticipantCard from "../../../atom/cards/call/VideoCallParticipantCard";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import { IWorkshop } from "../../../../../interfaces";

type Props = {
	participants: IUser[];
	workshop: IWorkshop;
};
const LiveWorkshopParticipants = ({ participants, workshop }: Props) => {
	const displayedParticipants: IUser[] = participants.slice(0, 8);
	const user = useSelector(currentUser);
	const isWorkshopOwner = Boolean(user && user?.mentor?.id === workshop.mentor.id);

	return (
		<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full">
			<div className="flex-grow w-full bg-white py-0 p-6">
				<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
				<div className="grid sm:grid-cols-2 gap-3 h-full w-full bg-white">
					{/* All Participants Component */}
					{displayedParticipants
						.filter((u) => u !== null)
						.map((dummy, index) => {
							return (
								<VideoCallParticipantCard
									user={dummy}
									isHost={isWorkshopOwner}
									key={index}
									hideUser={(id) => {
										displayedParticipants.splice(
											displayedParticipants.findIndex((u) => u.id === id),
											1,
										);
										// displayedParticipants.push()
									}}
								/>
							);
						})}
					<h1 className="text-[#094B10] text-sm text-left mb-5 select-none cursor-pointer font-medium">
						View all {participants.length} participants
					</h1>
				</div>
			</div>
		</div>
	);
};

export default LiveWorkshopParticipants;
