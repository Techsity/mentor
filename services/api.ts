import request, { GraphQLClient } from "graphql-request";
import courses from "../data/courses";
import { ICourse, IWorkshop } from "../interfaces";
import { slugify } from "../utils";
import { ALL_COURSES } from "./graphql/mutations/courses";
import { DocumentNode } from "graphql";
import { AUTH_TOKEN_KEY } from "../constants";
import { getCookie } from "../utils/auth";
import { InMemoryCache } from "@apollo/client";
import { VIEW_MENTOR_PROFILE } from "./graphql/mutations/mentors";
import mentors from "../data/mentors";
import workshops from "../data/workshops";
import { IMentor } from "../interfaces/mentor.interface";
import { dummyUsers } from "../data/user";
import { IUser } from "../interfaces/user.interface";

const apiEndpoint = "/api/graphql";

export const gqlRequestInstance = (args?: { authToken?: string; ssr?: boolean }) => {
	const { authToken, ssr } = args || {};
	const token = authToken ? authToken : typeof window !== "undefined" && (getCookie(AUTH_TOKEN_KEY) as string);
	// If there's no token, return the original headers
	const headers = {
		Authorization: `Bearer ${token}`,
	};
	const client = new GraphQLClient(ssr ? (process.env.NEXT_PUBLIC_API_BASE_URL as string) : apiEndpoint, {
		headers,
		// cache: "force-cache",
	});

	return client;
};

export const getMentorCourses = (username: string): ICourse[] => {
	const mentorCourses: ICourse[] = courses.filter((course) => course.mentor.user.name === username);
	if (!mentorCourses) return [];
	return mentorCourses;
};
export const getCourseById = (courseId: string): ICourse | null => {
	const course = courses.find((course) => slugify(course.title) === slugify(courseId));
	// const course: ICourse = courses.find((course) => slugify(course.title) === courseId) as ICourse;
	if (!course) return null;
	return course;
};

export const fetchCourses = async (variables?: {
	take?: number;
	skip?: number;
	category?: string;
	courseType?: string;
}) => {
	return await gqlRequestInstance().request(ALL_COURSES, {
		take: Number(20 || variables?.take),
		skip: Number(variables?.skip !== undefined ? variables.skip : 0),
		...variables,
	});
};

export const viewMentor = async ({ viewMentorId }: { viewMentorId: string }) => {
	return await gqlRequestInstance().request(VIEW_MENTOR_PROFILE, { viewMentorId });
};

const randomDateWithinLast30Days = () => {
	const currentDate = new Date();
	const numberOfDaysToAdd = Math.ceil(Math.random() * 30);
	const newDateMilliseconds = currentDate.getTime() - numberOfDaysToAdd * 24 * 60 * 60 * 1000;
	return new Date(newDateMilliseconds);
};

export const fetchAllCourses = async (args?: { skip?: number; limit?: number }): Promise<Partial<ICourse>[]> => {
	const { limit = 10, skip = 0 } = args || {};
	return new Promise<Partial<ICourse>[]>((resolve) => {
		setTimeout(() => {
			resolve(coursesRecord.slice(skip, skip + limit));
		}, 2000);
	});
};

export const fetchAllWorkshops = async (args?: { skip?: number; limit?: number }): Promise<Partial<IWorkshop>[]> => {
	const { limit = 10, skip = 0 } = args || {};
	return new Promise<Partial<IWorkshop>[]>((resolve) => {
		setTimeout(() => {
			resolve(workshops.slice(skip, skip + limit));
		}, 2000);
	});
};

export const fetchAllMentors = async (args?: { skip?: number; limit?: number }): Promise<Partial<IMentor>[]> => {
	const { limit = 10, skip = 0 } = args || {};
	return new Promise<Partial<IMentor>[]>((resolve) => {
		setTimeout(() => {
			resolve(mentors.slice(skip, skip + limit));
		}, 2000);
	});
};
export const fetchAllUsers = async (args?: { skip?: number; limit?: number }): Promise<Partial<IUser>[]> => {
	const { limit = 10, skip = 0 } = args || {};
	return new Promise<Partial<IUser>[]>((resolve) => {
		setTimeout(() => {
			resolve(dummyUsers.slice(skip, skip + limit));
		}, 2000);
	});
};

const coursesRecord: Partial<ICourse>[] = [
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 12500,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 12500,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 12500,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 12500,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 12500,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "vocational",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 20000,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 4999,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "vocational",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 4999,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "educational",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 4999,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "vocational",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 4999,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "educational",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
	{
		title: `${randomDateWithinLast30Days().getDate()}` + "Digital Marketing for beginners",
		mentor: mentors[1],
		price: 0,
		rating: 4.2,
		created_at: randomDateWithinLast30Days().toLocaleDateString(),
		course_type: "technical",
	},
];
