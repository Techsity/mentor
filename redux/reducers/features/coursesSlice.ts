import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../../interfaces";
import { slugify } from "../../../utils";
import { RootState } from "../../store";

const initialState: { userWishlistedCourses: ICourse[] } = {
	userWishlistedCourses: [],
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setWishlist: (state, action: { payload: ICourse[] }) => {
			if (action.payload) {
				action.payload.forEach((course) => {
					if (
						!state.userWishlistedCourses.some(
							(existing) =>
								slugify(existing.title) ===
								slugify(course.title),
						)
					) {
						state.userWishlistedCourses.push(course);
					}
				});
			}
			return state;
		},
	},
});

export const { setWishlist } = coursesSlice.actions;

export const wishlistedCourses = (state: RootState) =>
	state.courses.userWishlistedCourses;

export default coursesSlice.reducer;
