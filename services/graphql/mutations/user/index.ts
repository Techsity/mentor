import gql from "graphql-tag";

export const UPDATE_USER_PROFILE = gql`
	mutation UpdateUserProfile($userUpdateInput: UpdateUserInput!) {
		updateUserProfile(userUpdateInput: $userUpdateInput) {
			name
			phone
			avatar
			country
			is_online
			# subsciptions {
			# 	id
			# 	is_completed
			# 	created_at
			# 	updated_at
			# }
		}
	}
`;
