import { createSlice } from "@reduxjs/toolkit";
import { ICourse, ICourseCategory } from "../../interfaces";
import { RootState } from "../store";
import { courseTypes } from "../../data/courses";

const isClient = typeof window !== "undefined" && window.localStorage;

export const newCourseInitialState: Omit<ICourse, "mentor"> = {
	title: "",
	description: "",
	course_type: courseTypes[0].name,
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
	category: {
		title: "",
		category_type: {
			description: "",
			type: "",
		},
		description: "",
		created_at: "",
		updated_at: "",
	},
	reviews: [],
	what_to_learn: [],
};

const initialState: {
	userWishlistedCourses: ICourse[];
	courseCategories: ICourseCategory[];
	newCourse: Omit<ICourse, "mentor"> | null;
} = {
	userWishlistedCourses: [],
	courseCategories: [],
	newCourse: newCourseInitialState,
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setWishlist: (state, action: { payload: ICourse[] }) => {
			if (action.payload) {
				state.userWishlistedCourses = action.payload;
				// // Save to local storage too, to persist state
				// if (isClient) {
				// 	window.localStorage.setItem("userWishlistedCourses", JSON.stringify(action.payload));
				// }
			}
		},
		setCourseCategories: (state, action: { payload: ICourseCategory[] }) => {
			state.courseCategories = action.payload;
		},
		setNewCourse: (state, action: { payload: Partial<Omit<ICourse, "mentor">> | null }) => {
			state.newCourse = action.payload as Omit<ICourse, "mentor">;
		},
	},
});

export const { setWishlist, setCourseCategories, setNewCourse } = coursesSlice.actions;

export const wishlistedCourses = (state: RootState) => state.courses.userWishlistedCourses;
export const courseCategories = (state: RootState) => state.courses.courseCategories;
export const newCourse = (state: RootState) => state.courses.newCourse;

export default coursesSlice.reducer;
