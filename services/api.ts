import request, { GraphQLClient } from "graphql-request";
import courses from "../data/courses";
import { ICourse } from "../interfaces";
import { slugify } from "../utils";
import { ALL_COURSES } from "./graphql/mutations/courses";
import { DocumentNode } from "graphql";
import { AUTH_TOKEN_KEY } from "../constants";
import { getCookie } from "../utils/auth";
import { InMemoryCache } from "@apollo/client";

const apiEndpoint = "/api/graphql";

const gqlRequestInstance = (args?: { authToken?: string; ssr?: boolean }) => {
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
	const course = courses.find((course) => slugify(course.title) === courseId);
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
	const res = await gqlRequestInstance().request(ALL_COURSES, {
		take: Number(20 || variables?.take),
		skip: Number(variables?.skip !== undefined ? variables.skip : 0),
		...variables,
	});
	return res;
};

//
//
//
//
//
//
//
// const { data, isLoading, error } = useQuery({
// 	queryKey: ["all-courses"],
// 	queryFn: () => API.fetchCourses(),
// 	_optimisticResults: "optimistic",
// });

// useEffect(() => {
// 	if (!isLoading)
// 		if (error) console.error(error);
// 		else {
// 			console.log({ data: data });
// 		}
// }, [data, isLoading]);
