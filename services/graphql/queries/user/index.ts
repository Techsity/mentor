import { gql } from "graphql-tag";

export const GET_USER_PROFILE = gql`
	query UserProfile {
		userProfile {
			id
			email
			name
			phone
			avatar
			country
			subscriptions {
				id
				course_id
				is_completed
				created_at
				updated_at
			}
			notifications {
				id
				title
				resourceId
				resourceType
				body
				created_at
				read
			}
			is_online
			is_active
			is_verified
			is_admin
			created_at
			updated_at
		}
	}
`;

export const FETCH_COURSE_SUBSCRIPTION_BY_ID = gql`
	query ViewSubscription($resourceId: String!, $subscriptionType: SubscriptionType!) {
		viewSubscription(resourceId: $resourceId, subscriptionType: $subscriptionType) {
			id
			created_at
			type
			is_completed
			course {
				...SubscriptionCourseDetails
			}
		}
	}

	fragment SubscriptionCourseDetails on CourseDto {
		id
		title
		description
		what_to_learn
		requirements
		course_contents {
			title
			course_sections {
				section_name
				notes
				video_url
			}
		}
		course_images
		course_level
		course_type {
			id
			type
		}
		mentor {
			...MentorDetails
		}
		category {
			id
			slug
		}
		reviews {
			content
			ratings
			reviewed_by {
				avatar
				name
				id
			}
		}
		created_at
	}

	fragment MentorDetails on MentorDTO {
		id
		user {
			name
			avatar
		}
	}
`;

export const FETCH_WORKSHOP_SUBSCRIPTION_BY_ID = gql`
	query ViewSubscription($resourceId: String!, $subscriptionType: SubscriptionType!) {
		viewSubscription(resourceId: $resourceId, subscriptionType: $subscriptionType) {
			id
			created_at
			type
			is_completed
			workshop {
				...WorkshopDetails
			}
		}
	}

	fragment WorkshopDetails on WorkshopDto {
		id
		title
		scheduled_date
		description
		price
		requirements
		what_to_learn
		mentor {
			...MentorDetails
		}
		type {
			id
			type
		}
		category {
			id
			slug
		}
		contents {
			title
			date
			startTime
			endTime
		}
		thumbnail
		level
		reviews {
			content
			ratings
			reviewed_by {
				avatar
				name
				id
			}
		}
		created_at
	}
	fragment MentorDetails on MentorDTO {
		id
		user {
			name
			avatar
		}
	}
`;

export const FETCH_COURSE_SUBSCRIPTIONS = gql`
	query ViewSubscriptions {
		viewSubscriptions(subscriptionType: "course") {
			id
			type
			is_completed
			created_at
			course {
				...CourseDetails
			}
		}
	}

	fragment MentorField on MentorDTO {
		id
		user {
			name
			avatar
			country
			is_online
			is_verified
		}
		role
		# followers {
		# 	id
		# }
	}
	fragment ReviewField on ReviewDto {
		type
		content
		reviewed_by {
			name
			avatar
			country
		}
		ratings
	}
	fragment CourseDetails on CourseDto {
		id
		title
		description
		what_to_learn
		requirements
		price
		mentor {
			...MentorField
		}
		course_contents {
			title
			course_sections {
				section_name
				notes
				video_url
			}
		}
		course_images
		course_level
		course_type {
			id
			type
		}
		category {
			id
			slug
		}
		reviews {
			...ReviewField
		}
		created_at
	}
`;

export const VIEW_ALL_NOTIFICATIONS = gql`
	query ViewAllNotifications {
		viewAllNotifications {
			id
			title
			body
			resourceId
			resourceType
			read
			userId
			created_at
		}
	}
`;
