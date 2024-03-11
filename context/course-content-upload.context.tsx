import { ChangeEvent, ReactNode, createContext, useContext, useId, useState } from "react";
import { ToastDefaultOptions } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
	newCourse,
	CourseContentUpload,
	CourseSectionUpload,
	setNewCourse,
	CourseSectionUploadFile,
	INewCourseData,
	newCourseInitialState,
} from "../redux/reducers/coursesSlice";

interface ICourseContentUploadContext {
	handleChange: (
		index: number,
		field: keyof Omit<CourseContentUpload, "course_sections"> | keyof CourseSectionUpload,
		section_index?: number,
	) => (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddNewLecture: (index: number) => void;
	handleDuplicateLecture: (index: number, section_index: number) => void;
	handleAddNewOutline: () => void;
	handleDeleteLecture: (contentIndex: number, sectionIndex: number) => void;
	state: CourseContentUpload[];
	handleVideoUpload: (
		index: number,
		file: CourseSectionUploadFile,
		section_index: number,
		posterImage?: string,
	) => void;
	newCourseData: INewCourseData | null;
}

const CourseContentUploadContext = createContext<ICourseContentUploadContext>({
	handleChange: () => () => {},
	handleAddNewLecture: () => {},
	handleDuplicateLecture: () => {},
	handleAddNewOutline: () => {},
	handleDeleteLecture: () => {},
	handleVideoUpload: () => {},
	state: [],
	newCourseData: newCourseInitialState,
});

type Props = { children?: ReactNode; content?: CourseContentUpload[] };

export const CourseContentUploadProvider = (props: Props) => {
	const { children, content } = props;
	const toastId = useId();
	const newCourseData = useSelector(newCourse);
	const dispatch = useDispatch();

	const emptyState: CourseContentUpload = {
		title: "",
		course_sections: [{ notes: "", section_name: "", file: null, posterImage: "" }],
	};

	const [state, setState] = useState<CourseContentUpload[]>(
		newCourseData?.course_contents && newCourseData?.course_contents.length > 0
			? newCourseData?.course_contents
			: content
			? content
			: [emptyState],
	);

	const handleChange =
		(
			index: number,
			field: keyof Omit<CourseContentUpload, "course_sections"> | keyof CourseSectionUpload,
			section_index?: number,
		) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setState((prev) => {
				let updatedState = [...prev];
				if (field === "title") {
					updatedState[index] = {
						...updatedState[index],
						title: value,
					};
				} else if (field === "section_name" && section_index !== undefined) {
					if (!updatedState[index].course_sections) updatedState[index].course_sections = [];
					updatedState[index] = {
						...updatedState[index],
						course_sections: updatedState[index].course_sections.map((section, sectionIndex) =>
							sectionIndex === section_index
								? {
										file: section.file,
										section_name: value,
										notes: section.notes,
										posterImage: section.posterImage,
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
										file: section.file,
										section_name: section.section_name,
										notes: value,
										posterImage: section.posterImage,
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
			// if (updated[index]) updated[index] = emptyState;
			updated[index] = {
				...updated[index],
				course_sections: updated[index].course_sections.concat(emptyState.course_sections[0]),
			};
			dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
			return updated;
		});
	};

	const handleDuplicateLecture = (index: number, section_index: number) => {
		setState((prev) => {
			const updated = [...prev];
			if (updated[index]) {
				const lectureToDuplicate: CourseSectionUpload = prev[index].course_sections[section_index];
				const duplicatedLecture: CourseSectionUpload = {
					section_name: lectureToDuplicate.section_name + " #Copy",
					file: lectureToDuplicate.file,
					notes: lectureToDuplicate.notes,
					posterImage: lectureToDuplicate.posterImage,
				};
				const newCourseSections = [...updated[index].course_sections];
				newCourseSections.splice(section_index + 1, 0, duplicatedLecture);
				updated[index] = {
					...updated[index],
					course_sections: newCourseSections,
				};
				dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
				return updated;
			}
			return updated;
		});
	};

	const handleAddNewOutline = () => {
		setState((prev) => {
			const updated = [...prev, emptyState];
			dispatch(setNewCourse({ ...newCourseData, course_contents: updated }));
			return updated;
		});
	};

	const handleDeleteLecture = (contentIndex: number, sectionIndex: number) => {
		setState((prevState) => {
			const updatedState = [...prevState];
			// if (contentIndex >= 0 && contentIndex < updatedState.length) {
			const updatedSections = [...updatedState[contentIndex].course_sections];
			if (sectionIndex >= 0 && updatedSections.length > 1) {
				if (confirm("This action is not reversible. Do you want to delete this course")) {
					updatedSections.splice(sectionIndex, 1);
					updatedState[contentIndex] = {
						...updatedState[contentIndex],
						course_sections: updatedSections,
					};
					dispatch(setNewCourse({ ...newCourseData, course_contents: updatedState }));
					return updatedState;
				}
			} else
				toast.error("Each lecture must have at least 1 outline.", {
					toastId,
					...ToastDefaultOptions({ id: "error" }),
				});
			return updatedState;
		});
	};

	const handleVideoUpload = (
		index: number,
		file: CourseSectionUploadFile,
		section_index: number,
		posterImage?: string,
	) => {
		setState((prevState) => {
			const updatedState = [...prevState];
			// if (index >= 0 && index < updatedState.length) {
			// if (!updatedState[index]) updatedState[index] = defaultState;
			const updatedSections = [...updatedState[index].course_sections] || [];
			if (section_index >= 0 && section_index < updatedSections.length) {
				updatedSections[section_index] = {
					section_name: updatedSections[section_index].section_name,
					file,
					posterImage: String(posterImage) || updatedSections[section_index].posterImage,
					notes: updatedSections[section_index].notes,
				};
				updatedState[index] = {
					...updatedState[index],
					course_sections: updatedSections,
				};
				dispatch(setNewCourse({ ...newCourseData, course_contents: updatedState }));
				return updatedState;
			}
			return updatedState;
		});
		if (posterImage) URL.revokeObjectURL(posterImage);
	};

	return (
		<CourseContentUploadContext.Provider
			value={{
				newCourseData,
				handleVideoUpload,
				handleChange,
				handleAddNewLecture,
				handleDuplicateLecture,
				handleAddNewOutline,
				handleDeleteLecture,
				state,
			}}>
			{children}
		</CourseContentUploadContext.Provider>
	);
};

export const useCourseContentUploadContext = () => {
	const context = useContext(CourseContentUploadContext);
	if (!context) throw new Error("CourseContentUploadContext must be used within its provider");
	return context;
};
