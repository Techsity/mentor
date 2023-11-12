import { CountryCode } from "react-country-flags-select/dist/types";
import { ICourse } from "./index";
import { IUser } from "./user.interface";

export interface IMentorOnboardingState {
	currentStep: number;
	agreedToTerms: boolean;
	user?: IUser | null;
	jobTitle: string;
	bio: string;
	skills: string[];
	projects: { name: string; link: string; nature: string }[];
	yearsOfExp: number;
	workHistory?: (Pick<
		IExperience,
		"company" | "endDate" | "startDate" | "position" | "topSkils"
	> & { aboutRole?: string; role: string })[];
	education: {
		school: {
			name: string;
		};
		endDate: string;
		startDate: string;
		course?: string;
		degree?: string;
	}[];
}

export type RefrencedMentorType = Omit<IMentor, "projects" | "experience">;
export type RefrencedMenteeType = Omit<IMentee, "mentors">;

export interface IMentee {
	name: string;
	username: string;
	mentors: RefrencedMentorType[];
}
export interface IMentor {
	name: string;
	username: string;
	jobTitle: string;
	experience?: IExperience[];
	projects?: {
		title: string;
		link: string;
		type: "Freelance" | "Contract" | "Official";
	}[];
	mentees: RefrencedMenteeType[];
	subscribers: number;
	sessions: number;
	rating: number;
	avatar: string;
	skills: string[];
	daysOpen: string[];
	online: boolean;
	verified: boolean;
	ratePerHour: number;
	about: string;
	country: CountryCode;
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
	position: string;
	company: { name: string; logo?: string };
	topSkils: string[];
	roles: string[];
	startDate: string;
	endDate: string;
	country?: CountryCode;
}
