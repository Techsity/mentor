/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useRef, useState } from "react";
import { CourseSection, ICourseContent } from "../../../../../interfaces";
import ContentEditComponent from "./ContentEditComponent";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";

type Props = { content?: ICourseContent[] };

const EditCourseContent = (props: Props) => {
	const emptyState: ICourseContent = { title: "", course_sections: [{ notes: "", section_name: "", video_url: "" }] };
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<ICourseContent[]>(props.content || [emptyState]);

	const refs = Array.from({ length: state.length }, () => ref);
	const lastContentContainerRef = useRef<HTMLDivElement>(null);

	const handleChange =
		(
			index: number,
			field: keyof Omit<ICourseContent, "course_sections"> | keyof CourseSection,
			section_index?: number,
		) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			console.log(index, section_index);
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
					updatedState[index].course_sections = updatedState[index].course_sections.map(
						(section, sectionIndex) =>
							sectionIndex === section_index
								? {
										...section,
										section_name: value,
								  }
								: section,
					);
				} else if (field === "notes" && section_index !== undefined) {
					if (!updatedState[index].course_sections) {
						updatedState[index].course_sections = [];
					}
					updatedState[index].course_sections = updatedState[index].course_sections.map(
						(section, sectionIndex) =>
							sectionIndex === section_index
								? {
										...section,
										notes: value,
								  }
								: section,
					);
				}

				return updatedState;
			});
		};

	const handleAddNewLecture = (index: number) => {
		setState((prev) => {
			const updated = [...prev];
			updated[index].course_sections = [...updated[index].course_sections, ...emptyState.course_sections];
			return updated;
		});
		if (lastContentContainerRef.current) {
			lastContentContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
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
				updated[index].course_sections.splice(section_index + 1, 0, duplicatedLecture);
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
						return updated;
					});
				}
			} else {
				toast.error(
					"You must have at least, 2 outlines in each lecture.",
					ToastDefaultOptions({ id: "error" }),
				);
			}
		}
	};

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
					/>
				);
			})}
		</div>
	);
};

export default EditCourseContent;
