export interface ICourse {
	title: string;
	description: string;
	level: "All Level" | "Intermediate" | "Beginner" | "Advanced";
	duration: number;
	limit: number;
	rating: number;
	free: boolean;
	mentor: { name: string; avatar: string };
	available: boolean;
	imgUrl: string;
}

export interface ICourseCategory {
	title: string;
	availableCourses: ICourse[];
}

export interface IMentor {
	name: string;
	jobTitle: string;
	experience: number;
	sessions: number;
	rating: number;
	avatar: string;
	skills: string[];
	daysOpen: string[];
}
