import React, { useRef, useState } from "react";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/features/authSlice";
import workshops from "../../../../data/workshops";
import { dummyUsers } from "../../../../data/user";
import { IUser } from "../../../../interfaces/user.interface";
import VideoCallParticipantCard from "../../../ui/atom/cards/call/VideoCallParticipantCard";

const LiveworkshopTemplate = () => {
	const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const user = useSelector(currentUser);
	const workshop = workshops[0];

	const usersInCall: IUser[] = [user as IUser, ...dummyUsers];
	const displayedParticipants: IUser[] = usersInCall.slice(0, 8);

	const [showParticipants, setShowParticipants] = useState<boolean>(false);
	const isWorkshopOwner = Boolean(user && user?.mentor?.id === workshop.mentor.id);
	// useEffect(() => {
	// 	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// 		navigator.mediaDevices
	// 			.getUserMedia({
	// 				audio: { echoCancellation: true, noiseSuppression: true },
	// 				video: { width: 640, height: 480, frameRate: { ideal: 15, max: 30 } },
	// 			})
	// 			.then((stream) => {
	// 				if (videoRef.current) {
	// 					videoRef.current.srcObject = stream;
	// 				}
	// 				setHasMediaAccess(true);
	// 			})
	// 			.catch((error) => {
	// 				setHasMediaAccess(false);
	// 				console.error("Error accessing microphone and camera:", error.message);
	// 			});
	// 	} else {
	// 		setHasMediaAccess(false);
	// 		console.error("getUserMedia is not supported in this browser");
	// 	}
	// 	return () => {
	// 		setHasMediaAccess(false);
	// 	};
	// }, []);

	return (
		<div className="mx-auto py-6 max-w-[92dvw] w-full min-h-[200dvh] overflow-hidden">
			{/* Top Section */}
			<div className="flex sm:flex-row flex-col gap-5 justify-end sm:justify-between sm:item-center sm:px-10 lg:px-0">
				<div className="flex gap-5 items-center text-sm">
					<h1 className="font-medium">Live Workshop</h1>
					<p className="text-[#00AD74]">
						{workshop.mentor.user?.name} ({workshop.title})
					</p>
				</div>
				{isWorkshopOwner && <PrimaryButton className="bg-[#FF2800] px-6 p-2" title="End Session" />}
			</div>
			<br />

			<div className="relative h-[65dvh] md:h-[70dvh] min-w-screen z-20 flex items-center w-full">
				{/* Left Participants Pane */}
				<div
					className={`duration-300 z-30 absolute w-full h-full max-w-[80%] xs:max-w-[55%] sm:max-w-[50%] lg:max-w-[40%] xl:max-w-[35%] right-0`}>
					<div className="relative w-full h-full flex justify-end items-center">
						{/* Pane Controller */}
						<div
							className={`${
								showParticipants ? "hidden" : ""
							} md:-right-10 absolute animate__animated animate__slideInLeft`}>
							<div
								onClick={() => setShowParticipants(!showParticipants)}
								className={`duration-300 bg-white group top-44 p-5 rounded-tl-full rounded-bl-full cursor-pointer select-none ${""}`}>
								<div className="flex items-center gap-3 w-full">
									<svg width="17" height="28" viewBox="0 0 17 28" fill="none">
										<path
											d="M13.9392 0.000476837C13.3201 0.000476837 12.701 0.22858 12.2122 0.717367L0.709395 12.2201C0.254888 12.68 0 13.3006 0 13.9472C0 14.5938 0.254888 15.2143 0.709395 15.6742L12.2122 27.177C13.1572 28.122 14.7213 28.122 15.6663 27.177C16.6112 26.232 16.6112 24.6679 15.6663 23.7229L5.89053 13.9472L15.6663 4.17146C16.6112 3.22647 16.6112 1.66235 15.6663 0.717367C15.4441 0.484272 15.1758 0.30011 14.8784 0.176666C14.581 0.0532227 14.2611 -0.00678825 13.9392 0.000476837Z"
											fill="#FFB100"
										/>
									</svg>
									{!showParticipants && (
										<span className="md:flex w-full hidden text-sm text-[#A3A6A7] group-hover:text-black duration-300">
											All Participants
										</span>
									)}
								</div>
							</div>
						</div>
						{/* Participants */}
						<div
							className={`relative w-full h-full flex items-center animate__animated animate__fastest ${
								showParticipants ? "animate__slideInRight" : "animate__slideOutRight"
							}`}>
							<div
								onClick={() => setShowParticipants(!showParticipants)}
								className={`absolute duration-300 bg-white group -left-12 p-5 px-6 rounded-tl-full rounded-bl-full cursor-pointer select-none ${
									!showParticipants ? "hidden" : ""
								}`}>
								<div className="flex items-center gap-3 w-full">
									<svg width="17" height="28" viewBox="0 0 17 28" fill="none">
										<path
											d="M2.43578 27.8862C3.05491 27.8862 3.67404 27.6581 4.16283 27.1694L15.6656 15.6666C16.1201 15.2067 16.375 14.5861 16.375 13.9395C16.375 13.2929 16.1201 12.6724 15.6656 12.2125L4.16283 0.709716C3.21785 -0.235271 1.65373 -0.235271 0.708741 0.709715C-0.236246 1.6547 -0.236246 3.21882 0.708741 4.16381L10.4845 13.9395L0.708739 23.7153C-0.236248 24.6602 -0.236248 26.2244 0.708739 27.1694C0.930875 27.4024 1.19922 27.5866 1.49661 27.7101C1.79399 27.8335 2.11387 27.8935 2.43578 27.8862Z"
											fill="#FFB100"
										/>
									</svg>
								</div>
							</div>
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
											View all {usersInCall.length} participants
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Conference Call Component */}
				<div className="relative md:max-w-[95%] w-full h-full bg-zinc-100 flex-grow">
					{/* Video */}
					<div className="left-0 bg-zinc-200 w-full h-full"></div>
					{/* Controls */}
					<div className="absolute bottom-0 left-0 w-full p-5 bg-black/50 backdrop-blur-sm"></div>
				</div>
			</div>
		</div>
	);
};

export default LiveworkshopTemplate;
