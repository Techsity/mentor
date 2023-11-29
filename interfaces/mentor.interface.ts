import { CountryCode } from "react-country-flags-select/dist/types";
import { ICourse } from "./index";
import { IUser } from "./user.interface";
import { ISchedule } from "../components/ui/organisms/mentor/onboarding/steps/step-four/Availability";

export interface IMentorEducation {
	school: {
		name: string;
	};
	endDate: string;
	startDate: string;
	course?: string;
	degree?: string;
}
export interface IMentorOnboardingState {
	currentStep: number;
	agreedToTerms: boolean;
	user?: IUser | null;
	jobTitle: string;
	bio: string;
	skills: string[];
	yearsOfExp: number;
	projects: IMentorProjectType[];
	certificates: { institution: string; type: string; year: string }[];
	workHistory?: IExperience[];
	education: IMentorEducation[];
	languages: string[];
	availability: ISchedule[];
}

export type RefrencedMentorType = Omit<IMentor, "projects" | "experience">;
export type RefrencedMenteeType = Omit<IMentee, "mentors">;

export interface IMentee {
	name: string;
	username: string;
	mentors: RefrencedMentorType[];
}

export type IMentorProjectType = {
	title: string;
	link: string;
	type: "Freelance" | "Contract" | "Official" | "";
};
export interface IMentor extends IUser {
	username: string;
	jobTitle: string;
	experience?: IExperience[];
	projects?: IMentorProjectType[];
	mentees: RefrencedMenteeType[];
	subscribers: number;
	sessions: number;
	rating: number;
	skills: string[];
	daysOpen: string[];
	verified: boolean;
	ratePerHour: number;
	about: string;
	education?: IMentorEducation[];
	languages: string[];
	followers: number;
	courses: ICourse[];
}

export interface IMentorshipSession {
	date: Date;
	pending: boolean;
	concluded: boolean;
	upcoming: boolean;
	mentor: IMentor;
}

export interface IExperience {
	id?: string;
	position: string;
	company: { name: string; logo?: string };
	topSkills: string[];
	roles?: string[];
	role?: string;
	aboutRole?: string;
	startDate: string;
	endDate: string;
	country?: CountryCode;
}
