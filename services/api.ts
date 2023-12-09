import courses from "../data/courses";
import { ICourse } from "../interfaces";
import { slugify } from "../utils";

export const getMentorCourses = (username: string): ICourse[] => {
	const mentorCourses: ICourse[] = courses.filter((course) => course.mentor.user.name === username);
	if (!mentorCourses) return [];
	return mentorCourses;
};
export const getCourseById = (courseId: string): ICourse | null => {
	const course = courses.find((course) => slugify(course.title) === courseId);
	// const course: ICourse = courses.find((course) => slugify(course.title) === courseId) as ICourse;
	if (!course) return null;
	return course;
};
