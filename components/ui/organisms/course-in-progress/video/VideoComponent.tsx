import React, { useEffect, useRef, useState } from "react";
import { ICourse } from "../../../../../interfaces";
import ReactPlayer from "react-player/lazy";
import { parseDuration, parseVideoDuration } from "../../../../../utils";
import VideoControls from "./VideoControls";
import useWindowSize from "../../../../../hooks/useWindowSize";

const VideoComponent = (course: ICourse) => {
	const videoUrl = "https://vimeo.com/169599296";
	const [videoDuration, setVideoDuration] = useState<string>("");
	const [videoProgress, setVideoProgress] = useState<number | null>(null);
	const [playing, setPlaying] = useState<boolean>(false);

	const videoPlayerRef = useRef<ReactPlayer>(null);

	return (
		<div className="flex-grow xl:min-h-screen relative xl:-top-24 mt-10 lg:mt-0">
			<div className="lg:max-w-[65dvw] w-full group overflow-hidden">
				<div className="relative bg-zinc-10 w-full min-h-[250px] sm:min-h-[420px]">
					{/* {loading && (
						<div className="flex items-center justify-center text-sm">
							Loading...
						</div>
					)} */}
					<div className="absolute bottom-0 left-0 w-full h-full">
						<ReactPlayer
							ref={videoPlayerRef}
							url={videoUrl}
							height={"100%"}
							width={"100%"}
							playing={playing}
							onDuration={(duration: number) =>
								setVideoDuration(parseVideoDuration(duration))
							}
							onProgress={(progress) => {
								setVideoProgress(progress.played);
							}}
							onEnded={() => setPlaying(false)}
						/>
					</div>
					<VideoControls
						videoDuration={videoDuration ? videoDuration : "00:00"}
						videoProgress={
							videoProgress
								? parseVideoDuration(
										parseInt(
											videoProgress
												.toFixed(2)
												.split(".")
												.join(""),
										),
								  )
								: "00:00:00"
						}
						setVideoDuration={setVideoDuration}
						handleBackward={() => null}
						handleForward={() => null}
						handlePlay={() => setPlaying(!playing)}
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoComponent;
