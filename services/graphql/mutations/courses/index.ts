import gql from "graphql-tag";

export const ALL_COURSES = gql`
	query AllCourses($take: Float!, $skip: Float!, $courseType: String, $category: String) {
		allCourses(take: $take, skip: $skip, courseType: $courseType, category: $category) {
			title
			description
			what_to_learn
			requirements
			price
			course_images
			course_level
			mentor {
				...MentorFields
			}
			category {
				title
				description
			}
			course_type {
				type
				description
			}
		}
	}
	# Use fragment to avoid deeply nested queries (N+1 query issues)
	fragment MentorFields on MentorDTO {
		user {
			...UserFields
		}
		about
		role
		skills {
			skill_name
			years_of_exp
		}
		# work_experience {
		# 	...WorkExperience
		# }
		# projects {
		# 	...Project
		# }
		# Fetch the needed fields
	}

	fragment UserFields on UserDTO {
		name
		avatar
		country
		is_online
	}

	# fragment Project on PastProjectsDTO {
	# 	company
	# 	description
	# 	job_role
	# }
	# fragment WorkExperience on WorkExperienceDTO {
	# 	company
	# 	job_role
	# 	description
	# 	from_year
	# 	to_year
	# }
`;
export const GET_ALL_CATEGORIES = gql`
	query GetAllCategories($courseType: String) {
		getAllCategories(courseType: $courseType) {
			id
			title
			description
			slug
			course_type {
				type
			}
		}
	}
`;
