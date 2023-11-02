import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../../interfaces";
import { RootState } from "../../store";

const isClient = typeof window !== "undefined" && window.localStorage;

const userWishlistedCoursesLocal = isClient
	? window.localStorage.getItem("userWishlistedCourses") || ""
	: "";

const data: ICourse[] = userWishlistedCoursesLocal
	? JSON.parse(userWishlistedCoursesLocal)
	: [];

const initialState: { userWishlistedCourses: ICourse[] } = {
	userWishlistedCourses: data,
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
					window.localStorage.setItem(
						"userWishlistedCourses",
						JSON.stringify(action.payload),
					);
				}
			}
		},
	},
});

export const { setWishlist } = coursesSlice.actions;

export const wishlistedCourses = (state: RootState) =>
	state.courses.userWishlistedCourses;

export default coursesSlice.reducer;
