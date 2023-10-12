import courses from "../data/courses";
import { ICourse } from "../interfaces";
import { slugify } from "../utils";

export const getMentorCourses = (username: string): ICourse[] => {
	const mentorCourses: ICourse[] = courses.flatMap((section) =>
		section.categories.flatMap((category) =>
			category.availableCourses.filter(
				(course) => course.mentor.username === username,
			),
		),
	);
	if (!mentorCourses) return [];
	return mentorCourses;
};
export const getCourseById = (courseId: string): ICourse | null => {
	// const course = courses.find((course) => slugify(course.title) === courseId);
	const course: ICourse = courses.flatMap((section) =>
		section.categories.flatMap((category) =>
			category.availableCourses.filter(
				(course) => slugify(course.title) === courseId,
			),
		),
	)[0];
	if (!course) return null;
	return course;
};
