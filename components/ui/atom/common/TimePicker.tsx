import React, { ForwardedRef, RefObject, forwardRef, useCallback, useState } from "react";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "react-ionicons";
import { PrimaryButton } from "../buttons";

export interface ICurrentTime {
	min: string;
	secs: string;
	meridan: "am" | "pm";
}
interface TimePickerProps {
	onChange?: (time: ICurrentTime) => void;
	className?: string;
	closeTimePicker: any;
	initialState?: Partial<ICurrentTime>;
}

const TimePicker = forwardRef(function TimePicker(props: TimePickerProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, onChange, closeTimePicker } = props;

	const initialTime: ICurrentTime = {
		min: "12",
		secs: "00",
		meridan: "am",
	};
	const [currentTime, setCurrentTime] = useState<ICurrentTime>(initialTime);

	const incrementMinute = useCallback(() => {
		setCurrentTime((prev) => {
			const newMin =
				prev.min !== null && parseInt(prev.min) < 12 ? String(parseInt(prev.min) + 1).padStart(2, "0") : "01";
			return { ...prev, min: newMin };
		});
	}, []);

	const decrementMinute = useCallback(() => {
		setCurrentTime((prev) => {
			const newMin =
				prev.min !== null && parseInt(prev.min) > 1 ? String(parseInt(prev.min) - 1).padStart(2, "0") : "12";
			return { ...prev, min: newMin };
		});
	}, []);

	const incrementSeconds = useCallback(() => {
		setCurrentTime((prev) => {
			const newSecs =
				prev.secs !== null && parseInt(prev.secs) < 59
					? String(parseInt(prev.secs) + 1).padStart(2, "0")
					: "00";
			return { ...prev, secs: newSecs };
		});
	}, []);

	const decrementSeconds = useCallback(() => {
		setCurrentTime((prev) => {
			const newSecs =
				prev.secs !== null && parseInt(prev.secs) > 0 ? String(parseInt(prev.secs) - 1).padStart(2, "0") : "59";
			return { ...prev, secs: newSecs };
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
			<div
				ref={ref}
				className={classNames(
					"text-3xl relative z-20 shadow-lg rounded-lg flex items-center flex-col gap-5 max-w-md w-full h-full min-h-[200px] min-w-[300px] bg-white overflow-hidden",
					className,
				)}>
				<div className="bg-[#00D569] w-full h-auto py-5 rounded-tl-lg rounded-tr-lg flex justify-center items-center gap-3 font-semibold">
					<h1 className="">{currentTime.min ? String(currentTime.min).padStart(2, "0") : "00"}</h1>
					<h1 className="">:</h1>
					<h1 className="">{currentTime.secs ? String(currentTime.secs).padStart(2, "0") : "00"}</h1>
					<h1 className="uppercase">{currentTime.meridan}</h1>
				</div>
				<div className="bg-white h-auto py-3 w-full flex justify-between items-center px-10">
					<div className="flex gap-3 flex-col items-center justify-center w-[40%]">
						<ChevronUp cssClasses="cursor-pointer" onClick={incrementMinute} />
						<input
							type="text"
							maxLength={2}
							max={12}
							className="bg-transparent focus:ring-0 outline-none w-full text-center"
							value={currentTime.min || ""}
							onChange={({ target: { value } }) => {
								setCurrentTime((prev) => {
									const updated = { ...prev };
									value = value.replace(/\D/g, "");
									if (value.length >= 2 && parseInt(value) == 0) value = "12";
									if (parseInt(value) > 12) {
										value = String((parseInt(value) % 12) % 24).padStart(2, "0");
										if (parseInt(value) == 0) value = "12";
										updated.meridan = "pm";
									}
									updated.min = value;
									return updated;
								});
							}}
						/>
						<ChevronDown cssClasses="cursor-pointer" onClick={decrementMinute} />
					</div>
					<h1 className="">:</h1>
					<div className="flex gap-3 flex-col items-center justify-center w-[40%]">
						<ChevronUp cssClasses="cursor-pointer" onClick={incrementSeconds} />
						<input
							max={59}
							type="text"
							maxLength={2}
							className="bg-transparent focus:ring-0 outline-none w-full text-center"
							value={currentTime.secs || ""}
							onChange={({ target: { value } }) => {
								setCurrentTime((prev) => {
									const updated = { ...prev };
									value = value.replace(/\D/g, "");
									if (parseInt(value) > 59) {
										value = String(parseInt(value) % 60).padStart(2, "0");
										updated.min = String(parseInt(updated.min) + 1).padStart(2, "0");
										if (parseInt(updated.min) > 12) {
											updated.min = String((parseInt(value) % 12) % 24).padStart(2, "0");
											if (parseInt(updated.min) == 0) value = "12";
											updated.meridan = "pm";
										}
									}
									updated.secs = value;
									return updated;
								});
							}}
						/>
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
