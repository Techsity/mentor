import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/auth.interface";
import { IMentor } from "../../interfaces/mentor.interface";
import { IUser } from "../../interfaces/user.interface";
import { RootState } from "../store";

const initialState: IAuthState = {
	isLoggedIn: false,
	user: null,
	resetPasswordState: null,
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
			// console.log("Logging out...");
			state.isLoggedIn = false;
			state.user = null;
			return state;
		},
		updateUserProfile: (state, action: { payload: Partial<IUser> | null }) => {
			if (action.payload) {
				state.isLoggedIn = true;
				state.user = { ...state.user, ...action.payload } as IUser | null;
			}
		},
		updateMentorProfile: (state, action: { payload: Partial<IMentor> | null }) => {
			if (state.user) state.user.mentor = action.payload as IMentor | null;
		},
		setResetPasswordState: (state, action: { payload: { email: string } | null }) => {
			state.resetPasswordState = action.payload;
			return state;
		},
		switchProfile: (state, action: { payload: { profile: IMentor | null } }) => {
			if (state?.user) state.user.mentor = action.payload.profile;
		},
	},
});

export const { setCredentials, logOut, updateUserProfile, setResetPasswordState, switchProfile, updateMentorProfile } =
	authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const currentUser = (state: RootState) => state.auth.user;
export const resetPasswordState = (state: RootState) => state.auth.resetPasswordState;

export default authSlice.reducer;
