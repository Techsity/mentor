/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { CourseSection, ICourseContent } from "../../../../../interfaces";
import ContentEditComponent from "./ContentEditComponent";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { newCourse, setNewCourse } from "../../../../../redux/reducers/coursesSlice";

type Props = { content?: ICourseContent[] };

const EditCourseContent = (props: Props) => {
	const dispatch = useDispatch();
	const newCourseData = useSelector(newCourse);

	const emptyState: ICourseContent = { title: "", course_sections: [{ notes: "", section_name: "", video_url: "" }] };
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<ICourseContent[]>(
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
			field: keyof Omit<ICourseContent, "course_sections"> | keyof CourseSection,
			section_index?: number,
		) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
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
				} else if (field === "notes" && section_index !== undefined) {
					if (!updatedState[index].course_sections) {
						updatedState[index].course_sections = [];
					}
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
				const lectureToDuplicate: CourseSection = prev[index].course_sections[section_index];
				const updated = [...prev];
				const duplicatedLecture: CourseSection = {
					...lectureToDuplicate,
					section_name: lectureToDuplicate.section_name + " - Copy",
				};

				const newCourseSections = [...updated[index].course_sections];
				newCourseSections.splice(section_index + 1, 0, duplicatedLecture);
				updated[index] = {
					...updated[index],
					course_sections: newCourseSections,
				};

				// dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
				return updated;
			});
		}
	};

	const handleDeleteLecture = (index: number, section_index: number) => {
		if (state[index]) {
			if (state[index].course_sections.length > 2) {
				if (confirm("Are you sure you want to delete this lecture?")) {
					setState((prev) => {
						const updated = [...prev];
						updated[index].course_sections = [
							...updated[index].course_sections.slice(0, section_index),
							...updated[index].course_sections.slice(section_index + 1),
						];
						// dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
						return updated;
					});
				}
			} else {
				toast.error("Each lecture must have at least, 2 outlines.", ToastDefaultOptions({ id: "error" }));
			}
		}
	};
	const handleAddNewOutline = () => {
		setState((prev) => {
			return [...prev, emptyState];
		});
	};

	// useEffect(() => {
	// 	dispatch(setNewCourse({ ...newCourseData, course_contents: [emptyState] }));
	// }, []);

	return (
		<div className="grid gap-4 max-w-4xl">
			{state.map((cont, index) => {
				return (
					<ContentEditComponent
						{...cont}
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
