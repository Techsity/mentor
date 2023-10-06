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
						price: 3900,
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 5500,
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 5500,
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 3500,
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Digital Marketing",
			},
			{
				availableCourses: [
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Web Development",
			},
			{ availableCourses: [], title: "Python" },
			{
				availableCourses: [
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Data Science",
			},
			{ availableCourses: [], title: "Cyber Security" },
			{ availableCourses: [], title: "Robotics" },
		],
	},
	{
		section: "Vocational",
		categories: [
			{ availableCourses: [], title: "Web Development" },
			{
				availableCourses: [
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 3900,
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Digital",
			},
			{ availableCourses: [], title: "Robotics" },
		],
	},
	{
		section: "Educational",
		categories: [
			{ availableCourses: [], title: "Web Development" },
			{
				availableCourses: [
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Digital",
			},
			{
				availableCourses: [
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						available: true,
						description:
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3",
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Robotics",
			},
		],
	},
];

export default courses;
