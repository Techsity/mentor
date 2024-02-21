import React, { RefObject, useCallback, useEffect, useId, useState } from "react";
import { toast } from "react-toastify";

const useVideo = (videoRef: RefObject<HTMLVideoElement>) => {
	const toastId = useId();

	// const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const currentVideo = videoRef.current;

	const handleTimeUpdate = useCallback(() => {
		if (currentVideo) setCurrentTime(currentVideo.currentTime);
	}, [currentVideo?.currentTime]);

	const handleLoadedMetadata = (e?: any) => {
		if (e) setDuration(Number(e.target.duration));
		else setDuration(Number(currentVideo?.duration));
	};

	const togglePlay = useCallback(() => {
		if (currentVideo)
			if (currentVideo.paused) currentVideo.play();
			else currentVideo.pause();
		// setIsPlaying((p) => !p);
	}, [currentVideo?.paused]);

	const handleVolumeChange = (e: any) => {
		// Ensure the volume is a valid number
		const newVolume = parseFloat(e.target.value);
		if (!isNaN(newVolume) && isFinite(newVolume)) setVolume(newVolume);
	};

	const handleError = () => {
		toast.error("An error occured while loading video. Please refresh page.", { toastId, theme: "light" });
	};

	const handleSeekPrev = () => {
		if (currentVideo) {
			const seekDuration = 10; // Seek 10 seconds backward
			const newTime = Math.max(0, currentVideo.currentTime - seekDuration);
			currentVideo.currentTime = newTime;
		}
	};

	const handleSeekForward = () => {
		if (currentVideo) {
			const seekDuration = 10; // Seek 10 seconds forward
			const newTime = Math.min(currentVideo.duration, currentVideo.currentTime + seekDuration);
			currentVideo.currentTime = newTime;
		}
	};

	const handleProgress = () => setIsLoading(true);
	const handleWaiting = () => setIsLoading(true);
	const handlePlaying = () => setIsLoading(false);

	useEffect(() => {
		if (currentVideo) {
			currentVideo.addEventListener("progress", handleProgress);
			currentVideo.addEventListener("waiting", handleWaiting);
			currentVideo.addEventListener("playing", handlePlaying);

			return () => {
				currentVideo.removeEventListener("progress", handleProgress);
				currentVideo.removeEventListener("waiting", handleWaiting);
				currentVideo.removeEventListener("playing", handlePlaying);
			};
		}
	}, [currentVideo]);
	const progress = (currentTime / duration) * 100;
	const isPlaying = !currentVideo?.paused;

	return {
		volume,
		progress,
		isPlaying,
		currentTime,
		duration,
		isLoading,
		currentVideo,
		handleTimeUpdate,
		handleLoadedMetadata,
		togglePlay,
		handleVolumeChange,
		handleError,
		handleSeekPrev,
		handleSeekForward,
	};
};

export default useVideo;
