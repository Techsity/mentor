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
			subsciptions {
				id
				is_completed
				created_at
				updated_at
			}
		}
	}
`;

export const FETCH_USER_SUBSCRIPTIONS = gql`
	query ViewSubscribedCourses {
		viewSubscribedCourses {
			id
			course {
				id
				title
				course_level
				description
				category {
					title
				}
				course_type {
					type
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
				mentor {
					...MentorField
				}
				reviews {
					...ReviewField
				}
				created_at
			}
			is_completed
			created_at
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
		followers {
			id
		}
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
`;
