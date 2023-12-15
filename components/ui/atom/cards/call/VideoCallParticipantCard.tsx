import React, { FC, useState } from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import { MicMuted, SpeakingIcon } from "../../icons/svgs/call";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";

type Props = {
	user: IUser;
	isHost: boolean;
	hideUser: (userId: string) => void;
};

const VideoCallParticipantCard: FC<Props> = ({ isHost, user }) => {
	const [muted, setMuted] = useState<boolean>(true);
	const signedInUser = useSelector(currentUser);

	const toggleMute = () => {
		if (Boolean(signedInUser && signedInUser?.id === user.id) || isHost) setMuted(!muted);
	};

	return (
		<div className="h-[200px] bg-white border border-[#70C5A1] p-2 gap-4">
			<div className="flex justify-between items-center">
				<p className="text-sm">
					{signedInUser && signedInUser?.id === user.id
						? "You"
						: user.name.length > 4
						? user.name.slice(0, 4) + "..."
						: user.name}
				</p>
				{muted ? (
					<MicMuted size={15} onClick={toggleMute} className="cursor-pointer" />
				) : (
					<SpeakingIcon size={15} onClick={toggleMute} className="cursor-pointer" />
				)}
			</div>
			<div className="flex justify-center items-center"></div>
			<div className="flex justify-between items-center"></div>
		</div>
	);
};

export default VideoCallParticipantCard;
