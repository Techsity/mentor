import { createSlice } from "@reduxjs/toolkit";
import { IMentorOnboardingState } from "../../interfaces/mentor.interface";
import { IUserOnboardingState } from "../../interfaces/user.interface";
import { RootState } from "../store";

export const initialMentorOnboardingState: IMentorOnboardingState = {
	currentStep: 1,
	agreedToTerms: false,
	user: null,
	bio: "",
	role: "",
	skills: [],
	yearsOfExp: 0,
	workHistory: [],
	projects: [],
	education: [],
	certificates: [],
	languages: [],
	availability: [],
};
export const initialUserOnboardingState: IUserOnboardingState = {
	country: "",
	email: "",
	fullName: "",
	phone: "",
};

const initialState = {
	mentor: initialMentorOnboardingState,
	user: initialUserOnboardingState,
};

const onboardingSlice = createSlice({
	name: "onboarding",
	initialState,
	reducers: {
		setOnboardingMentor: (state, action: { payload: IMentorOnboardingState | null }) => {
			if (action.payload !== null) state.mentor = action.payload;
			else state.mentor = initialMentorOnboardingState;
			// action.payload.user = null;
			// setLocalStorage("onboardingMentor", JSON.stringify({ ...action.payload }));
		},
		setOnboardingUser: (state, action: { payload: IUserOnboardingState | null }) => {
			if (action.payload !== null) state.user = action.payload;
			else state.user = initialUserOnboardingState;
		},
	},
});

export const { setOnboardingMentor, setOnboardingUser } = onboardingSlice.actions;

export const mentorOnboardingTermsAgreed = (state: RootState) => Boolean(state.onboarding.mentor.agreedToTerms);

export const onboardingMentorState = (state: RootState) => state.onboarding.mentor;
export const onboardingUserState = (state: RootState) => state.onboarding.user;

export default onboardingSlice.reducer;
