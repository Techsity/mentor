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
	mutation LoginUser($createLoginInput: CreateLoginInput!) {
		loginUser(createLoginInput: $createLoginInput) {
			access_token
			user {
				id
				avatar
				country
				is_admin
				is_verified
				created_at
				subscriptions {
					id
					course_id
					workshop_id
					is_completed
					created_at
					updated_at
				}
				appointments {
					mentor {
						id
						role
						user {
							name
							avatar
						}
					}
					created_at
					date
					status
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
				email
				is_active
				is_admin
				is_online
				is_verified
				phone
				name
				updated_at
			}
			is_mentor
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

export const REQUEST_OTP = gql`
	mutation RequestOtp($email: String!) {
		requestOtp(email: $email) {
			message
		}
	}
`;
