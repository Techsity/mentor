import React, { Dispatch, SetStateAction, useState } from "react";
import { ICourse } from "../../../../../../interfaces";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";

const VideoComponent = (props: { course: ICourse; setLoading?: Dispatch<SetStateAction<boolean>> }) => {
	const videoUrl = "https://vimeo.com/169599296";
	const [loading, setLoading] = useState<boolean>(true);
	const handleLoadedData = () => {
		setLoading(false);
	};

	return (
		<div className="flex-grow relative my-6">
			<div className="lg:max-w-[65dvw] w-full group overflow-hidden">
				<div className="relative bg-zinc-200 w-full h-[400px]">
					{loading ? (
						<div className="bg-zinc-100 absolute top-0 left-0 h-full w-full animate__animated animate__fadeIn animate__infinite flex justify-center">
							<div className="mx-auto flex items-center justify-center">
								<ActivityIndicator color="black" size={50} className="border-[.3em]" />
							</div>
						</div>
					) : (
						<div className="absolute bottom-0 left-0 w-full h-full">
							<video
								onLoadedData={handleLoadedData}
								controls
								src={videoUrl}
								style={{ aspectRatio: "4/3", width: "100%", height: "100%" }}></video>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoComponent;
