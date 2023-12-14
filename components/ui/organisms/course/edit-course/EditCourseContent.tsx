/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { CourseSection, ICourseContent } from "../../../../../interfaces";
import courses from "../../../../../data/courses";
import ContentEditComponent from "./ContentEditComponent";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";

const EditCourseContent = (props: { content?: ICourseContent[] }) => {
	const initialState: ICourseContent = courses[0].course_contents[0];
	const emptyState: ICourseContent = { title: "", course_sections: [{ notes: "", section_name: "", video_url: "" }] };
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<ICourseContent[]>(props.content || [initialState] || [emptyState]);
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

	const handleAddNewLecture = () => {
		setState((prev) => {
			return [...prev, emptyState];
		});
		// if (lastContentContainerRef.current) {
		// 	lastContentContainerRef.current.scrollIntoView({ behavior: "smooth" });
		// }
	};

	const handleDuplicateLecture = (index: number) => {
		const duplicatedLecture = { ...state[index], title: `${state[index].title} - Copy` };
		const newState = [...state.slice(0, index + 1), duplicatedLecture, ...state.slice(index + 1)];
		setState(newState);
	};

	const handleDeleteLecture = (index: number) => {
		if (state.length > 2) {
			if (confirm("Are you sure you want to delete ths outline?")) {
				const newState = [...state.slice(0, index), ...state.slice(index + 1)];
				setState(newState);
			}
		} else {
			toast.error("You can't have less than 2 course outlines", ToastDefaultOptions({ id: "error" }));
		}
	};

	return (
		<div className="grid gap-4 max-w-4xl">
			{state.map((cont, index) => {
				return (
					<ContentEditComponent
						{...cont}
						handleChange={handleChange}
						handleAddNewLecture={handleAddNewLecture}
						handleDuplicateLecture={() => handleDuplicateLecture(index)}
						handleDeleteLecture={() => handleDeleteLecture(index)}
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
