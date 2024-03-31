import { ICourse, IReview } from "./index";
import { IUser } from "./user.interface";

export interface IMentorEducation {
	course_of_study: string;
	credential_type: string;
	from_year: string;
	school: string;
	to_year: string;
}
export interface IMentorOnboardingState {
	currentStep: number;
	agreedToTerms: boolean;
	user?: IUser | null;
	role: string;
	bio: string;
	skills: IMentorSkills[];
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
export type TimeSlot = { endTime: string; startTime: string; isOpen: boolean };

export type IMentorAvailability = {
	id?: string;
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
	role: string;
	followers: Pick<IUser, "id">[];
	skills: IMentorSkills[];
	availability: IMentorAvailability[];
	certifications: IMentorCertificate[];
	education_bg: IMentorEducation[];
	appointments: IAppointment[];
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

export enum AppointmentStatus {
	PENDING = "PENDING",
	AWAITING_PAYMENT = "AWAITING_PAYMENT",
	ACCEPTED = "ACCEPTED",
	UPCOMING = "UPCOMING",
	IN_PROGRESS = "IN_PROGRESS",
	DECLINED = "DECLINED",
	CANCELLED_BY_USER = "CANCELLED_BY_USER",
	CANCELLED_BY_MENTOR = "CANCELLED_BY_MENTOR",
	NO_SHOW = "	NO_SHOW",
	COMPLETED = "COMPLETED",
	OVERDUE = "OVERDUE",
	RESCHEDULED_BY_USER = "RESCHEDULED_BY_USER",
	RESCHEDULED_BY_MENTOR = "RESCHEDULED_BY_MENTOR",
}

export interface IAppointment {
	id: string;
	paymentReference?: string;
	date: Date;
	status: AppointmentStatus;
	user: IUser;
	mentor: IMentor;
	created_at: Date;
	updated_at: Date;
}
