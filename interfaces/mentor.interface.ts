import { CountryCode } from "react-country-flags-select/dist/types";
import { ICourse, IReview } from "./index";
import { IUser } from "./user.interface";
import { ISchedule } from "../components/ui/organisms/mentor/onboarding/steps/step-four/Availability";
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
	certificates: { institution: string; type: string; year: string }[];
	workHistory?: IMentorExperience[];
	education: IMentorEducation[];
	languages: string[];
	availability: ISchedule[];
}

export type RefrencedMentorType = Omit<IMentor, "projects" | "experience">;

type IMentorSkills = {
	skill_name: string;
	years_of_exp: number;
};

type IMentorAvailability = {
	day: string;
	timeSlots: {
		endTime: string;
		startTime: string;
	}[];
};

export type IMentorProjectType = {
	company: string;
	description: string;
	job_role: string;
};

type IMentorCertificate = {
	organization: string;
	title: string;
	year: string;
};

type IMentorExpLevel = "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "LEVEL_4";
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
