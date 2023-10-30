import { createSlice } from "@reduxjs/toolkit";
import { IWorkshop } from "../../../interfaces";
import { RootState } from "../../store";
import { slugify } from "../../../utils";

const initialState: {
	workshopToRegister: IWorkshop | null;
	bookmarkedWorkshops: IWorkshop[];
} = {
	workshopToRegister: null,
	bookmarkedWorkshops:
		typeof window !== "undefined" &&
		localStorage.getItem("bookmarkedWorkshops")
			? JSON.parse(localStorage.getItem("bookmarkedWorkshops") as string)
			: [],
};

const workshopSlice = createSlice({
	name: "workshop",
	initialState,
	reducers: {
		setWorkshopToRegister: (
			state,
			action: { payload: IWorkshop | null },
		) => {
			state.workshopToRegister = action.payload;
		},
		addBookmarkWorkshop: (
			state,
			action: { payload: IWorkshop[] | null },
		) => {
			if (action.payload)
				action.payload.forEach((workshop: IWorkshop) => {
					if (
						!state.bookmarkedWorkshops.some(
							(existingBookmark) =>
								slugify(existingBookmark.title) ===
								slugify(existingBookmark.title),
						)
					) {
						state.bookmarkedWorkshops.push(workshop);
					}
				});
			return state;
		},
	},
});

export const { setWorkshopToRegister, addBookmarkWorkshop } =
	workshopSlice.actions;

export const workshopToRegister = (state: RootState) =>
	state.worshop.workshopToRegister;

export const bookmarkedWorkshops = (state: RootState) =>
	state.worshop.bookmarkedWorkshops;

export default workshopSlice.reducer;
