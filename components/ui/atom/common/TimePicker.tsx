import React, { ChangeEvent, useCallback, useState } from "react";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "react-ionicons";
import { PrimaryButton } from "../buttons";

export interface ICurrentTime {
	min: number | null;
	secs: number | null;
	meridan: "am" | "pm";
}
interface TimePickerProps {
	onChange?: (time: ICurrentTime) => void;
	className?: string;
	closeTimePicker: any;
}

const TimePicker = (props: TimePickerProps) => {
	const { className, onChange, closeTimePicker } = props;

	const currentDate = new Date();
	const initialTime: ICurrentTime = {
		min: null,
		secs: null,
		meridan: "am",
	};
	const [currentTime, setCurrentTime] = useState<ICurrentTime>(initialTime);

	const setMinute = useCallback(() => {
		if (currentTime.min && currentTime.min < 12) {
			// increase
		}
		// else set back to 00
	}, []);

	const setSeconds = useCallback(() => {
		if (currentTime.min && currentTime.min < 12) {
			// increase
		}
		// else set back to 00
	}, []);

	const setTimeFrame = () => {
		closeTimePicker();
		if (onChange) {
			onChange(currentTime);
			return;
		}
		console.log(currentTime);
	};

	return (
		<>
			{/* <div className="z-40 absolute top-0 left-0 bg-[#0000001A] backdrop-blur-sm w-full min-w-screen h-full min-h-screen" /> */}
			<div
				className={classNames(
					"text-3xl relative z-40 shadow-lg rounded-lg flex items-center flex-col gap-5 max-w-md w-full h-full min-h-[300px] min-w-[300px] bg-white",
					className,
				)}>
				<div className="bg-[#00D569] w-full h-auto py-6 rounded-tl-lg rounded-tr-lg flex justify-center items-center gap-3 font-semibold">
					<h1 className="">
						{currentTime.min ? currentTime.min : "00"}
					</h1>
					<h1 className="">:</h1>
					<h1 className="">
						{currentTime.secs ? currentTime.secs : "00"}
					</h1>
					<h1 className="uppercase">{currentTime.meridan}</h1>
				</div>
				<div className="bg-white h-auto py-3 w-full flex justify-between items-center px-10">
					<div className="flex gap-3 flex-col items-center justify-center">
						<ChevronUp cssClasses="cursor-pointer" />
						<p className="bg-zinc-100 p-1">
							{currentTime.min ? currentTime.min : "00"}
						</p>
						<ChevronDown cssClasses="cursor-pointer" />
					</div>
					<h1 className="">:</h1>
					<div className="flex gap-3 flex-col items-center justify-center">
						<ChevronUp cssClasses="cursor-pointer" />
						<p className="bg-zinc-100 p-1">
							{currentTime.secs ? currentTime.secs : "00"}
						</p>
						<ChevronDown cssClasses="cursor-pointer" />
					</div>
					<div className="flex gap-3 flex-col items-center justify-center">
						<h1 className="">AM</h1>
						<h1 className="">PM</h1>
					</div>
				</div>
				<div className="flex items-center gap-6 my-5 text-[18px]">
					<div
						onClick={closeTimePicker}
						className="px-8 p-1 hover:bg-rose-100 duration-300 cursor-pointer select-none">
						Cancel
					</div>
					<div className="flex items-center">
						<PrimaryButton
							title="OK"
							className="px-8 p-1"
							onClick={setTimeFrame}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default TimePicker;
