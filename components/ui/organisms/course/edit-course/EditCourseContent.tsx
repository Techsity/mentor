/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { ICourseContent } from "../../../../../interfaces";
import courses from "../../../../../data/courses";
import ContentEditComponent from "./ContentEditComponent";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";

const EditCourseContent = (props: { content?: ICourseContent[] }) => {
	const initialState: ICourseContent = courses[0].course_contents[0];
	const emptyState: ICourseContent = { title: "", course_sections: [{ notes: "", section_name: "", video_url: "" }] };
	const [state, setState] = useState<ICourseContent[]>(props.content || [initialState] || [emptyState]);
	const ref = useRef<HTMLDivElement>(null);
	const refs = Array.from({ length: state.length }, () => ref);

	const lastContentContainerRef = useRef<HTMLDivElement>(null);

	const handleChange = (
		index: number,
		field: keyof ICourseContent | keyof { notes: string; section_name: string },
		value: string,
	) => {
		setState((prev) =>
			prev.map((content, i) =>
				i === index
					? field === "course_sections"
						? {
								...content,
								course_sections: content.course_sections.map((section, j) =>
									j === index ? { ...section, section_name: value } : section,
								),
						  }
						: { ...content, [field]: value }
					: content,
			),
		);
	};

	const handleAddNewLecture = () => {
		setState((prev) => {
			return [...prev, emptyState];
		});
	};

	useEffect(() => {
		if (lastContentContainerRef.current) {
			lastContentContainerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [state]);

	const handleDuplicateLecture = (index: number) => {
		console.log(index);
		const duplicatedLecture = { ...state[index], title: `${state[index].title} - Copy` };
		const newState = [...state.slice(0, index + 1), duplicatedLecture, ...state.slice(index + 1)];
		setState(newState);
	};

	const handleDeleteLecture = (index: number) => {
		console.log(index);
		if (state.length > 2) {
			const newState = [...state.slice(0, index), ...state.slice(index + 1)];
			setState(newState);
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
