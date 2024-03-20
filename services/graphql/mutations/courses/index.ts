import gql from "graphql-tag";

export const CREATE_COURSE = gql`
	mutation CreateCourse($createCourseInput: CreateCourseInput!, $files: [String!]!) {
		createCourse(createCourseInput: $createCourseInput, files: $files) {
			title
			id
		}
	}
`;

export const SUBSCRIBE_TO_COURSE = gql`
	mutation SubscribeToCourse($courseId: String!) {
		subscribeToCourse(courseId: $courseId) {
			id
			course_id
			is_completed
			created_at
			updated_at
		}
	}
`;
