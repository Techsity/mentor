import gql from "graphql-tag";

export const GET_MENTOR_PROFILE = gql`
	query GetMentorProfile {
		getMentorProfile {
			id
			appointments {
				id
				created_at
				date
				status
				user {
					avatar
					name
				}
			}
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
			}
			certifications {
				organization
				title
			}
			hourly_rate
			availability {
				id
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
			availability {
				day
			}
			hourly_rate
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
				rating
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
				rating
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
				id
				day
				timeSlots {
					startTime
					endTime
					isOpen
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

export const VIEW_MENTOR_AVAILABILITY = gql`
	query ViewMentor($viewMentorId: String!) {
		viewMentor(id: $viewMentorId) {
			id
			availability {
				id
				day
				timeSlots {
					startTime
					endTime
					isOpen
				}
			}
		}
	}
`;
