import gql from "graphql-tag";

export const CREATE_COURSE = gql`
	mutation CreateCourse($createCourseInput: CreateCourseInput!, $files: [String!]!) {
		createCourse(createCourseInput: $createCourseInput, files: $files) {
			title
			id
		}
	}
`;
