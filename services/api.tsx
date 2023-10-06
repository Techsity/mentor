import courses from "../data/courses";
import { ICourse } from "../interfaces";

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
