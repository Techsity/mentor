import { COURSE_LEVEL } from "./index";

type CourseContentSection = {
	section_name: string;
	notes: string;
};
type CourseContent = {
	title: string;
	course_sections: CourseContentSection[];
};

export interface CreateCourseVariables {
	createCourseInput: {
		category: string;
		course_contents: CourseContent[];
		course_level: COURSE_LEVEL;
		course_images: string;
		description: string;
		price: number;
		requirements: string[];
		what_to_learn: string[];
		title: string;
	};
	files: any[];
}
