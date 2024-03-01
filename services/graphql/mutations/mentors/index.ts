import gql from "graphql-tag";

export const HOMEPAGE_MENTORS_LIST = gql`
	query ViewAllMentors {
		viewAllMentors {
			created_at
			id
			role
			user {
				name
				avatar
				country
				is_online
				is_active
				is_verified
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
				name
			}
		}
	}
`;

export const GET_ALL_MENTORS = gql`
	query ViewAllMentors {
		viewAllMentors {
			id
			role
			about
			user {
				name
				avatar
				country
				is_online
				is_verified
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
				name
			}
		}
	}
`;

export const ONBOARD_MENTOR = gql`
	mutation Mutation($createMentorInput: CreateMentorInput!) {
		createMentorProfile(createMentorInput: $createMentorInput) {
			created_at
			id
			about
			role
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
			exp_level
			education_bg {
				school
				credential_type
				course_of_study
				from_year
				to_year
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
			updated_at
		}
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
				name
				avatar
				country
				is_online
				is_active
				is_verified
			}
			courses {
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
				created_at
				updated_at
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
				name
			}
			created_at
		}
	}
`;

export const FOLLOW_MENTOR = gql`
	mutation ToggleFollowMentor($mentorId: String!, $follow: Boolean!) {
		toggleFollowMentor(mentorId: $mentorId, follow: $follow)
	}
`;
