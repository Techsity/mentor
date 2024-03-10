import { createSlice } from "@reduxjs/toolkit";
import { ICourse, ICourseCategory } from "../../interfaces";
import { RootState } from "../store";

export type CourseSectionUploadFile = {
	name: string;
	type: string;
	blobUrl: string;
};

export type CourseSectionUpload = {
	section_name: string;
	notes: string;
	file: CourseSectionUploadFile | null;
};

export type CourseContentUpload = {
	title: string;
	course_sections: CourseSectionUpload[];
};

type NewCourseData = Omit<ICourse, "mentor" | "course_type" | "reviews" | "category" | "course_contents"> & {
	// files: any[];
	category: string;
	files: File[];
	course_contents: CourseContentUpload[];
};

export const newCourseInitialState: NewCourseData = {
	title: "",
	description: "",
	course_images: "",
	course_level: "ALL_LEVELS",
	duration: 0,
	limit: 0,
	rating: 0,
	price: 0,
	available: false,
	imgUrl: "",
	requirements: [],
	course_contents: [],
	category: "",
	what_to_learn: [],
	files: [],
};

const initialState: {
	courseCategories: ICourseCategory[];
	newCourse: NewCourseData | null;
} = {
	courseCategories: [],
	newCourse: newCourseInitialState,
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setCourseCategories: (state, action: { payload: ICourseCategory[] }) => {
			state.courseCategories = action.payload;
		},
		setNewCourse: (state, action: { payload: Partial<NewCourseData> | null }) => {
			state.newCourse = { ...state.newCourse, ...(action.payload as NewCourseData) };
		},
	},
});

export const { setCourseCategories, setNewCourse } = coursesSlice.actions;

export const courseCategories = (state: RootState) => state.courses.courseCategories;
export const newCourse = (state: RootState) => state.courses.newCourse;

export default coursesSlice.reducer;
