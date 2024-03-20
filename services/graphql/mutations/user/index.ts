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
		}
	}
`;
