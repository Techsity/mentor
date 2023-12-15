/* eslint-disable @next/next/no-img-element */
import { FC, ForwardedRef, useRef, useState, useEffect, ChangeEvent } from "react";
import { CourseSection, ICourseContent } from "../../../../../interfaces";
import { PrimaryButton } from "../../../atom/buttons";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { AddNewLectureButton, DuplicateLectureButton, DeleteLectureButton } from "./ActionButtons";

interface ContentEditComponentProps extends ICourseContent {
	handleChange: (
		index: number,
		field: keyof Omit<ICourseContent, "course_sections"> | keyof CourseSection,
		section_index?: number,
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddNewLecture: () => void;
	handleDuplicateLecture: (index: number, section_index: number) => void;
	handleDeleteLecture: (index: number, section_index: number) => void;
	index: number;
	contentLength: number;
	contentContainerRef: ForwardedRef<HTMLDivElement>;
}

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
}) => {
	const fileUploadInputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="animate__animated animate__fadeIn scroll-mt-44">
			<div className="relative max-w-2xl">
				<label htmlFor="title" className="text-sm text-[#bebebe]">
					Content Title
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
					<h1 className="text-sm text-[#bebebe]">Course Contents</h1>
				</div>
				<div className="">
					{course_sections.map((lecture, section_index) => {
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
														title="Upload Content Video"
														className="p-1 text-sm px-5 bg-zinc-100/40 text-white absolute"
														onClick={() => {
															if (fileUploadInputRef.current)
																fileUploadInputRef.current.click();
														}}
													/>
												</div>
												<input
													type="file"
													name=""
													hidden
													id=""
													ref={fileUploadInputRef}
													accept=".mp4,.3gp"
													max={1}
													min={1}
												/>
												<img
													src={"/assets/images/mockups/course_one.png"}
													alt={lecture.section_name}
													className="h-full w-full object-cover"
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
					<div className="cursor-pointer text-[#70C5A1] select-none">+ Add New Outline</div>
				)}
			</div>
		</div>
	);
};

export default ContentEditComponent;
