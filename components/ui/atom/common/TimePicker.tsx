import React, { ForwardedRef, RefObject, forwardRef, useCallback, useState } from "react";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "react-ionicons";
import { PrimaryButton } from "../buttons";

export interface ICurrentTime {
	hr: number | null;
	min: number | null;
	meridan: "am" | "pm";
}
interface TimePickerProps {
	onChange?: (time: ICurrentTime) => void;
	className?: string;
	closeTimePicker: any;
}

const TimePicker = forwardRef(function TimePicker(props: TimePickerProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, onChange, closeTimePicker } = props;

	const currentDate = new Date();
	const initialTime: ICurrentTime = {
		hr: 12,
		min: 0,
		meridan: currentDate.getHours() >= 12 ? "pm" : "am",
	};
	const [currentTime, setCurrentTime] = useState<ICurrentTime>(initialTime);

	const incrementMinute = useCallback(() => {
		setCurrentTime((prev) => {
			const newMin = prev.hr !== null && prev.hr < 12 ? prev.hr + 1 : 1;
			return { ...prev, hr: newMin };
		});
	}, []);

	const decrementMinute = useCallback(() => {
		setCurrentTime((prev) => {
			const newMin = prev.hr !== null && prev.hr > 1 ? prev.hr - 1 : 12;
			return { ...prev, hr: newMin };
		});
	}, []);

	const incrementSeconds = useCallback(() => {
		setCurrentTime((prev) => {
			const newSecs = prev.min !== null && prev.min < 59 ? prev.min + 1 : 0;
			return { ...prev, min: newSecs };
		});
	}, []);

	const decrementSeconds = useCallback(() => {
		setCurrentTime((prev) => {
			const newSecs = prev.min !== null && prev.min > 0 ? prev.min - 1 : 59;
			return { ...prev, min: newSecs };
		});
	}, []);

	const toggleMeridian = () => {
		setCurrentTime((prev) => ({
			...prev,
			meridan: prev.meridan === "am" ? "pm" : "am",
		}));
	};
	const setTimeFrame = () => {
		closeTimePicker();
		if (onChange) {
			onChange(currentTime);
			return;
		}
	};
	return (
		<>
			{/* <div className="z-40 absolute top-0 left-0 bg-[#0000001A] backdrop-blur-sm w-full min-w-screen h-full min-h-screen" /> */}
			<div
				ref={ref}
				className={classNames(
					"text-3xl relative z-20 shadow-lg rounded-lg flex items-center flex-col gap-5 max-w-md w-full h-full min-h-[200px] min-w-[300px] bg-white",
					className,
				)}>
				<div className="bg-[#00D569] w-full h-auto py-5 rounded-tl-lg rounded-tr-lg flex justify-center items-center gap-3 font-semibold">
					<h1 className="">{currentTime.hr ? String(currentTime.hr).padStart(2, "0") : "00"}</h1>
					<h1 className="">:</h1>
					<h1 className="">{currentTime.min ? String(currentTime.min).padStart(2, "0") : "00"}</h1>
					<h1 className="uppercase">{currentTime.meridan}</h1>
				</div>
				<div className="bg-white h-auto py-3 w-full flex justify-between items-center px-10">
					<div className="flex gap-3 flex-col items-center justify-center">
						<ChevronUp cssClasses="cursor-pointer" onClick={incrementMinute} />
						<p className="">{currentTime.hr ? String(currentTime.hr).padStart(2, "0") : "00"}</p>
						<ChevronDown cssClasses="cursor-pointer" onClick={decrementMinute} />
					</div>
					<h1 className="">:</h1>
					<div className="flex gap-3 flex-col items-center justify-center">
						<ChevronUp cssClasses="cursor-pointer" onClick={incrementSeconds} />
						<p className="">{currentTime.min ? String(currentTime.min).padStart(2, "0") : "00"}</p>
						<ChevronDown cssClasses="cursor-pointer" onClick={decrementSeconds} />
					</div>
					<div
						className="flex gap-3 flex-col items-center justify-center cursor-pointer select-none"
						onClick={toggleMeridian}>
						<h1
							className={classNames(
								currentTime.meridan === "am" ? "bg-[#00D5693A]" : "",
								"p-2 rounded duration-300",
							)}>
							AM
						</h1>
						<h1
							className={classNames(
								currentTime.meridan === "pm" ? "bg-[#00D5693A]" : "",
								"p-2 rounded duration-300",
							)}>
							PM
						</h1>
					</div>
				</div>
				<div className="flex items-center gap-6 my-5 text-[18px]">
					<div
						onClick={closeTimePicker}
						className="px-8 p-1 hover:bg-rose-100 duration-300 cursor-pointer select-none">
						Cancel
					</div>
					<div className="flex items-center">
						<PrimaryButton title="OK" className="px-8 p-1" onClick={setTimeFrame} />
					</div>
				</div>
			</div>
		</>
	);
});

export default TimePicker;
