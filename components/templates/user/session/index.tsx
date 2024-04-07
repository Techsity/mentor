import React, { RefObject, useEffect, useMemo, useRef } from "react";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import { CallOutline, EllipsisVertical, MicOff, VideocamOff } from "react-ionicons";
import { ShareScreenIcon } from "../../../ui/atom/icons/svgs/call";
import { IAppointment } from "../../../../interfaces/mentor.interface";
import { Socket } from "socket.io-client";
import { IUser } from "../../../../interfaces/user.interface";
import { MentorshipSessionUser } from "../../../../hooks/useMentorshipSession";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";
import { PrimaryButton } from "../../../ui/atom/buttons";
import Avatar from "../../../ui/atom/common/user/Avatar";

const MentorshipSessionCallTemplate = ({
	appointment,
	stream,
	socket,
	newJoinRequest,
	handleNewJoinRequest,
}: {
	appointment: IAppointment;
	stream: MediaStream | null;
	socket?: Socket;
	newJoinRequest: MentorshipSessionUser | null;
	handleNewJoinRequest: (action: "allow" | "ignore") => void;
}) => {
	const user = useSelector(currentUser);

	const localVideoRef = useRef<HTMLVideoElement>(null);

	const is_mentor = useMemo(() => {
		if (user && appointment) return user.is_mentor && appointment.mentor.id === user.mentor?.id;
		return false;
	}, [appointment, user]);

	useEffect(() => {
		if (stream) if (localVideoRef.current) localVideoRef.current.srcObject = stream;
	}, [stream]);

	return (
		<>
			<div className="w-screen h-screen bg-slate-100 fixed py-6 md:px-12 ">
				<div className="h-full w-full flex flex-col items-center justify-center gap-3 relative pb-[15vh]">
					<div className="w-full h-full bg-black/20 sm:rounded-lg overflow-hidden flex justify-center items-center">
						<ActivityIndicator />
					</div>
					<div className="w-[45vw] sm:w-[35vw] md:w-[25vw] h-[25vh] md:h-[30vh] bg-black/20 rounded-lg overflow-hidden absolute sm:top-auto top-3 sm:bottom-[15%] right-3">
						<div className="h-full w-full">
							<video
								className="w-full h-full scale-x-[-1]"
								muted
								disablePictureInPicture
								controlsList="nodownload"
								autoPlay
								ref={localVideoRef}
								onContextMenu={(e) => e.preventDefault()}
							/>
						</div>
					</div>
					<div className="absolute bottom-[15%] overflow-hidden w-full">
						<Controls
							onEndSession={() => {
								if (socket) {
									console.log({ socket: socket.connected });
								}
							}}
						/>
					</div>
				</div>
			</div>
			{newJoinRequest && (
				<div className="absolute top-10 right-2 animate__animated animate__fadeInRight animate__faster">
					<NewJoinComponent {...{ user: newJoinRequest, onClick: handleNewJoinRequest }} />
				</div>
			)}
		</>
	);
};

const Controls = ({ onEndSession }: { onEndSession: () => void }) => {
	const endSession = async () => {
		console.log("You Ended The Session");
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

const NewJoinComponent = ({
	onClick,
	user,
}: {
	user: MentorshipSessionUser | null;
	onClick: (action: "allow" | "ignore") => void;
}) => {
	return (
		<div className="w-[300px] bg-white backdrop-blur-sm shadow-lg rounded grid gap-2 items-center p-3">
			<div className="flex items-center gap-2">
				<Avatar user={user as any} useName />
				<p className="">{user?.name} is tryng to join this session</p>
			</div>
			<div className="flex justify-between items-center gap-4">
				<PrimaryButton
					onClick={() => onClick("ignore")}
					title="Ignore"
					className="w-full flex justify-center items-center text-sm bg-[#d31] p-1.5"
				/>
				<PrimaryButton
					onClick={() => onClick("allow")}
					title="Allow"
					className="w-full flex justify-center items-center text-sm p-1.5"
				/>
			</div>
		</div>
	);
};

export default MentorshipSessionCallTemplate;
