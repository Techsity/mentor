import React, { FC, useEffect, useMemo, useState } from "react";
import {
	FetchArgs,
	useJoin,
	useLocalCameraTrack,
	useLocalMicrophoneTrack,
	useNetworkQuality,
	usePublish,
	useRTCClient,
} from "agora-rtc-react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import workshops from "../../../../data/workshops";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";
import { IWorkshop } from "../../../../interfaces";
import { PrimaryButton } from "../../../ui/atom/buttons";
import { client } from "../../../../hooks/agora";
import ChannelEntrance from "../../../ui/organisms/workshop/live/ChannelEntrance";
import { networkLabels } from "../../../../constants";
import { useRouter } from "next/router";

const LiveWorkshopParticipants = dynamic(() => import("../../../ui/organisms/workshop/live/AllParticipants"), {
	ssr: false,
});
const ConferenceCallComponent = dynamic(() => import("../../../ui/organisms/workshop/live/ConferenceCallComponent"), {
	ssr: false,
});

const LiveWorkshopTemplate = () => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const workshop = workshops[0];
	const currentUserIsWorkshopOwner = useMemo(() => {
		return Boolean(user && user?.mentor?.id === workshop.mentor.id);
	}, [user, workshop]);
	const appId = String(process.env.NEXT_PUBLIC_AGORA_APP_ID);
	const rtcClient = useRTCClient(client);
	const [activeConnection, setActiveConnection] = useState<boolean>(false);
	const [showParticipants, setShowParticipants] = useState<boolean>(false);
	const [channelName, setChannelName] = useState("");
	const [micOn, setMicOn] = useState<boolean>(false);
	const [cameraOn, setCameraOn] = useState<boolean>(false);

	const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn, { ANS: true, AEC: true });
	const { localCameraTrack } = useLocalCameraTrack(currentUserIsWorkshopOwner && cameraOn, {
		optimizationMode: "motion",
		facingMode: "environment",
	});
	usePublish(currentUserIsWorkshopOwner ? [localMicrophoneTrack, localCameraTrack] : [localMicrophoneTrack]);

	const fetchArgs = {
		appid: appId,
		channel: channelName,
		token: null,
		uid: user?.email.toLowerCase(),
	};

	const { error, isLoading: isJoining } = useJoin(fetchArgs as FetchArgs, activeConnection);
	const networkQuality = useNetworkQuality(client);

	const endSession = async () => {
		console.log("You Exited The Session");
		setActiveConnection(false);
		rtcClient.unpublish();
		rtcClient.leave();
		rtcClient.removeAllListeners();
		router.reload();
	};

	const toggleMute = () => {
		const newAudioState = !micOn;
		setMicOn(newAudioState);
		localMicrophoneTrack?.setEnabled(newAudioState);
		if (!newAudioState) localMicrophoneTrack?.stop();
	};

	const handleToggleCamera = () => {
		const newVideoState = !cameraOn;
		setCameraOn(newVideoState);
		localCameraTrack?.setEnabled(newVideoState);
		if (!newVideoState) localCameraTrack?.stop();
	};

	return activeConnection && !error && !isJoining ? (
		<div className="mx-auto py-6 max-w-[92dvw] w-full min-h-[100dvh] overflow-hidden">
			<label style={{ color: networkLabels[networkQuality.uplinkNetworkQuality].color }}>
				Network Quality: {networkLabels[networkQuality.uplinkNetworkQuality].message}
			</label>
			{/* Top Section */}
			<LiveWorkshopTopSection
				endSession={endSession}
				currentUserIsWorkshopOwner={currentUserIsWorkshopOwner}
				workshop={workshop}
			/>
			<br />
			{/* Conference Section */}
			<div className="relative h-[65dvh] md:h-[70dvh] min-w-screen z-20 flex items-center w-full">
				{/* Left Participants Pane */}
				<div
					className={`duration-300 z-30 absolute w-full h-full max-w-[80%] xs:max-w-[55%] sm:max-w-[50%] lg:max-w-[40%] xl:max-w-[35%] right-0`}>
					<div className="relative w-full h-full flex justify-end items-center">
						{/* Participants Pane Controller */}
						<div
							className={`${
								showParticipants ? "hidden" : ""
							} md:-right-6 absolute animate__animated animate__slideInLeft`}>
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
						<div
							className={`z-30 relative w-full h-full flex items-center animate__animated animate__fastest ${
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
							{/* Participants */}
							<LiveWorkshopParticipants
								{...{
									micOn,
									workshop,
									localMicrophoneTrack,
									toggleMute,
									isWorkshopOwner: currentUserIsWorkshopOwner,
								}}
							/>
						</div>
					</div>
				</div>
				{/* Conference Call Component */}
				<ConferenceCallComponent
					{...{
						micOn,
						cameraOn,
						workshop,
						localMicrophoneTrack,
						localCameraTrack,
						toggleMute,
						handleToggleCamera,
					}}
				/>
			</div>
			{/* Chat Section */}
			<div className="mt-5">
				{/* <LiveWorkshopChatSection {...{ user: user as IUser, currentUserIsWorkshopOwner }} /> */}
			</div>
		</div>
	) : (
		<ChannelEntrance
			next={(c) => {
				if (c) setChannelName(c);
				setActiveConnection(true);
			}}
			error={error}
			onErrorJoin={() => {
				const timeout = setTimeout(function () {
					setActiveConnection(false);
					clearTimeout(timeout);
				}, 10000);
			}}
			retry={10000}
			loading={isJoining}
		/>
	);
};

const LiveWorkshopTopSection: FC<{
	workshop: IWorkshop;
	currentUserIsWorkshopOwner: boolean;
	endSession: () => void;
}> = ({ currentUserIsWorkshopOwner, workshop, endSession }) => (
	<div className="flex sm:flex-row flex-col gap-5 justify-end sm:justify-between sm:item-center sm:px-10 lg:px-0">
		<div className="flex gap-5 items-center text-sm">
			<h1 className="font-medium">Live Workshop</h1>
			<p className="text-[#00AD74]">
				{workshop.mentor.user?.name} ({workshop.title})
			</p>
		</div>
		<PrimaryButton
			onClick={endSession}
			className="bg-[#FF2800] px-6 p-2"
			title={currentUserIsWorkshopOwner ? "End Session" : "Leave"}
		/>
	</div>
);

export default LiveWorkshopTemplate;
