import gql from "graphql-tag";

export const REGISTER_USER = gql`
	mutation registerUser($createRegisterInput: CreateRegisterInput!) {
		registerUser(createRegisterInput: $createRegisterInput) {
			message
			user {
				name
				email
			}
		}
	}
`;
export const LOGIN_USER = gql`
	mutation loginUser($createLoginInput: CreateLoginInput!) {
		loginUser(createLoginInput: $createLoginInput) {
			access_token
			user {
				id
				name
				email
				avatar
				country
				created_at
				is_active
				is_admin
				is_online
				is_verified
				phone
			}
		}
	}
`;

export const GET_USER_PROFILE = gql`
	query UserProfile {
		userProfile {
			id
			email
			name
			phone
			avatar
			country
			# subsciptions {
			# 	created_at
			# 	id
			# 	is_completed
			# 	updated_at
			# }
			is_online
			is_active
			is_verified
			is_admin
			created_at
			updated_at
		}
	}
`;

export const VERIFY_USER = gql`
	mutation verifyUser($otp: String!) {
		verifyUser(otp: $otp) {
			message
		}
	}
`;

export const FORGOT_PASSWORD = gql`
	mutation forgetPassword($email: String!) {
		forgetPassword(email: $email) {
			message
		}
	}
`;
export const RESET_PASSWORD = gql`
	mutation ResetPassword($resetData: ResetPasswordInput!) {
		resetPassword(resetData: $resetData) {
			message
		}
	}
`;
