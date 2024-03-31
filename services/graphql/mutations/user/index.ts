import gql from "graphql-tag";

export const UPDATE_USER_PROFILE = gql`
	mutation UpdateUserProfile($userUpdateInput: UpdateUserInput!) {
		updateUserProfile(userUpdateInput: $userUpdateInput) {
			id
			email
			name
			phone
			avatar
			country
			is_online
			is_active
			is_verified
			is_admin
			created_at
			updated_at
			subscriptions {
				id
				course_id
				workshop_id
				is_completed
				type
				created_at
				updated_at
			}
		}
	}
`;

export const MARK_NOTIFICATION_AS_READ = gql`
	mutation ReadNotification($notificationId: String!) {
		readNotification(notificationId: $notificationId)
	}
`;

export const SUBMIT_REVIEW = gql`
	mutation CreateReview($args: CreateReviewArgs!) {
		createReview(args: $args) {
			content
			rating
			reviewed_by {
				...UserField
			}
			rating
		}
	}
	fragment UserField on UserDTO {
		name
		avatar
		country
		is_online
		is_verified
	}
`;

export const BOOK_MENTOR = gql`
	mutation CreateAppointment($createAppointmentInput: CreateAppointmentInput!, $mentor: String!) {
		createAppointment(createAppointmentInput: $createAppointmentInput, mentor: $mentor) {
			id
			date
			status
			created_at
			updated_at
			mentor {
				id
				user {
					avatar
					name
				}
				role
			}
		}
	}
`;

export const RESCHEDULE_APPOINTMENT = gql`
	mutation RescheduleAppointment($appointmentId: String!, $input: CreateAppointmentInput!) {
		rescheduleAppointment(appointmentId: $appointmentId, input: $input) {
			id
			paymentReference
			date
			status
			created_at
			updated_at
			mentor {
				id
				user {
					name
					avatar
				}
			}
			user {
				name
				avatar
			}
		}
	}
`;
