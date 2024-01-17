import { AgoraRTCReactError } from "agora-rtc-react";
import React, { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../../../atom/buttons";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";

const ChannelEntrance = ({
	next,
	error,
	loading,
	retry,
	onErrorJoin,
}: {
	next: (channel: string) => void;
	error: AgoraRTCReactError | null;
	loading: boolean;
	onErrorJoin: () => void;
	retry: number;
}) => {
	const [countdown, setCountdown] = useState<number>(retry / 1000);
	const inputRef = useRef<HTMLInputElement>(null);
	console.log(JSON.stringify(error));
	// dujhedjkgfju
	const handleJoin = () => {
		if (inputRef.current)
			if (inputRef.current.value) {
				next(inputRef.current.value);
			}
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (error) {
			onErrorJoin();
			if (retry > 0)
				intervalId = setInterval(() => {
					setCountdown((prevCountdown) => prevCountdown - 1);
				}, 1000);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [error, retry, onErrorJoin]);

	const formattedErr = error?.message.includes("invalid token")
		? "Invalid channel ID"
		: error?.message.includes("INVALID_PARAMS")
		? "Invalid channel ID"
		: error?.message;

	return (
		<div className="w-screen h-screen overflow-hidden">
			<div className="flex flex-col gap-2 max-w-lg m-auto justify-center items-center h-full w-full relative">
				<p className="flex w-full justify-start text-rose-500">{formattedErr}</p>
				<CustomTextInput placeholder="Enter Channel ID" ref={inputRef} />
				{error && countdown !== 0 ? (
					<span className="text-sm">Try again in a few seconds</span>
				) : (
					// <>Try again {countdown <= 1 ? "a second" : countdown + "seconds"}</>
					<PrimaryButton
						title={loading ? "" : "Join"}
						icon={loading ? <ActivityIndicator color="#ffffff" size={20} /> : null}
						className="w-full p-4 flex justify-center items-center"
						onClick={handleJoin}
						disabled={loading}
					/>
				)}
			</div>
		</div>
	);
};

export default ChannelEntrance;
