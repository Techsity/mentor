import { CourseType, ICourse, ICourseCategory, ICourseContent } from "../interfaces";
import mentors from "./mentors";
import reviews from "./reviews";

const courseContents: [ICourseContent[], ICourseContent[]] = [
	[
		{
			title: "Introduction to Programming",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Section 1", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 2 notes", section_name: "Section 2", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 3 notes", section_name: "Section 3", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 4 notes", section_name: "Section 4", video_url: "https://vimeo.com/169599296" },
			],
		},
		{
			title: "Basic Introduction",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Section 1", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 2 notes", section_name: "Section 2", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 3 notes", section_name: "Section 3", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 4 notes", section_name: "Section 4", video_url: "https://vimeo.com/169599296" },
			],
		},
		{
			title: "Introduction to Data Structures and Algorithm ",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Section 1", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 2 notes", section_name: "Section 2", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 3 notes", section_name: "Section 3", video_url: "https://vimeo.com/169599296" },
				{ notes: "Section 4 notes", section_name: "Section 4", video_url: "https://vimeo.com/169599296" },
			],
		},
	],
	[
		{
			title: "Basic Introduction",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Introduction", video_url: "https://vimeo.com/169599296" },
				{
					notes: "Section 2 notes",
					section_name: "Basic Requirements",
					video_url: "https://vimeo.com/169599296",
				},
			],
		},
		{
			title: "Basic Introduction",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Introduction", video_url: "https://vimeo.com/169599296" },
				{
					notes: "Section 2 notes",
					section_name: "Basic Requirements",
					video_url: "https://vimeo.com/169599296",
				},
			],
		},
		{
			title: "Who is a Digital Marketer",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Introduction", video_url: "https://vimeo.com/169599296" },
				{
					notes: "Section 2 notes",
					section_name: "Basic Requirements",
					video_url: "https://vimeo.com/169599296",
				},
			],
		},
		{
			title: "Digital Marketing Tools",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Introduction", video_url: "https://vimeo.com/169599296" },
				{
					notes: "Section 2 notes",
					section_name: "Basic Requirements",
					video_url: "https://vimeo.com/169599296",
				},
			],
		},
		{
			title: "Blogging",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Introduction", video_url: "https://vimeo.com/169599296" },
				{
					notes: "Section 2 notes",
					section_name: "Basic Requirements",
					video_url: "https://vimeo.com/169599296",
				},
			],
		},
		{
			title: "Social Media Algorithm",
			course_sections: [
				{ notes: "Section 1 notes", section_name: "Introduction", video_url: "https://vimeo.com/169599296" },
				{
					notes: "Section 2 notes",
					section_name: "Basic Requirements",
					video_url: "https://vimeo.com/169599296",
				},
			],
		},
	],
];

export const courseCategories: ICourseCategory[] = [
	{
		title: "Programming",
		description: "Courses related to programming and software development.",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		title: "Digital Marketing",
		description: "Courses related to programming and software development.",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		title: "Python",
		description: "Courses related to programming and software development.",
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		title: "Data Science",
		description: "Courses related to programming and software development.",
		created_at: new Date(),
		updated_at: new Date(),
	},
];

export const courseTypes: { name: CourseType; categories: ICourseCategory[] }[] = [
	{ name: "technical", categories: courseCategories.slice(0, 2) },
	{ name: "vocational", categories: courseCategories.slice(2) },
	{ name: "educational", categories: [] },
];

const courses: ICourse[] = [
	{
		title: "Introduction to Programming",
		description: "A beginner-friendly course to learn the basics of programming.",
		course_images: "/assets/images/mockups/course_one.png",
		course_level: "BEGINNER",
		duration: 10,
		limit: 50,
		rating: 4.5,
		price: 99.99,
		mentor: mentors[1],
		available: true,
		imgUrl: "/assets/images/mockups/course_one.png",
		requirements: ["No prior programming experience required"],
		course_contents: courseContents[0],
		category: courseCategories[0],
		reviews,
		what_to_learn: [
			"Programming basics",
			"Coding best practices",
			"Programming fundamentals",
			"Problem-solving skills",
		],
	},
	{
		title: "The Basics of Digital Marketing",
		description: "This Beginners Course Teaches You The Basics of Digital Marketing Fast.",
		course_images: "/assets/images/mockups/course_one.png",
		course_level: "BEGINNER",
		duration: 10,
		limit: 50,
		rating: 4.5,
		price: 99.99,
		mentor: mentors[1],
		available: true,
		imgUrl: "/assets/images/mockups/course_one.png",
		requirements: [
			"Mobile Phone",
			"Data and good network area",
			"Book and Jotter",
			"A laptop",
			"Social media tools",
			"Your attention",
		],
		course_contents: courseContents[1],
		category: courseCategories[1],
		reviews,
		what_to_learn: [
			"What is Digital Marketing",
			"Who is a Digital Marketer",
			"How digital marketing works",
			"Digital marketing tools",
			"Social Media Algorithms",
			"Positioning ads to precise target audience",
		],
	},
	{
		title: "The Basics of Digital Marketing",
		description: "This Beginners Course Teaches You The Basics of Digital Marketing.",
		course_images: "/assets/images/mockups/course_one.png",
		course_level: "BEGINNER",
		duration: 10,
		limit: 50,
		rating: 4.5,
		price: 99.99,
		mentor: mentors[1],
		available: true,
		imgUrl: "/assets/images/mockups/course_one.png",
		requirements: [
			"Mobile Phone",
			"Data and good network area",
			"Book and Jotter",
			"A laptop",
			"Social media tools",
			"Your attention",
		],
		course_contents: courseContents[1],
		category: courseCategories[1],
		reviews,
		what_to_learn: [
			"What is Digital Marketing",
			"Who is a Digital Marketer",
			"How digital marketing works",
			"Digital marketing tools",
			"Social Media Algorithms",
			"Positioning ads to precise target audience",
		],
	},
];

export default courses;
