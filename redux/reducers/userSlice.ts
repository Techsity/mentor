import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../interfaces";
import { RootState } from "../store";

export type CurrentProfile = "mentee" | "mentor";

const initialState: { userWishlistedCourses: ICourse[]; currentProfile: CurrentProfile } = {
	userWishlistedCourses: [],
	currentProfile: "mentee",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setWishlist: (state, action: { payload: ICourse[] }) => {
			state.userWishlistedCourses = action.payload;
		},
		setCurrentProfile: (state, action: { payload: CurrentProfile }) => {
			state.currentProfile = action.payload;
		},
	},
});

export const { setWishlist, setCurrentProfile } = userSlice.actions;

export const activeProfile = (state: RootState) => state.user.currentProfile;
export const wishlistedCourses = (state: RootState) => state.user.userWishlistedCourses;

export default userSlice.reducer;
