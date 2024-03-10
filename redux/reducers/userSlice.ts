import { createSlice } from "@reduxjs/toolkit";
import { ICourse, ICourseCategory } from "../../interfaces";
import { RootState } from "../store";

const initialState: { userWishlistedCourses: ICourse[] } = { userWishlistedCourses: [] };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setWishlist: (state, action: { payload: ICourse[] }) => {
			state.userWishlistedCourses = action.payload;
		},
	},
});

export const { setWishlist } = userSlice.actions;

export const wishlistedCourses = (state: RootState) => state.user.userWishlistedCourses;

export default userSlice.reducer;
