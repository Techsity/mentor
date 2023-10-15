import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAuthState } from "../../interfaces/auth.interface";

const initialState: IAuthState = {
	isLoggedIn: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUser: (state, action) => {
			state.isLoggedIn = action.payload;
		},
	},
});

export const { setLoggedIn, setUser } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
