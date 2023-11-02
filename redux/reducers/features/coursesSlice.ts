import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../../interfaces";
import { slugify } from "../../../utils";
import { RootState } from "../../store";
import courses from "../../../data/courses";

const initialState: { userWishlistedCourses: ICourse[] } = {
	userWishlistedCourses: [],
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setWishlist: (state, action: { payload: ICourse[] }) => {
			// action.payload.forEach((course) => {
			// 	if (
			// 		!state.userWishlistedCourses.some(
			// 			(existing) =>
			// 				slugify(existing.title) === slugify(course.title),
			// 		)
			// 	) {
			// 		state.userWishlistedCourses
			// 	}

			// });
			state.userWishlistedCourses = action.payload;
			// return state;
		},
	},
});

export const { setWishlist } = coursesSlice.actions;

export const wishlistedCourses = (state: RootState) =>
	state.courses.userWishlistedCourses;

export default coursesSlice.reducer;
