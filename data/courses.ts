import { ICourseCategory } from "../interfaces";

const courses: {
	section: "Technical" | "Vocational" | "Educational";
	categories: ICourseCategory[];
}[] = [
	{
		section: "Technical",
		categories: [
			{
				availableCourses: [
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						free: true,
						level: "All Level",
						limit: 20000,
						mentor: { name: "Darey Oloye", avatar: "/assets/images/avatar.png" },
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						free: true,
						level: "All Level",
						limit: 20000,
						mentor: { name: "Darey Oloye", avatar: "/assets/images/avatar.png" },
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						free: true,
						level: "All Level",
						limit: 20000,
						mentor: { name: "Darey Oloye", avatar: "/assets/images/avatar.png" },
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						free: true,
						level: "All Level",
						limit: 20000,
						mentor: { name: "Darey Oloye", avatar: "/assets/images/avatar.png" },
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Digital Marketing",
			},
			{ availableCourses: [], title: "Web Development" },
			{ availableCourses: [], title: "Python" },
			{ availableCourses: [], title: "Data Science" },
			{ availableCourses: [], title: "Cyber Security" },
			{ availableCourses: [], title: "Robotics" },
		],
	},
	{
		section: "Vocational",
		categories: [
			{ availableCourses: [], title: "Web Development" },
			{ availableCourses: [], title: "Digital" },
			{ availableCourses: [], title: "Robotics" },
		],
	},
];

export default courses;
