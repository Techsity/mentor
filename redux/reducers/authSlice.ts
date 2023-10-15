import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAuthState } from "../../interfaces/auth.interface";
import { IUser } from "../../interfaces/user.interface";

const initialState: IAuthState = {
	isLoggedIn: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setLoggedIn: (state, action: { payload: boolean }) => {
			state.isLoggedIn = action.payload;
		},
		setUser: (state, action: { payload: IUser | null }) => {
			state.user = action.payload;
		},
		logOut: (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

export const { setLoggedIn, setUser, logOut } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
