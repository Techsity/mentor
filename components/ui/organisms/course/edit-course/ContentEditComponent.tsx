/* eslint-disable @next/next/no-img-element */
import { FC, ForwardedRef, ChangeEvent, useCallback, useState, useEffect, useMemo } from "react";
import { PrimaryButton } from "../../../atom/buttons";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { AddNewLectureButton, DuplicateLectureButton, DeleteLectureButton } from "./ActionButtons";
import {
	CourseContentUpload,
	CourseSectionUpload,
	CourseSectionUploadFile,
	newCourse,
	setNewCourse,
} from "../../../../../redux/reducers/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../../context/modal.context";
import VideoUploadModal from "../../../atom/modals/VideoUploadModal";

const ContentEditComponent: FC<ContentEditComponentProps> = ({
	handleChange,
	handleAddNewLecture,
	handleDuplicateLecture,
	handleDeleteLecture,
	contentContainerRef,
	index,
	title,
	course_sections,
	contentLength,
	handleAddNewOutline,
	// onFileUpload,
}) => {
	const modalConfig = {
		closeOnBackgroundClick: false,
		animate: false,
	};
	const dispatch = useDispatch();
	const { openModal } = useModal();
	const newCourseData = useSelector(newCourse);
	const defaultState: CourseContentUpload = {
		title: title || "",
		course_sections: course_sections || [{ notes: "", section_name: "", file: null, posterImage: "" }],
	};
	const [state, setState] = useState<CourseContentUpload[]>(newCourseData?.course_contents || [defaultState]);

	const handleVideoUpload = (file: CourseSectionUploadFile, section_index: number, posterImage?: string) => {
		setState((prevState) => {
			const updatedState = [...prevState];
			// if (index >= 0 && index < updatedState.length) {
			const updatedSections = [...updatedState[index].course_sections];
			if (section_index >= 0 && section_index < updatedSections.length) {
				updatedSections[section_index] = {
					...updatedSections[section_index],
					file,
					posterImage: String(posterImage) || updatedSections[section_index].posterImage,
				};
				updatedState[index] = {
					...updatedState[index],
					course_sections: updatedSections,
				};
				dispatch(setNewCourse({ ...newCourseData, course_contents: updatedState }));
				return updatedState;
			} else console.error("Invalid section index");
			return updatedState;
		});
		if (posterImage) URL.revokeObjectURL(posterImage);
	};

	const filtered = useMemo(() => {
		if (newCourseData?.course_contents[index]) {
			console.log({ filteredFromRedux: newCourseData?.course_contents[index].course_sections });
			return newCourseData?.course_contents[index].course_sections;
		} else if (state[index]) {
			console.log({ filteredFromState: newCourseData?.course_contents[index].course_sections });
			return state[index].course_sections;
		} else {
			console.log({ filteredFromCoursesctions: course_sections });
			return course_sections;
		}
	}, [newCourseData, course_sections]);

	const openUploadModal = (section_index: number) => {
		const indexedFile = filtered[section_index];
		console.log({ indexedFile, course_sections, section_index });
		if (indexedFile)
			openModal(
				<VideoUploadModal
					fileMetaData={indexedFile.file as CourseSectionUploadFile}
					poster={indexedFile.posterImage}
					includePosterUpload
					onVideoUpload={(file, poster) => handleVideoUpload(file, section_index, poster)}
				/>,
				modalConfig,
			);
		else
			openModal(
				<VideoUploadModal
					includePosterUpload
					onVideoUpload={(file, poster) => handleVideoUpload(file, section_index, poster)}
				/>,
				modalConfig,
			);
	};

	return (
		<>
			<div className="animate__animated animate__fadeIn scroll-mt-44">
				<div className="relative max-w-2xl">
					<label htmlFor="title" className="text-sm text-[#bebebe]">
						Lecture Title
					</label>
					<CustomTextInput
						id="title"
						containerProps={{
							className: "border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
						}}
						onChange={handleChange(index, "title")}
						value={title}
					/>
				</div>
				<div className="">
					<div className="mt-4 flex justify-start items-center max-w-2xl">
						<h1 className="text-sm text-[#bebebe]">Lecture Content</h1>
					</div>
					<div className="">
						{filtered.map((lecture, section_index) => {
							return (
								<div
									ref={contentContainerRef}
									className="content_container flex items-start gap-4 my-5"
									key={section_index}>
									<div className="flex-grow max-w-2xl grid gap-6">
										<div className="border border-[#70C5A1] p-5">
											<div className="grid gap-4">
												<CustomTextInput
													id="lecture_name"
													containerProps={{
														className:
															"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
													}}
													onChange={handleChange(index, "section_name", section_index)}
													value={lecture.section_name}
												/>
												<div className="relative h-32 w-full">
													<div className="absolute h-full w-full bg-black/50 flex justify-center items-center">
														<PrimaryButton
															title={
																(course_sections[section_index] &&
																	course_sections[section_index].file !== null &&
																	`${
																		course_sections[section_index].file?.name.slice(
																			0,
																			25,
																		) + "---"
																	}.${
																		course_sections[section_index].file?.type.split(
																			"/",
																		)[1]
																	}`) ||
																(lecture.file !== null &&
																	`${
																		String(lecture.file.name).slice(0, 25) + "---"
																	}.${lecture.file.type.split("/")[1]}`) ||
																"Upload Content Video"
															}
															className="p-1 text-sm px-5 bg-zinc-100/40 text-white absolute"
															onClick={() => openUploadModal(section_index)}
														/>
													</div>
													<img
														src={
															lecture.posterImage
															//  ||
															// "/assets/images/mockups/course_one.png"
														}
														alt={"poster-image"}
														className="h-full w-full object-cover text-xs"
													/>
												</div>
												<CustomTextInput
													id="lecture_note"
													containerProps={{
														className:
															"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
													}}
													placeholder="Lecture Note"
													value={lecture.notes}
													onChange={handleChange(index, "notes", section_index)}
												/>
											</div>
										</div>
									</div>
									{/* <div className="bg-[#70C5A1] h-1/2 w-auto sticky right-2 top-40 grid gap-5 p-1 py-5"> */}
									<div className="bg-[#70C5A1] h-1/2 w-auto right-2 top-40 grid gap-5 p-1 py-5">
										<AddNewLectureButton handleAddNewLecture={handleAddNewLecture} />
										<DuplicateLectureButton
											handleDuplicateLecture={() => handleDuplicateLecture(index, section_index)}
										/>
										<DeleteLectureButton
											handleDelete={() => handleDeleteLecture(index, section_index)}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="my-4 flex justify-end items-center max-w-2xl">
					{index === contentLength - 1 && (
						<div onClick={handleAddNewOutline} className="cursor-pointer text-[#70C5A1] select-none">
							+ Add New Outline
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ContentEditComponent;

interface ContentEditComponentProps extends CourseContentUpload {
	handleChange: (
		index: number,
		field: keyof Omit<CourseContentUpload, "course_sections"> | keyof CourseSectionUpload,
		section_index?: number,
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddNewLecture: () => void;
	handleAddNewOutline: () => void;
	handleDuplicateLecture: (index: number, section_index: number) => void;
	handleDeleteLecture: (index: number, section_index: number) => void;
	index: number;
	contentLength: number;
	contentContainerRef: ForwardedRef<HTMLDivElement>;
	// onFileUpload: (file: File) => void;
}
