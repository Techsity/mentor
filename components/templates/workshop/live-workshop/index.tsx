import React, { useRef, useState } from "react";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/features/authSlice";
import workshops from "../../../../data/workshops";
import { dummyUsers } from "../../../../data/user";

const LiveworkshopTemplate = () => {
	const [hasMediaAccess, setHasMediaAccess] = useState<boolean>(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const user = useSelector(currentUser);
	const workshop = workshops[0];
	const usersInCall = dummyUsers;

	const [showParticipants, setShowParticipants] = useState<boolean>(false);
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
			<div className="flex justify-between item-center px-10 lg:px-0">
				<div className="flex gap-5 items-center text-sm">
					<h1 className="font-medium">Live Workshop</h1>
					<p className="text-[#00AD74]">
						{workshop.mentor.user?.name} ({workshop.title})
					</p>
				</div>
				<PrimaryButton className="bg-[#FF2800] px-6 p-2" title="End Session" />
			</div>
			<br />

			<div className="relative h-[65dvh] md:h-[70dvh] min-w-screen z-20 flex items-center w-full">
				{/* Left Participants Pane */}
				<div className={`duration-300 z-30 absolute w-full h-full max-w-[40%] right-0`}>
					<div className="relative w-full h-full flex justify-end items-center">
						{!showParticipants && (
							<div className={`absolute duration-300 animate__animated animate__fadeIn`}>
								{/* Pane Controller */}
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
						)}

						<div
							className={`relative w-full h-full flex items-center animate__animated animate__fastest ${
								showParticipants ? "animate__slideInRight" : "animate__slideOutRight"
							}`}>
							<svg
								className="absolute -left-16 cursor-pointer"
								onClick={() => setShowParticipants(!showParticipants)}
								width="80"
								height="94"
								viewBox="0 0 80 94"
								fill="none">
								<g filter="url(#filter0_d_1660_1735)">
									<path
										d="M28 51C28 30.0132 45.0132 13 66 13H80V89H66C45.0132 89 28 71.9868 28 51Z"
										fill="white"
									/>
								</g>
								<path
									d="M56.4358 64.8862C57.0549 64.8862 57.674 64.6581 58.1628 64.1694L69.6656 52.6666C70.1201 52.2067 70.375 51.5861 70.375 50.9395C70.375 50.2929 70.1201 49.6724 69.6656 49.2125L58.1628 37.7097C57.2178 36.7647 55.6537 36.7647 54.7087 37.7097C53.7638 38.6547 53.7638 40.2188 54.7087 41.1638L64.4845 50.9395L54.7087 60.7153C53.7638 61.6602 53.7638 63.2244 54.7087 64.1694C54.9309 64.4024 55.1992 64.5866 55.4966 64.7101C55.794 64.8335 56.1139 64.8935 56.4358 64.8862Z"
									fill="#FFB100"
								/>
								<defs>
									<filter
										id="filter0_d_1660_1735"
										x="0"
										y="0"
										width="80"
										height="94"
										filterUnits="userSpaceOnUse"
										colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="BackgroundImageFix" />
										<feColorMatrix
											in="SourceAlpha"
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="hardAlpha"
										/>
										<feMorphology
											radius="4"
											operator="erode"
											in="SourceAlpha"
											result="effect1_dropShadow_1660_1735"
										/>
										<feOffset dx="-19" dy="-4" />
										<feGaussianBlur stdDeviation="6.5" />
										<feComposite in2="hardAlpha" operator="out" />
										<feColorMatrix
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
										/>
										<feBlend
											mode="normal"
											in2="BackgroundImageFix"
											result="effect1_dropShadow_1660_1735"
										/>
										<feBlend
											mode="normal"
											in="SourceGraphic"
											in2="effect1_dropShadow_1660_1735"
											result="shape"
										/>
									</filter>
								</defs>
							</svg>
							<div className="overflow-hidden overflow-y-auto hide-scroll-bar bg-white w-full h-full">
								{/* Participants */}
								<div className="flex-grow w-full bg-white p-6">
									<h1 className="text-[#bebebe] text-sm text-left mb-5">All Participants</h1>
									<div className="grid grid-cols-2 gap-3 h-full w-full bg-white">
										{/* Each Participants Component */}
										{/* Mentor */}
										<div className="h-[200px] bg-white border border-[#70C5A1] p-2 flex flex-col items-center justify-center gap-4">
											<div className=""></div>
										</div>
										{/* Others */}
										{usersInCall
											.map((dummy, index) => {
												return (
													<div
														key={index}
														className="h-[200px] bg-white border border-[#70C5A1] p-2 flex flex-col items-center justify-center gap-4">
														<div className="">{dummy.name.slice(0, 4)}....</div>
													</div>
												);
											})
											.slice(0, 7)}
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
