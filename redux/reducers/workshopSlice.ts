import { createSlice } from "@reduxjs/toolkit";
import { IWorkshop } from "../../interfaces";
import { slugify } from "../../utils";
import { RootState } from "../store";

const initialState: {
	workshopToRegister: IWorkshop | null;
	bookmarkedWorkshops: IWorkshop[];
} = {
	workshopToRegister: null,
	bookmarkedWorkshops:
		typeof window !== "undefined" && localStorage.getItem("bookmarkedWorkshops")
			? JSON.parse(localStorage.getItem("bookmarkedWorkshops") as string)
			: [],
};

const workshopSlice = createSlice({
	name: "workshop",
	initialState,
	reducers: {
		setWorkshopToRegister: (state, action: { payload: IWorkshop | null }) => {
			state.workshopToRegister = action.payload;
		},
		addBookmarkWorkshop: (state, action: { payload: IWorkshop[] | null }) => {
			if (action.payload)
				action.payload.forEach((workshop: IWorkshop) => {
					if (
						!state.bookmarkedWorkshops.some(
							(existingBookmark) => slugify(existingBookmark.title) === slugify(existingBookmark.title),
						)
					) {
						state.bookmarkedWorkshops.push(workshop);
					}
				});
			return state;
		},
	},
});

export const { setWorkshopToRegister, addBookmarkWorkshop } = workshopSlice.actions;

export const workshopToRegister = (state: RootState) => state.workshop.workshopToRegister;

export const bookmarkedWorkshops = (state: RootState) => state.workshop.bookmarkedWorkshops;

export default workshopSlice.reducer;
