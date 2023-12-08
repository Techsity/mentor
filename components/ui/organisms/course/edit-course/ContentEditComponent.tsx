/* eslint-disable @next/next/no-img-element */
import { FC, ForwardedRef, useRef, useState, useEffect } from "react";
import { ICourseContent } from "../../../../../interfaces";
import { PrimaryButton } from "../../../atom/buttons";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { AddNewLectureButton, DuplicateLectureButton, DeleteLectureButton } from "./ActionButtons";

interface ContentEditComponentProps extends ICourseContent {
	handleChange: (index: number, field: keyof ICourseContent, value: string) => void;
	handleAddNewLecture: () => void;
	handleDuplicateLecture: any;
	handleDeleteLecture: any;
	index: number;
	contentLength: number;
	contentContainerRef: ForwardedRef<HTMLDivElement>;
}

const ContentEditComponent: FC<ContentEditComponentProps> = ({
	handleChange,
	course_sections,
	title,
	handleAddNewLecture,
	handleDuplicateLecture,
	handleDeleteLecture,
	contentContainerRef,
	index,
}) => {
	const fileUploadInputRef = useRef<HTMLInputElement>(null);
	const [currentContentIndex, setCurrentContentIndex] = useState<number>(0);
	const updateCurrentContentContainerIndex = () => {
		const contentContainers = document.querySelectorAll(".content_container");
		contentContainers.forEach((container, i) => {
			const rect = container.getBoundingClientRect();
			if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
				setCurrentContentIndex(i);
			}
		});
	};
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry: any) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.dataset.index || "0", 10);
						setCurrentContentIndex(index);
					}
				});
			},
			{
				threshold: 0.5,
			},
		);
		const contentContainers = document.querySelectorAll(".content_container");
		contentContainers.forEach((container: any, i) => {
			observer.observe(container);
			container.dataset.index = i.toString();
		});
		window.addEventListener("scroll", updateCurrentContentContainerIndex);
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", updateCurrentContentContainerIndex);
		};
	}, []);

	return (
		<div className="animate__animated animate__fadeIn scroll-mt-44 content_container" ref={contentContainerRef}>
			<div className="relative max-w-2xl">
				<label htmlFor="title" className="text-sm text-[#bebebe]">
					Content Title
				</label>
				<CustomTextInput
					id="title"
					containerProps={{
						className: "border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
					}}
					value={title}
				/>
			</div>
			<div className="">
				<div className="mt-4 flex justify-start items-center max-w-2xl">
					<h1 className="text-sm text-[#bebebe]">Course Contents</h1>
				</div>
				<div className="flex items-start gap-4 my-5">
					<div className="flex-grow max-w-2xl grid gap-6">
						{course_sections.map((lecture, i) => {
							return (
								<div className="" key={i}>
									<div className="border border-[#70C5A1] p-5">
										<div className="grid gap-4">
											<CustomTextInput
												id="lecture_name"
												containerProps={{
													className:
														"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
												}}
												onChange={(e) => handleChange(i, "title", e.target.value)}
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
												{/* {lecture.type === "video" ? (
											<img
												src={"/assets/images/mockups/course_one.png"}
												alt={lecture.name}
												className="h-full w-full object-cover"
											/>
										) : (
											<></>
										)} */}
											</div>
											<CustomTextInput
												id="lecture_note"
												containerProps={{
													className:
														"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
												}}
												placeholder="Lecture Note"
												value={lecture.notes}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="bg-[#70C5A1] h-1/2 w-auto sticky right-2 top-40 grid gap-5 p-1 py-5">
						<AddNewLectureButton handleAddNewLecture={handleAddNewLecture} />
						<DuplicateLectureButton
							currentContentIndex={currentContentIndex}
							handleDuplicateLecture={handleDuplicateLecture}
						/>
						<DeleteLectureButton handleDelete={handleDeleteLecture} />
					</div>
				</div>
			</div>
			<div className="my-4 flex justify-end items-center max-w-2xl">
				<div className="cursor-pointer text-[#70C5A1] select-none">+ Add Course Content</div>
				{/* {index === contentLength - 1 && (
					
				)} */}
			</div>
		</div>
	);
};

export default ContentEditComponent;
