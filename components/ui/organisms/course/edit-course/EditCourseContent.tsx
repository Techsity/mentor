/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useRef, useState } from "react";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { ICourseContent } from "../../../../../interfaces";
import courses from "../../../../../data/courses";
import { PrimaryButton } from "../../../atom/buttons";

const EditCourseContent = (props: { content?: ICourseContent[] }) => {
	const initialState: ICourseContent =
		courses[0].categories[0].availableCourses[0].content[0];

	const [state, setState] = useState<ICourseContent[]>(
		props.content || [initialState],
	);

	return (
		<div className="grid gap-4 max-w-4xl">
			{state.map((cont, index) => {
				return <ContentEditComponent {...cont} key={index} />;
			})}
		</div>
	);
};

const ContentEditComponent: FC<ICourseContent> = ({ lectures, title }) => {
	const fileUploadInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className="">
			<div className="relative max-w-2xl">
				<label htmlFor="title" className="text-sm text-[#bebebe]">
					Content Title
				</label>
				<CustomTextInput
					id="title"
					containerProps={{
						className:
							"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
					}}
					value={title}
				/>
			</div>
			<div className="">
				<div className="my-4 flex justify-between items-center max-w-2xl">
					<h1 className="text-sm text-[#bebebe]">Lectures</h1>
					<div className="cursor-pointer text-[#70C5A1] select-none">
						+ Add New Lecture
					</div>
				</div>
				{lectures.map((lecture, i) => {
					return (
						<div className="flex items-start gap-4 my-8" key={i}>
							<div className="flex-grow border border-[#70C5A1] p-5 max-w-2xl">
								<div className="grid gap-4">
									<CustomTextInput
										id="lecture_name"
										containerProps={{
											className:
												"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
										}}
										value={lecture.name}
									/>
									<div className="relative h-32 w-full">
										<div className="absolute h-full w-full bg-black/50 flex justify-center items-center">
											<PrimaryButton
												title="Upload Content Video"
												className="p-1 text-sm px-5 bg-zinc-100/40 text-white absolute"
												onClick={() => {
													if (
														fileUploadInputRef.current
													)
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
										{lecture.type === "video" ? (
											<img
												src={
													"/assets/images/mockups/course_one.png"
												}
												alt={lecture.name}
												className="h-full w-full object-cover"
											/>
										) : (
											<></>
										)}
									</div>
									<CustomTextInput
										id="lecture_note"
										containerProps={{
											className:
												"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
										}}
										placeholder="Lecture Note"
									/>
								</div>
							</div>
							<div className="bg-[#70C5A1] h-1/2 w-auto right-2 top-0 grid gap-5 p-1 py-5">
								<div className="flex flex-col gap-2 items-center cursor-pointer">
									<svg
										width="25"
										height="25"
										viewBox="0 0 18 18"
										fill="none">
										<path
											d="M16.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V16.5C0 16.8978 0.158035 17.2794 0.43934 17.5607C0.720644 17.842 1.10218 18 1.5 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5V1.5C18 1.10218 17.842 0.720644 17.5607 0.43934C17.2794 0.158035 16.8978 0 16.5 0ZM14.25 9.75H9.75V14.25C9.75 14.4489 9.67098 14.6397 9.53033 14.7803C9.38968 14.921 9.19891 15 9 15C8.80109 15 8.61032 14.921 8.46967 14.7803C8.32902 14.6397 8.25 14.4489 8.25 14.25V9.75H3.75C3.55109 9.75 3.36032 9.67098 3.21967 9.53033C3.07902 9.38968 3 9.19891 3 9C3 8.80109 3.07902 8.61032 3.21967 8.46967C3.36032 8.32902 3.55109 8.25 3.75 8.25H8.25V3.75C8.25 3.55109 8.32902 3.36032 8.46967 3.21967C8.61032 3.07902 8.80109 3 9 3C9.19891 3 9.38968 3.07902 9.53033 3.21967C9.67098 3.36032 9.75 3.55109 9.75 3.75V8.25H14.25C14.4489 8.25 14.6397 8.32902 14.7803 8.46967C14.921 8.61032 15 8.80109 15 9C15 9.19891 14.921 9.38968 14.7803 9.53033C14.6397 9.67098 14.4489 9.75 14.25 9.75Z"
											fill="white"
										/>
									</svg>
									<p className="text-xs text-white select-none">
										Add New
									</p>
								</div>
								<div className="flex flex-col gap-2 items-center cursor-pointer">
									<svg
										width="25"
										height="28"
										viewBox="0 0 18 21"
										fill="none">
										<path
											d="M1.8 3.64875V14.875C1.79982 15.9858 2.23422 17.055 3.01507 17.8658C3.79592 18.6767 4.86477 19.1684 6.0048 19.2412L6.3 19.25H14.2452C14.0591 19.7617 13.7144 20.2048 13.2586 20.5182C12.8028 20.8316 12.2583 20.9999 11.7 21H5.4C3.96783 21 2.59432 20.4469 1.58162 19.4623C0.568927 18.4777 3.71226e-07 17.1424 3.71226e-07 15.75V6.125C-0.000292464 5.58193 0.17267 5.05214 0.495051 4.60864C0.817431 4.16514 1.27336 3.82977 1.8 3.64875ZM15.3 0C16.0161 0 16.7028 0.276562 17.2092 0.768845C17.7155 1.26113 18 1.92881 18 2.625V14.875C18 15.5712 17.7155 16.2389 17.2092 16.7312C16.7028 17.2234 16.0161 17.5 15.3 17.5H6.3C5.58392 17.5 4.89716 17.2234 4.39081 16.7312C3.88446 16.2389 3.6 15.5712 3.6 14.875V2.625C3.6 1.92881 3.88446 1.26113 4.39081 0.768845C4.89716 0.276562 5.58392 0 6.3 0H15.3Z"
											fill="white"
										/>
									</svg>
									<p className="text-xs text-white select-none">
										Duplicate
									</p>
								</div>
								<div className="flex flex-col gap-2 items-center cursor-pointer">
									<svg
										width="25"
										height="28"
										viewBox="0 0 18 24"
										fill="none">
										<path
											d="M1.28571 20.5714C1.28571 21.9857 2.44286 23.1429 3.85714 23.1429H14.1429C15.5571 23.1429 16.7143 21.9857 16.7143 20.5714V5.14286H1.28571V20.5714ZM18 1.28571H13.5L12.2143 0H5.78571L4.5 1.28571H0V3.85714H18V1.28571Z"
											fill="white"
										/>
									</svg>
									<p className="text-xs text-white select-none">
										Delete
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default EditCourseContent;
