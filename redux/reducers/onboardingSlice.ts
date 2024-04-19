import { createSlice } from "@reduxjs/toolkit";
import { IMentorOnboardingState, MentorOnboardingTimeSlot } from "../../interfaces/mentor.interface";
import { IUserOnboardingState } from "../../interfaces/user.interface";
import { RootState } from "../store";
import { daysOfTheWeek } from "../../constants";

const initialAvailabilityState: MentorOnboardingTimeSlot[] = [
	{
		day: "monday",
		isAvailable: true,
		timeSlots: [
			{ endTime: "15:50", startTime: "12:00" },
			{ endTime: "15:50", startTime: "12:00" },
			{ endTime: "18:00", startTime: "16:00" },
		],
	},
	{
		day: "wednesday",
		isAvailable: true,
		timeSlots: [
			{ endTime: "15:50", startTime: "12:00" },
			{ endTime: "15:50", startTime: "12:00" },
			{ endTime: "18:00", startTime: "16:00" },
		],
	},
];

// Todo: temporary
const mergedAvailabilityState = daysOfTheWeek.map((day) => {
	const initialStateForDay = initialAvailabilityState.find((state) => state.day.toLowerCase() === day.toLowerCase());
	return initialStateForDay
		? { ...initialStateForDay, timeSlots: [...initialStateForDay.timeSlots] }
		: { day, isAvailable: false, timeSlots: [] };
});

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
	availability: mergedAvailabilityState,
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
