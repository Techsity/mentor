import gql from "graphql-tag";

export const GET_ALL_MENTORS = gql`
	query ViewAllMentors {
		viewAllMentors {
			created_at
			id
			user {
				id
				email
				name
				phone
				avatar
				country
				is_online
				is_active
				isPremium
				is_verified
				is_admin
				created_at
				updated_at
			}
			courses {
				title
				course_level
				description
				category {
					title
					description
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
						video_url
						notes
					}
				}
				mentor {
					id
					about
					role
					skills {
						skill_name
						years_of_exp
					}
					exp_level
					certifications {
						organization
						title
						year
					}
					hourly_rate
					language
					mentor_verified
					created_at
					updated_at
				}
				created_at
				updated_at
			}
			reviews {
				type
				content
				reviewed_by {
					id
					email
					name
					phone
					avatar
					country
					subsciptions {
						id
						is_completed
						created_at
						updated_at
					}
					is_online
					is_active
					is_verified
					is_admin
					created_at
					updated_at
				}
				ratings
			}
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
