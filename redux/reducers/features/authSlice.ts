import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthState } from "../../../interfaces/auth.interface";
import { IUser } from "../../../interfaces/user.interface";
import { IMentor } from "../../../interfaces/mentor.interface";

const initialState: IAuthState = {
	isLoggedIn: false,
	user: null,
	resetPasswordState: { email: "", otp: "" },
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setCredentials: (
			state,
			action: { payload: { isLoggedIn: boolean; user: IUser | null; mentorProfile?: IMentor | null } },
		) => {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.user = action.payload.user;
			if (action.payload.mentorProfile && state.user) state.user.mentor = action.payload.mentorProfile;
		},
		logOut: (state) => {
			console.log("Logging out...");
			state.isLoggedIn = false;
			state.user = null;
			return state;
		},
		updateUser: (state, action: { payload: IUser | null }) => {
			state.user = action.payload;
		},
		setResetPasswordState: (state, action: { payload: { email: string; otp: string } }) => {
			state.resetPasswordState = action.payload;
			return state;
		},
		switchProfile: (state, action: { payload: { profile: IMentor | null } }) => {
			if (state?.user) state.user.mentor = action.payload.profile;
		},
	},
});

export const { setCredentials, logOut, updateUser, setResetPasswordState, switchProfile } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const currentUser = (state: RootState) => state.auth.user;
export const resetPasswordState = (state: RootState) => state.auth.resetPasswordState;

export default authSlice.reducer;
