import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthState } from "../../../interfaces/auth.interface";
import { IUser } from "../../../interfaces/user.interface";

const initialState: IAuthState = {
	isLoggedIn: false,
	user: null,
	// typeof window !== "undefined" && window.localStorage.getItem("userData")
	// 	? JSON.parse(window.localStorage.getItem("userData") as string)
	// 	: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setCredentials: (
			state,
			action: { payload: { isLoggedIn: boolean; user: IUser | null } },
		) => {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.user = action.payload.user;
		},
		logOut: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
