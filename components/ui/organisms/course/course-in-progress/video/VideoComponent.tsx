import React, { useCallback, useEffect, useRef, useState } from "react";
import { ICourse } from "../../../../../../interfaces";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import classNames from "classnames";
import { formatTime } from "../../../../../../utils";

const VideoComponent = ({
  course,
  loading,
}: {
  course: ICourse;
  loading?: boolean;
}) => {
  // const videoUrl = "https://player.vimeo.com/video/166240148";
  // const videoUrl = "https://www.youtube.com/embed/07BTQBu5oM4";
  const videoUrl =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoRef = useRef<HTMLVideoElement | any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentVideo = videoRef.current;

  const handleTimeUpdate = useCallback(() => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      setCurrentTime(currentVideo.currentTime);
    }
  }, []);

  useEffect(() => {
    if (currentVideo) {
      // Ensure the volume is a valid number between 0 and 1
      const validVolume = Math.max(0, Math.min(volume, 1));
      currentVideo.volume = validVolume;

      currentVideo.addEventListener("timeupdate", handleTimeUpdate);
      currentVideo.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        currentVideo.removeEventListener("timeupdate", handleTimeUpdate);
        currentVideo.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
      };
    }
  }, [volume, handleTimeUpdate, currentVideo]);

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: any) => {
    // Ensure the volume is a valid number
    const newVolume = parseFloat(e.target.value);
    if (!isNaN(newVolume) && isFinite(newVolume)) {
      setVolume(newVolume);
    }
  };

    const handleContextMenu = (e) => {
      e.preventDefault(); // Prevent the default context menu behavior
    };

  return (
    <div className="flex-grow relative mb-6">
      <div className="lg:max-w-[65dvw] w-full group overflow-hidden">
        <div
          className={classNames(
            "relative w-full h-[400px] bg-black/10 backdrop-blur-sm",
          )}
        >
          {loading ? (
            <div className="bg-zinc-100 absolute top-0 left-0 h-full w-full animate__animated animate__fadeIn animate__infinite flex justify-center">
              <div className="mx-auto flex items-center justify-center">
                <ActivityIndicator
                  color="black"
                  size={50}
                  className="border-[.3em]"
                />
              </div>
            </div>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full">
              <video
                src={videoUrl}
                className="w-full"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                ref={videoRef}
                title={course.title}
                poster="https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg" // Default image
                onTimeUpdate={handleTimeUpdate}
                onVolumeChange={handleVolumeChange}
                autoPlay={true}
				onContextMenu={handleContextMenu} //Diable right click
              />
            </div>
          )}
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 p-4 rounded-md">
          <button
            onClick={togglePlay}
            className="bg-transparent border-none text-white cursor-pointer mr-4"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-grow h-2 bg-gray-500 rounded-md"
          />

          <div className="w-full h-2 bg-gray-300 rounded-md relative">
            <div
              className="h-full bg-gray-800 rounded-md"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          {/* Add more custom controls as needed */}
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
