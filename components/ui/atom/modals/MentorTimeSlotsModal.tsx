import React, { useState } from "react";
import { PrimaryButton } from "../buttons";
import { useModal } from "../../../../context/modal.context";
import { TimeSlot } from "../../../../interfaces/mentor.interface";

type Props = { next: (slots: TimeSlotSubSet[]) => void };

const MentorTimeSlotsModal = (props: Props) => {
	const { next } = props;
	const initialState: TimeSlotSubSet = {
		endTime: "",
		startTime: "",
	};
	const [timeSlots, setTimeSlots] = useState<TimeSlotSubSet[]>([initialState]);
	const { closeModal } = useModal();
	const handleContinue = () => {
		closeModal();
	};
	return (
		<div className="bg-white h-auto w-[95vw] sm:max-w-lg rounded p-5 inline-block">
			<h1 className="font-medium">Report Mentor</h1>
			<span className="flex flex-col items-start my-3">
				<span className="text-sm text-gray-400">
					Create the time-slots you would be available for mentorship sessions.
				</span>
			</span>

			<div className="flex items-center gap-5 sm:justify-start justify-between w-full">
				<PrimaryButton
					title="Continue"
					onClick={handleContinue}
					// disabled={loading || limitReached || content.trim().length < 1 || content == "" || !content}
					// icon={loading ? <ActivityIndicator /> : <></>}
					className="p-1.5 px-4 rounded flex justify-center"
				/>
				<span className="select-none cursor-pointer text-sm">+ Add new</span>
			</div>
		</div>
	);
};

export default MentorTimeSlotsModal;
type TimeSlotSubSet = Omit<TimeSlot, "isOpen">;
// { day: string } &
