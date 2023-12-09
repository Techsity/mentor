import { IMentor } from "../interfaces/mentor.interface";
import { dummyUsers } from "./user";

const mentors: IMentor[] = [
	{
		about: "Experienced software engineer with a passion for teaching.",
		courses: [],
		followers: 20000,
		role: "Software Engineer",
		hourly_rate: 320,
		skills: [
			{ skill_name: "Javascript", years_of_exp: 6 },
			{ skill_name: "React", years_of_exp: 6 },
			{ skill_name: "Golang", years_of_exp: 6 },
			{ skill_name: "Python", years_of_exp: 6 },
			{ skill_name: "Docker", years_of_exp: 6 },
			{ skill_name: "HTML", years_of_exp: 6 },
		],
		mentor_verified: true,
		availability: [
			{ day: "Mon", timeSlots: [{ endTime: "12pm", startTime: "9am" }] },
			{ day: "Tue", timeSlots: [{ endTime: "12pm", startTime: "9am" }] },
			{ day: "Fri", timeSlots: [{ endTime: "12pm", startTime: "9am" }] },
		],
		certifications: [
			{ organization: "AWS", title: "Certified AWS Builder", year: "2021" },
			{ organization: "Docker", title: "Certifed Kubenetes Engineer", year: "2023" },
		],
		education_bg: [
			{ endDate: "2022", school: "National Open University of Nigeria", startDate: "2018" },
			{ endDate: "2022", school: "National Open University of Nigeria", startDate: "2018" },
		],
		exp_level: "LEVEL_3",
		language: ["English"],
		projects: [],
		reviews: [],
		id: "c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e",
		user: dummyUsers[2],
		work_experience: [
			{
				company: "Lorem Ipsum",
				description: "wodifushejdu efuefuou uejf",
				from_year: "2022",
				job_role: "DevRel",
				to_year: "2023",
			},
		],
	},
	{
		about: "Experienced software engineer with a passion for teaching.",
		courses: [],
		followers: 20000,
		role: "Software Engineer",
		hourly_rate: 320,
		skills: [
			{ skill_name: "Javascript", years_of_exp: 6 },
			{ skill_name: "React", years_of_exp: 6 },
			{ skill_name: "Golang", years_of_exp: 6 },
			{ skill_name: "Python", years_of_exp: 6 },
			{ skill_name: "Docker", years_of_exp: 6 },
			{ skill_name: "HTML", years_of_exp: 6 },
		],
		mentor_verified: true,
		availability: [
			{ day: "Mon", timeSlots: [{ endTime: "12pm", startTime: "9am" }] },
			{ day: "Tue", timeSlots: [{ endTime: "12pm", startTime: "9am" }] },
			{ day: "Fri", timeSlots: [{ endTime: "12pm", startTime: "9am" }] },
		],
		certifications: [
			{ organization: "AWS", title: "Certified AWS Builder", year: "2021" },
			{ organization: "Docker", title: "Certifed Kubenetes Engineer", year: "2023" },
		],
		education_bg: [
			{ endDate: "2022", school: "National Open University of Nigeria", startDate: "2018" },
			{ endDate: "2022", school: "National Open University of Nigeria", startDate: "2018" },
		],
		exp_level: "LEVEL_3",
		language: ["English"],
		projects: [],
		reviews: [],
		id: "c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e",
		user: dummyUsers[1],
		work_experience: [
			{
				company: "Lorem Ipsum",
				description: "wodifushejdu efuefuou uejf",
				from_year: "2022",
				job_role: "DevRel",
				to_year: "2023",
			},
		],
	},
];

export default mentors;
