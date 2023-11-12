import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../../interfaces/user.interface";
import { IMentorOnboardingState } from "../../../interfaces/mentor.interface";

const initialMentorOnboardingState: IMentorOnboardingState = {
	currentStep: 1,
	agreedToTerms: false,
	user: null,
	bio: "",
	jobTitle: "",
	skills: [],
	yearsOfExp: 1,
	workHistory: [],
	projects: [],
	education: [],
	certificates: [],
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
		setOnboardingMentor: (
			state,
			action: { payload: IMentorOnboardingState },
		) => {
			const { payload } = action;
			// if (payload.agreedToTerms) {
			// fetch("https://ipinfo.io/json")
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		console.log("IP Address:", data.ip);
			// 	})
			// 	.catch((error) =>
			// 		console.error("Error fetching IP address:", error),
			// 	);
			// localStorage.setItem("agreedToTerms", JSON.stringify({mentorOnboardingIP:,agreedToTerms:true}));
			// }
			state.mentor = action.payload;
		},
		setOnboardingUser: (state, action: {}) => {},
	},
});

export const { setOnboardingMentor } = onboardingSlice.actions;

export const mentorOnboardingTermsAgreed = (state: RootState) =>
	state.onboarding.mentor.agreedToTerms;

export const onboardingMentor = (state: RootState) => state.onboarding.mentor;

export default onboardingSlice.reducer;
