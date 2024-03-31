import gql from "graphql-tag";

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

export const FOLLOW_MENTOR = gql`
	mutation ToggleFollowMentor($mentorId: String!, $follow: Boolean!) {
		toggleFollowMentor(mentorId: $mentorId, follow: $follow)
	}
`;

export const REPORT_MENTOR = gql`
	mutation ReportMentor($input: ReportMentorInput!) {
		reportMentor(input: $input) {
			content
			id
			created_at
		}
	}
`;

export const ACCEPT_MENTORSHIP_REQUEST = gql`
	mutation AcceptAppointment($acceptAppointmentId: String!) {
		acceptAppointment(id: $acceptAppointmentId) {
			id
			created_at
			date
			status
			user {
				name
				avatar
			}
		}
	}
`;
