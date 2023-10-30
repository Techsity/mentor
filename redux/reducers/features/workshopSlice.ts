import { createSlice } from "@reduxjs/toolkit";
import { IWorkshop } from "../../../interfaces";
import { RootState } from "../../store";

const initialState: { workshopToRegister: IWorkshop | null } = {
	workshopToRegister: null,
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
	},
});

export const { setWorkshopToRegister } = workshopSlice.actions;

export const workshopToRegister = (state: RootState) =>
	state.worshop.workshopToRegister;

export default workshopSlice.reducer;
