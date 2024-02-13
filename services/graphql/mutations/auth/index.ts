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
export const GET_MENTOR_PROFILE = gql`
	query GetMentorProfile {
		getMentorProfile {
			id
			# courses {
			# 	title
			# 	course_level
			# 	description
			# 	category {
			# 		title
			# 		description
			# 		created_at
			# 		updated_at
			# 	}
			# 	what_to_learn
			# 	requirements
			# 	price
			# 	course_images
			# 	course_contents {
			# 		title
			# 		course_sections {
			# 			section_name
			# 			video_url
			# 			notes
			# 		}
			# 	}
			# 	created_at
			# 	updated_at
			# }
			about
			role
			skills {
				skill_name
				years_of_exp
			}
			work_experience {
				company
				job_role
				description
				# from_year
				# to_year
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
				# from_year
				# to_year
			}
			certifications {
				organization
				title
				# year
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
			created_at
			updated_at
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
