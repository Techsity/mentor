import { createSlice } from "@reduxjs/toolkit";
import { ICourse, ICourseCategory } from "../../../interfaces";
import { RootState } from "../../store";

const isClient = typeof window !== "undefined" && window.localStorage;

const userWishlistedCoursesLocal = isClient ? window.localStorage.getItem("userWishlistedCourses") : "";
const data: ICourse[] = userWishlistedCoursesLocal ? JSON.parse(userWishlistedCoursesLocal) : [];

const initialState: {
	userWishlistedCourses: ICourse[];
	courseCategories: ICourseCategory[];
	newCourse: ICourse | null;
} = {
	userWishlistedCourses: data,
	courseCategories: [],
	newCourse: null,
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setWishlist: (state, action: { payload: ICourse[] }) => {
			if (action.payload) {
				state.userWishlistedCourses = action.payload;
				// Save to local storage too, to persist state
				if (isClient) {
					window.localStorage.setItem("userWishlistedCourses", JSON.stringify(action.payload));
				}
			}
		},
		setCourseCategories: (state, action: { payload: ICourseCategory[] }) => {
			state.courseCategories = action.payload;
		},
		setNewCourse: (state, action: { payload: ICourse | null }) => {
			state.newCourse = action.payload;
		},
	},
});

export const { setWishlist, setCourseCategories, setNewCourse } = coursesSlice.actions;

export const wishlistedCourses = (state: RootState) => state.courses.userWishlistedCourses;
export const courseCategories = (state: RootState) => state.courses.courseCategories;
export const newCourse = (state: RootState) => state.courses.newCourse;

export default coursesSlice.reducer;
