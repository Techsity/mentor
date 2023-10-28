import React, { Dispatch, SetStateAction } from "react";
import { BackwardIcon, ForwardIcon, PlayIcon } from "../../../atom/icons/video";

const VideoControls = ({
	setVideoDuration,
	handlePlay,
	videoDuration,
	videoProgress,
	handleBackward,
	handleForward,
}: {
	videoDuration: string;
	videoProgress: string;
	setVideoDuration: Dispatch<SetStateAction<string>>;
	handlePlay: any;
	handleBackward: (time?: number) => void;
	handleForward: (time?: number) => void;
}) => {
	return (
		<>
			<div className="hiddend group-hover:visible px-10 flex items-center justify-between animate__animated animate__fadeIn animate__faster duration-300 absolute bottom-0 left-0 w-full backdrop-blur-lg bg-white/40 h-[15%]">
				<div className="flex items-center gap-3 relative w-full">
					<input
						type="range"
						className="bg-[#d31119] w-full h-1 absolute -top-5 appearance-none"
					/>
					<PlayIcon size={26} onClick={handlePlay} />
					<BackwardIcon size={26} />
					<ForwardIcon size={26} />
					<span className="text-white text-sm">
						{videoProgress} / {videoDuration}
					</span>
				</div>
			</div>
		</>
	);
};

export default VideoControls;
