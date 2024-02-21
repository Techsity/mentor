import React, { useRef } from "react";
import { ICourse } from "../../../../../../interfaces";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import classNames from "classnames";
import { formatTime } from "../../../../../../utils";
import { BackwardIcon, ForwardIcon, PauseICon, PlayIcon } from "../../../../atom/icons/video";
import useVideo from "../../../../../../hooks/media/useVideo";

const VideoComponent = ({ course, loading }: { course: ICourse; loading?: boolean }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
	const poster =
		"https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg";
	const {
		isPlaying,
		progress,
		currentTime,
		duration,
		handleError,
		handleLoadedMetadata,
		handleSeekForward,
		handleSeekPrev,
		handleTimeUpdate,
		handleVolumeChange,
		isLoading,
		togglePlay,
	} = useVideo(videoRef);

	return (
		<div className="flex-grow relative mb-6">
			<div className="lg:max-w-[65dvw] w-full group overflow-hidden relative">
				<div className={classNames("relative w-full h-[400px] bg-black/10 backdrop-blur-sm")}>
					{isLoading && (
						<div className="absolute top-0 left-0 bg-black/20 z-10 h-full w-full flex justify-center items-center">
							<ActivityIndicator color="white" size={50} className="border-[.3em]" />
						</div>
					)}
					{loading ? (
						<div className="bg-zinc-100 absolute top-0 left-0 h-full w-full animate__animated animate__fadeIn animate__infinite flex justify-center">
							<div className="mx-auto flex items-center justify-center">
								<ActivityIndicator color="black" size={50} className="border-[.3em]" />
							</div>
						</div>
					) : (
						<>
							<div className="absolute top-0 left-0 w-full h-full">
								<video
									ref={videoRef}
									src={videoUrl}
									className="w-full h-full"
									// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
									onLoadedMetadata={handleLoadedMetadata}
									onError={handleError}
									title={course.title}
									poster={poster} // Default image
									onTimeUpdate={handleTimeUpdate}
									onVolumeChange={handleVolumeChange}
									autoPlay={false}
									onContextMenu={(e) => e.preventDefault()} //Disable right click
								/>
							</div>
							<div className="absolute bottom-0 left-0 transform bg-black/10 backdrop-blur-sm p-2 w-full gap-2 hidden group-hover:grid animate__animated animate__fadeIn animate__fastest z-20">
								<div className="w-full h-1 bg-white rounded-md relative">
									<div
										className="h-full bg-[#FF0000] rounded-md absolute"
										style={{ width: `${progress}%` }}>
										<div className="absolute bg-[#FF0000] h-full w-1 p-1 right-0 -top-1 rounded-full" />
									</div>
								</div>
								<div className="flex w-full items-center gap-5 px-6">
									<button
										onClick={togglePlay}
										className="bg-transparent border-none text-white cursor-pointer mr-4">
										{!isPlaying ? (
											<PlayIcon
												size={25}
												className="animate__animated animate__rotateIn animate__fastest"
											/>
										) : (
											<PauseICon
												size={25}
												className="animate__animated animate__rotateIn animate__fastest"
											/>
										)}
									</button>
									<div className="flex gap-2 items-center">
										<BackwardIcon size={25} onClick={handleSeekPrev} />
										<ForwardIcon size={25} onClick={handleSeekForward} />
									</div>
									<span className="text-white text-xs">
										{formatTime(currentTime)} / {formatTime(duration)}
									</span>
								</div>
								{/* <input
									type="range"
									min="0"
									max="1"
									step="0.01"
									value={volume}
									onChange={handleVolumeChange}
									className="flex-grow h-2 bg-gray-500 rounded-md"
								/> */}

								{/* Add more custom controls as needed */}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoComponent;
