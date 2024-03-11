/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import ContentEditComponent from "./ContentEditComponent";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
	CourseContentUpload,
	CourseSectionUpload,
	newCourse,
	setNewCourse,
} from "../../../../../redux/reducers/coursesSlice";

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
	// const [state, setState] = useState<CourseContentUpload[]>(
	// 	newCourseData?.course_contents && newCourseData?.course_contents.length > 0
	// 		? newCourseData?.course_contents
	// 		: props.content
	// 		? props.content
	// 		: [emptyState],
	// );

	let state = useMemo(
		() =>
			newCourseData?.course_contents && newCourseData?.course_contents.length > 0
				? newCourseData?.course_contents
				: props.content
				? props.content
				: [emptyState],
		[newCourseData],
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
			const { value } = e.target;
			// setState((prev) => {
			const updatedState = [...state];
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
			// return updatedState;
			// });
		};

	const handleAddNewLecture = (index: number) => {
		const updated = [...state];
		if (updated[index].course_sections.length >= 1) {
			updated[index] = {
				...updated[index],
				course_sections: [...updated[index].course_sections, emptyState.course_sections[0]],
			};
		}
		dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
	};

	const handleDuplicateLecture = (index: number, section_index: number) => {
		if (state[index]) {
			const updated = [...state];
			const lectureToDuplicate: CourseSectionUpload = state[index].course_sections[section_index];
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
		}
	};

	const handleDeleteLecture = (index: number, section_index: number) => {
		const updatedState = state.map((item, idx) => {
			if (idx === index && item.course_sections.length > 1) {
				if (confirm("Are you sure you want to delete this lecture?")) {
					const updatedSections = [
						...item.course_sections.slice(0, section_index),
						...item.course_sections.slice(section_index + 1),
					];
					return {
						...item,
						course_sections: updatedSections,
					};
				}
			} else
				toast.error("Each lecture must have at least 1 outline.", {
					toastId,
					...ToastDefaultOptions({ id: "error" }),
				});

			return item;
		});
		dispatch(setNewCourse({ ...newCourseData, course_contents: updatedState }));
	};

	const handleAddNewOutline = () => {
		dispatch(setNewCourse({ ...newCourseData, course_contents: [...state, emptyState] }));
	};

	useEffect(() => {
		console.log({ newCourseData });
	}, []);

	return (
		<div className="grid gap-4 max-w-4xl">
			{newCourseData?.course_contents.map((cont, index) => {
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
