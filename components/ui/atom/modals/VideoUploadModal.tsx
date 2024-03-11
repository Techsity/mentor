import React, { ChangeEvent, RefObject, createRef, useCallback, useEffect, useId, useState } from "react";
import { CourseSectionUploadFile } from "../../../../redux/reducers/coursesSlice";
import { useModal } from "../../../../context/modal.context";
import { PrimaryButton } from "../buttons";
import { convertToBase64 } from "../../../../utils";
import ActivityIndicator from "../loader/ActivityIndicator";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";

type Props = {
	fileMetaData?: CourseSectionUploadFile;
	onVideoUpload: (file: CourseSectionUploadFile, posterImage?: string) => void;
	includePosterUpload?: boolean;
	poster?: string;
};

const VideoUploadModal = (props: Props) => {
	const toastId = useId();
	const { onVideoUpload, includePosterUpload, fileMetaData, poster } = props;
	const { modalContent, closeModal } = useModal();
	const [videoMetaData, setVideoMetaData] = useState<Pick<CourseSectionUploadFile, "name" | "type"> | null>(null);
	const [posterImage, setPosterImage] = useState<string>(poster || "");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const videoUploadInputRef = createRef<HTMLInputElement>();
	const posterUploadInputRef = createRef<HTMLInputElement>();

	const handleChange = (type: "video" | "image") =>
		useCallback((e: ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;
			if (files) {
				const file = files[0];
				if (type == "video") {
					setVideoMetaData({ name: file.name, type: file.type });
				} else if (type == "image") {
					if (includePosterUpload) {
						const blobUrl = URL.createObjectURL(file);
						setPosterImage(blobUrl);
					}
				}
			}
		}, []);

	const resetPosterImage = () => {
		URL.revokeObjectURL(posterImage);
		setPosterImage(posterImage);
	};

	const onSubmit = () => {
		setLoading(true);
		setError("");
		if (videoUploadInputRef.current && videoUploadInputRef.current.files) {
			let file = videoUploadInputRef.current.files[0];
			if (file)
				convertToBase64(file)
					.then((base64) => {
						setLoading(false);
						const metadata = { base64, name: file.name, type: file.type, size: file.size };
						if (includePosterUpload) onVideoUpload(metadata, posterImage);
						else onVideoUpload(metadata);
						closeModal();
					})
					.catch((err) => {
						setError("Something went wrong. Please try again");
						setLoading(false);
						console.error("error converting video to base64: ", err);
					});
			else if (fileMetaData?.base64) {
				if (includePosterUpload) onVideoUpload(fileMetaData, posterImage);
				else onVideoUpload(fileMetaData);
				closeModal();
			} else {
				toast.error("No files selected.", { toastId, ...ToastDefaultOptions() });
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (fileMetaData) setVideoMetaData({ name: fileMetaData.name, type: fileMetaData.type });
	}, [fileMetaData]);

	useEffect(() => {
		if (!modalContent && includePosterUpload && posterImage) resetPosterImage();
	}, [modalContent]);

	return (
		<div className="bg-white relative p-5 rounded-lg h-[60vh] w-[90vw] overflow-hidden space-y-4">
			<div className="flex md:flex-row flex-col items-start gap-2 w-full">
				<div className="flex flex-col w-full items-start justify-start bg-grey-lighter">
					<label className="w-full flex items-center p-4 gap-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-[#094B10]">
						<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
							<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
						</svg>
						<span className="text-base leading-normal">
							{videoMetaData?.name ? "Change video" : "Select video file"}
						</span>
						<input
							type="file"
							name=""
							hidden
							multiple={false}
							ref={videoUploadInputRef}
							accept="video/*"
							max={1}
							min={1}
							onChange={handleChange("video")}
						/>
					</label>
					{videoMetaData && (
						<p className="text-sm mt-4">
							{videoMetaData.name.length >= 26
								? videoMetaData.name.slice(0, 26) + "---"
								: videoMetaData.name}
							.{videoMetaData.type.split("/")[1]}
						</p>
					)}
					{error && <p className="text-sm text-red-500">{error}</p>}
				</div>

				<div className="flex w-full items-center justify-start bg-grey-lighter">
					{includePosterUpload && (
						<div className="grid gap-4 w-full">
							<label className="w-full flex items-center gap-2 p-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-[#094B10]">
								<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
									<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
								</svg>
								<p className="">{posterImage ? "Change poster image" : "Upload poster image"}</p>
								<input
									type="file"
									name=""
									hidden
									multiple={false}
									ref={posterUploadInputRef}
									accept="image/*"
									max={1}
									min={1}
									onChange={handleChange("image")}
								/>
							</label>
							{posterImage && posterImage !== "" && (
								<div className="w-auto h-auto flex justify-center">
									<img
										src={posterImage}
										alt="poster-image"
										className="h-full max-h-[300px] w-full mx-3"
									/>
								</div>
							)}
						</div>
					)}
					{/* {includePosterUpload &&} */}
				</div>
			</div>
			<PrimaryButton
				title={loading ? "" : "Continue"}
				disabled={loading}
				icon={loading ? <ActivityIndicator size={25} /> : null}
				onClick={onSubmit}
				className="flex justify-center p-1.5 px-3 rounded"
			/>
		</div>
	);
};
export default VideoUploadModal;
