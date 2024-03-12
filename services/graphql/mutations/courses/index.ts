import gql from "graphql-tag";

export const ALL_COURSES = gql`
	query AllCourses($take: Float!, $skip: Float!, $courseType: String, $category: String) {
		allCourses(take: $take, skip: $skip, courseType: $courseType, category: $category) {
			id
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
export const VIEW_COURSE = gql`
	query ViewCourse($courseId: String!) {
		viewCourse(courseId: $courseId) {
			...CourseDetails
			category {
				id
				title
				slug
				created_at
				updated_at
			}
			course_type {
				id
				type
			}
			course_contents {
				title
				course_sections {
					section_name
					# video_url
					notes
				}
			}
			mentor {
				user {
					...UserField
				}
				courses {
					...CourseDetails
					mentor {
						user {
							...UserField
						}
					}
				}
				...MentorField
			}
			reviews {
				type
				content
				reviewed_by {
					...UserField
				}
				ratings
			}
		}
	}

	fragment MentorField on MentorDTO {
		id
		about
		role
		exp_level
		language
		mentor_verified
		created_at
		updated_at
		followers {
			id
		}
	}

	fragment UserField on UserDTO {
		name
		avatar
		country
		is_online
		is_verified
	}

	fragment CourseDetails on CourseDto {
		id
		title
		course_level
		description
		what_to_learn
		requirements
		price
		course_images
		created_at
	}
`;

export const CREATE_COURSE = gql`
	mutation CreateCourse($createCourseInput: CreateCourseInput!, $files: [String!]!) {
		createCourse(createCourseInput: $createCourseInput, files: $files) {
			title
			id
		}
	}
`;
