import gql from "graphql-tag";

export const GET_MENTOR_PROFILE = gql`
	query GetMentorProfile {
		getMentorProfile {
			id
			# courses {
			# 	title
			# 	course_level
			# 	description
			# 	category {
			# 		title
			# 		description
			# 		created_at
			# 		updated_at
			# 	}
			# 	what_to_learn
			# 	requirements
			# 	price
			# 	course_images
			# 	course_contents {
			# 		title
			# 		course_sections {
			# 			section_name
			# 			video_url
			# 			notes
			# 		}
			# 	}
			# 	created_at
			# 	updated_at
			# }
			about
			role
			skills {
				skill_name
				years_of_exp
			}
			work_experience {
				company
				job_role
				description
				# from_year
				# to_year
			}
			projects {
				company
				job_role
				description
			}
			exp_level
			education_bg {
				school
				credential_type
				course_of_study
				# from_year
				# to_year
			}
			certifications {
				organization
				title
				# year
			}
			hourly_rate
			availability {
				day
				timeSlots {
					startTime
					endTime
				}
			}
			language
			mentor_verified
			created_at
			updated_at
		}
	}
`;

export const HOMEPAGE_MENTORS_LIST = gql`
	query ViewAllMentors {
		viewAllMentors {
			created_at
			id
			role
			user {
				...MentorUserField
			}
			exp_level
			hourly_rate
			availability {
				day
				timeSlots {
					startTime
					endTime
				}
			}
			language
			mentor_verified
			updated_at
			followers {
				id
			}
		}
	}

	fragment MentorUserField on UserDTO {
		name
		avatar
		country
		is_online
		is_active
		is_verified
	}
`;

export const GET_ALL_MENTORS = gql`
	query ViewAllMentors {
		viewAllMentors {
			id
			role
			about
			user {
				...MentorUserField
			}
			reviews {
				type
				ratings
			}
			exp_level
			hourly_rate
			language
			mentor_verified
			followers {
				id
			}
		}
	}

	fragment MentorUserField on UserDTO {
		name
		avatar
		country
		is_online
		is_active
		is_verified
	}
`;

export const VIEW_MENTOR_PROFILE = gql`
	query ViewMentor($viewMentorId: String!) {
		viewMentor(id: $viewMentorId) {
			id
			about
			role
			exp_level
			hourly_rate
			language
			mentor_verified
			user {
				...MentorUserField
			}
			courses {
				...CourseFields
			}
			reviews {
				type
				content
				reviewed_by {
					name
				}
				ratings
			}
			skills {
				skill_name
				years_of_exp
			}
			work_experience {
				company
				job_role
				description
				from_year
				to_year
			}
			projects {
				company
				job_role
				description
			}
			education_bg {
				school
				credential_type
				course_of_study
				from_year
				to_year
			}
			certifications {
				organization
				title
				year
			}
			availability {
				day
				timeSlots {
					startTime
					endTime
				}
			}
			followers {
				id
			}
		}
	}
	fragment CourseFields on CourseDto {
		id
		mentor {
			user {
				name
				avatar
			}
		}
		title
		course_level
		description
		category {
			title
			description
			course_type {
				type
				description
			}
			created_at
			updated_at
		}
		what_to_learn
		requirements
		price
		course_images
		course_contents {
			title
			course_sections {
				section_name
				# video_url
				notes
			}
		}
	}
	fragment MentorUserField on UserDTO {
		name
		avatar
		country
		is_online
		is_active
		is_verified
	}
`;
