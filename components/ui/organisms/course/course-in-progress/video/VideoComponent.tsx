import React from "react";
import { ICourse } from "../../../../../../interfaces";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import classNames from "classnames";

const VideoComponent = ({ course, loading }: { course: ICourse; loading?: boolean }) => {
	const videoUrl = "https://player.vimeo.com/video/166240148";

	return (
		<div className="flex-grow relative mb-6">
			<div className="lg:max-w-[65dvw] w-full group overflow-hidden">
				<div className={classNames("relative w-full h-[400px]", loading ? "bg-zinc-200" : "bg-zinc-200")}>
					{loading ? (
						<div className="bg-zinc-100 absolute top-0 left-0 h-full w-full animate__animated animate__fadeIn animate__infinite flex justify-center">
							<div className="mx-auto flex items-center justify-center">
								<ActivityIndicator color="black" size={50} className="border-[.3em]" />
							</div>
						</div>
					) : (
						<div className="absolute top-0 left-0 w-full h-full">
							<iframe
								src={videoUrl}
								width="100%"
								height="100%"
								allow="autoplay; fullscreen"
								allowFullScreen
								title={course.title}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoComponent;
