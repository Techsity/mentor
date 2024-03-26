/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import ContentEditComponent from "./ContentEditComponent";
import { useCourseContentUploadContext } from "../../../../../context/course-content-upload.context";

const EditCourseContent = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { state } = useCourseContentUploadContext();
	const refs = Array.from({ length: state.length }, () => ref);
	const lastContentContainerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="grid gap-4 max-w-4xl">
			{state.map((cont, index) => {
				return (
					<ContentEditComponent
						course_sections={cont.course_sections}
						title={cont.title}
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
