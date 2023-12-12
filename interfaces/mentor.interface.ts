import { CountryCode } from "react-country-flags-select/dist/types";
import { ICourse, IReview } from "./index";
import { IUser } from "./user.interface";
import { MENTOR_ROLES } from "../constants/mentor";

export interface IMentorEducation {
	school: string;
	endDate: string;
	startDate: string;
	course?: string;
	degree?: string;
}
export interface IMentorOnboardingState {
	currentStep: number;
	agreedToTerms: boolean;
	user?: IUser | null;
	role: MENTOR_ROLES | null;
	bio: string;
	skills: string[];
	yearsOfExp: number;
	projects: IMentorProjectType[];
	certificates: IMentorCertificate[];
	workHistory?: IMentorExperience[];
	education: IMentorEducation[];
	languages: string[];
	availability: IMentorAvailability[];
}

export type RefrencedMentorType = Omit<IMentor, "projects" | "experience">;

export type IMentorSkills = {
	skill_name: string;
	years_of_exp: number;
};
export type TimeSlot = { endTime: string; startTime: string };

export type IMentorAvailability = {
	day: string;
	timeSlots: TimeSlot[];
};

export type IMentorProjectType = {
	company: string;
	description: string;
	job_role: string;
};

export type IMentorCertificate = {
	organization: string;
	title: string;
	year: string;
};

export enum IMentorExpLevel {
	LEVEL_1 = "LEVEL_1",
	LEVEL_2 = "LEVEL_2",
	LEVEL_3 = "LEVEL_3",
	LEVEL_4 = "LEVEL_4",
}

export interface IMentor {
	id: string;
	user: IUser;
	about: string;
	courses: ICourse[];
	// courses: Omit<ICourse,"mentor">[];
	mentor_verified: boolean;
	role: MENTOR_ROLES;
	followers: number;
	skills: IMentorSkills[];
	availability: IMentorAvailability[];
	certifications: IMentorCertificate[];
	education_bg: IMentorEducation[];
	hourly_rate: number;
	exp_level: IMentorExpLevel;
	work_experience: IMentorExperience[];
	language: string[];
	projects: IMentorProjectType[];
	reviews: IReview[];
	created_at?: string;
	updated_at?: string;
}

export interface IMentorshipSession {
	date: string;
	pending: boolean;
	concluded: boolean;
	upcoming: boolean;
	mentor: IMentor;
}

export interface IMentorExperience {
	company: string;
	description: string;
	job_role: string;
	from_year: string;
	to_year: string;
}
