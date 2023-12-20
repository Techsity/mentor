import gql from "graphql-tag";

export const ALL_COURSES = gql`
	query allCourses($take: Float!, $skip: Float!, $category: String, $courseType: String) {
		allCourses(take: $take, skip: $skip, category: $category, courseType: $courseType) {
			category {
				title
			}
			course_contents {
				title
				course_sections {
					notes
					section_name
				}
			}
			course_images
			course_level
			description
			mentor {
				about
				courses {
					category {
						description
						title
					}
					title
					description
				}
				about
				mentor_verified
				role
				skills {
					skill_name
					years_of_exp
				}
			}
			price
			reviews {
				content
				ratings
				reviewed_by {
					name
					country
				}
				type
			}
			title
			what_to_learn
			created_at
			requirements
			updated_at
		}
	}
`;
export const GET_ALL_CATEGORIES = gql`
	query GetAllCategories {
		getAllCategories {
			title
			description
			category_type {
				description
				type
			}
			created_at
			updated_at
		}
	}
`;
