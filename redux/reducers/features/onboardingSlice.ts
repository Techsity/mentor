import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../../interfaces/user.interface";
import { IMentorOnboardingState } from "../../../interfaces/mentor.interface";

const initialMentorOnboardingState: IMentorOnboardingState = {
	currentStep: 1,
	agreedToTerms: false,
	user: null,
	bio: "",
	role: null,
	skills: [],
	yearsOfExp: 1,
	workHistory: [],
	projects: [],
	education: [],
	certificates: [],
	languages: [],
	availability: [],
};

const initialUserOnboardingState: { user: IUser | null } = { user: null };

const initialState = {
	mentor: initialMentorOnboardingState,
	user: initialUserOnboardingState,
};

const onboardingSlice = createSlice({
	name: "onboarding",
	initialState,
	reducers: {
		setOnboardingMentor: (state, action: { payload: IMentorOnboardingState }) => {
			state.mentor = action.payload;
		},
		setOnboardingUser: (state, action: {}) => {},
	},
});

export const { setOnboardingMentor } = onboardingSlice.actions;

export const mentorOnboardingTermsAgreed = (state: RootState) => state.onboarding.mentor.agreedToTerms;

export const onboardingMentorState = (state: RootState) => state.onboarding.mentor;

export default onboardingSlice.reducer;
