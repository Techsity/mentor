/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CourseSection, ICourseContent } from "../../../../../interfaces";
import ContentEditComponent from "./ContentEditComponent";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
	CourseContentUpload,
	CourseSectionUpload,
	CourseSectionUploadFile,
	newCourse,
	setNewCourse,
} from "../../../../../redux/reducers/coursesSlice";
import { createReadStream } from "fs";
import { convertToBase64 } from "../../../../../utils";

type Props = { content?: CourseContentUpload[]; handleUpload?: (files: File[]) => void };

const EditCourseContent = (props: Props) => {
	const toastId = useId();
	const dispatch = useDispatch();
	const newCourseData = useSelector(newCourse);

	const emptyState: CourseContentUpload = {
		title: "",
		course_sections: [{ notes: "", section_name: "", file: null, posterImage: "" }],
	};
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<CourseContentUpload[]>(
		newCourseData?.course_contents && newCourseData?.course_contents.length > 0
			? newCourseData?.course_contents
			: props.content
			? props.content
			: [emptyState],
	);

	const refs = Array.from({ length: state.length }, () => ref);
	const lastContentContainerRef = useRef<HTMLDivElement>(null);

	const handleChange =
		(
			index: number,
			field: keyof Omit<CourseContentUpload, "course_sections"> | keyof CourseSectionUpload,
			section_index?: number,
		) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value, files } = e.target;

			setState((prev) => {
				const updatedState = [...prev];
				if (field === "title") {
					updatedState[index] = {
						...updatedState[index],
						title: value,
					};
				} else if (field === "section_name" && section_index !== undefined) {
					if (!updatedState[index].course_sections) {
						updatedState[index].course_sections = [];
					}
					updatedState[index] = {
						...updatedState[index],
						course_sections: updatedState[index].course_sections.map((section, sectionIndex) =>
							sectionIndex === section_index
								? {
										...section,
										section_name: value,
								  }
								: section,
						),
					};
				} else if (field === "file" && section_index !== undefined) {
					if (!files) {
						toast.error("No files selected", { toastId, ...ToastDefaultOptions() });
						return prev;
					}
					const file = files[0];
					let base64 = "";
					convertToBase64(file)
						.then((res) => (base64 = res))
						.catch((err) => {
							console.error("error converting file to base64: ", err);
							return prev;
						});
					const metadata: CourseSectionUploadFile = {
						name: file.name,
						size: file.size,
						type: file.type,
						base64,
					};
					if (!updatedState[index].course_sections) updatedState[index].course_sections = [];

					console.log({ file });
					updatedState[index] = {
						...updatedState[index],
						course_sections: updatedState[index].course_sections.map((section, sectionIndex) =>
							sectionIndex === section_index
								? {
										...section,
										file: { ...metadata, blobUrl: JSON.stringify(file) },
								  }
								: section,
						),
					};
				} else if (field === "notes" && section_index !== undefined) {
					if (!updatedState[index].course_sections) updatedState[index].course_sections = [];
					updatedState[index] = {
						...updatedState[index],
						course_sections: updatedState[index].course_sections.map((section, sectionIndex) =>
							sectionIndex === section_index
								? {
										...section,
										notes: value,
								  }
								: section,
						),
					};
				}
				dispatch(setNewCourse({ ...newCourseData, course_contents: updatedState }));
				console.log({ updatedState, newCourseData: newCourseData?.course_contents });
				return updatedState;
			});
		};

	const handleAddNewLecture = (index: number) => {
		setState((prev) => {
			const updated = [...prev];
			if (updated[index].course_sections.length >= 1) {
				updated[index] = {
					...updated[index],
					course_sections: [...updated[index].course_sections, emptyState.course_sections[0]],
				};
			}
			return updated;
		});
	};

	const handleDuplicateLecture = (index: number, section_index: number) => {
		if (state[index]) {
			setState((prev) => {
				const lectureToDuplicate: CourseSectionUpload = prev[index].course_sections[section_index];
				const updated = [...prev];
				const duplicatedLecture: CourseSectionUpload = {
					...lectureToDuplicate,
					section_name: lectureToDuplicate.section_name + " - Copy",
				};

				const newCourseSections = [...updated[index].course_sections];
				newCourseSections.splice(section_index + 1, 0, duplicatedLecture);
				updated[index] = {
					...updated[index],
					course_sections: newCourseSections,
				};
				dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
				return updated;
			});
		}
	};

	const handleDeleteLecture = (index: number, section_index: number) => {
		setState((prevState) => {
			return prevState.map((item, idx) => {
				if (idx === index && item.course_sections.length > 2) {
					if (confirm("Are you sure you want to delete this lecture?")) {
						const updated = {
							...item,
							course_sections: [
								...item.course_sections.slice(0, section_index),
								...item.course_sections.slice(section_index + 1),
							],
						};
						dispatch(setNewCourse({ ...newCourseData, course_contents: [updated] }));
						return updated;
					}
				} else if (idx === index && item.course_sections.length <= 2)
					toast.error("Each lecture must have at least 2 outlines.", ToastDefaultOptions({ id: "error" }));
				return item;
			});
		});
	};

	const handleAddNewOutline = () => {
		setState((prev) => [...prev, emptyState]);
	};

	return (
		<div className="grid gap-4 max-w-4xl">
			{state.map((cont, index) => {
				return (
					<ContentEditComponent
						course_sections={cont.course_sections}
						title={cont.title}
						handleChange={handleChange}
						handleAddNewLecture={() => handleAddNewLecture(index)}
						handleDuplicateLecture={handleDuplicateLecture}
						handleDeleteLecture={handleDeleteLecture}
						key={index}
						contentLength={state.length}
						index={index}
						contentContainerRef={index === state.length - 1 ? lastContentContainerRef : refs[index]}
						handleAddNewOutline={handleAddNewOutline}
					/>
				);
			})}
		</div>
	);
};

export default EditCourseContent;
