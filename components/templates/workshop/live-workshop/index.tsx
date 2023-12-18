/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, FC, useState } from "react";
import { PrimaryButton } from "../../../ui/atom/buttons";
import LiveWorkshopParticipants from "../../../ui/organisms/workshop/live/AllParticipants";
import { IWorkshop } from "../../../../interfaces";
import ConferenceCallComponent from "../../../ui/organisms/workshop/live/ConferenceCallComponent";
import { slugify } from "../../../../utils";
import useLiveWorkshop from "../../../../hooks/useLiveWorkshop";
import CustomTextInput from "../../../ui/atom/inputs/CustomTextInput";
import { IUser } from "../../../../interfaces/user.interface";
import { useSelector } from "react-redux";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";
import { currentUser } from "../../../../redux/reducers/features/authSlice";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";
import CustomTextArea from "../../../ui/atom/inputs/CustomTextArea";

const LiveworkshopTemplate = () => {
	const user = useSelector(currentUser);
	const { currentUserIsWorkshopOwner, participants, showParticipants, workshop, setShowParticipants } =
		useLiveWorkshop();

	return (
		<div className="mx-auto py-6 max-w-[92dvw] w-full min-h-[100dvh] overflow-hidden">
			{/* Top Section */}
			<LiveWorkshopTopSection currentUserIsWorkshopOwner={currentUserIsWorkshopOwner} workshop={workshop} />
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
							{/* Participants */}
							<LiveWorkshopParticipants
								participants={participants.filter(
									(participant) =>
										slugify(participant.username) !== slugify(workshop.mentor.user.name),
								)}
								workshop={workshop}
							/>
						</div>
					</div>
				</div>
				{/* Conference Call Component */}
				<ConferenceCallComponent
					workshop={workshop}
					participants={participants}
					isWorkshopOwner={currentUserIsWorkshopOwner}
					callHost={participants.find(
						(participant) => slugify(participant.username) === slugify(workshop.mentor.user.name),
					)}
				/>
			</div>
			{/* Chat Section */}
			<div className="mt-5">
				<LiveWorkshopChatSection {...{ user: user as IUser }} />
			</div>
		</div>
	);
};

const LiveWorkshopChatSection = ({ user }: { user: IUser }) => {
	type LiveWorkshopChat = {
		content: string;
		user: IUser;
	};

	const emptyChat: LiveWorkshopChat = {
		content: "",
		user,
	};
	const [loading, setLoading] = useState<boolean>(false);
	const [chats, setChats] = useState<LiveWorkshopChat[]>([]);
	const [newChat, setNewChat] = useState<LiveWorkshopChat>(emptyChat);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setNewChat((prevReview) => ({
			...prevReview,
			content: e.target.value,
		}));

	const addNewReview = () => {
		if (user) {
			if (newChat?.content) {
				setLoading(true);
				setTimeout(function () {
					setChats((prev) => {
						return [...prev, newChat];
					});
					setLoading(false);
					setNewChat(emptyChat);
				}, 1000);
				// Api Logic
			}
		} else {
			toast.error("Please Login", ToastDefaultOptions({ id: "error" }));
		}
	};

	return (
		<>
			<div className="flex justify-between items-center gap-5 p-3 md:px-6 bg-zinc-200">
				<h1 className="flex-grow text-sm">Live Chat</h1>
				<h1 className="w-full max-w-[30%] text-sm md:block hidden">Resource Center</h1>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex-grow">
					<section className="animate__animated animate__fadeIn">
						<form
							onSubmit={(e) => e.preventDefault()}
							className="border border-[#70C5A1] bg-transparent duration-300 my-4 flex sm:flex-row flex-col sm:items-center sm:px-3">
							<input
								name=""
								id=""
								placeholder="Ask a question or leave a comment..."
								value={newChat?.content}
								onChange={handleChange}
								className="outline-none focus:ring-0 placeholder:italic placeholder:text-sm font-[300] placeholder:text[#BEBEBE] p-4 px-6 flex-grow"
							/>
							<PrimaryButton
								type="submit"
								onClick={addNewReview}
								title={!loading ? "Send" : ""}
								className="h-full p-2 flex items-center justify-center text-center w-full lg:max-w-[15%] md:max-w-[20%]"
								icon={loading ? <ActivityIndicator /> : null}
							/>
						</form>
						{chats
							.map((message, i) => (
								<div
									key={i}
									className="w-full animate__animated animate__fadeIn flex justify-between lg:flex-row flex-col lg:items-center gap-5 border p-3 border-[#70C5A1] bg-transparent duration-300 min-h-[45px] my-4">
									<p className="flex-grow w-full text-sm tracking-tight font-[300] lg:max-w-lg break-words">
										{message.content}
									</p>
									<div className="lg:border-l-2 lg:px-5 border-[#A3A6A7] w-[25%]">
										<div className="flex lg:flex-col items-center lg:items-start gap-3">
											<img
												src={
													(message.user && message.user.avatar) || "/assets/images/avatar.png"
												}
												loading="lazy"
												alt="message"
												className="w-10 h-10 rounded-full"
											/>
											<p className="text-sm">
												{message.user &&
													message.user.name.split(" ")[0] +
														" " +
														message.user.name.split(" ")[1]}
											</p>
										</div>
									</div>
								</div>
							))
							.reverse()}
					</section>
				</div>
				<div className="w-full max-w-[30%] text-sm md:block hidden"></div>
			</div>
		</>
	);
};

const LiveWorkshopTopSection: FC<{ workshop: IWorkshop; currentUserIsWorkshopOwner: boolean }> = ({
	currentUserIsWorkshopOwner,
	workshop,
}) => (
	<div className="flex sm:flex-row flex-col gap-5 justify-end sm:justify-between sm:item-center sm:px-10 lg:px-0">
		<div className="flex gap-5 items-center text-sm">
			<h1 className="font-medium">Live Workshop</h1>
			<p className="text-[#00AD74]">
				{workshop.mentor.user?.name} ({workshop.title})
			</p>
		</div>
		{currentUserIsWorkshopOwner && <PrimaryButton className="bg-[#FF2800] px-6 p-2" title="End Session" />}
	</div>
);
export default LiveworkshopTemplate;
