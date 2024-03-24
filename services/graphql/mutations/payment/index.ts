import gql from "graphql-tag";

export const INITIALIZE_PAYMENT = gql`
	mutation InitiatePayment($amount: Float!, $resourceType: String!, $resourceId: String!, $currency: ISOCurrency!) {
		initiatePayment(amount: $amount, resourceType: $resourceType, resourceId: $resourceId, currency: $currency) {
			authorization_url
			reference
			status
		}
	}
`;

export const VERIFY_PAYMENT = gql`
	mutation VerifyPayment($reference: String!) {
		verifyPayment(reference: $reference) {
			id
			# workshop_id
			# course_id
			type
			is_completed
			course {
				id
				title
				mentor {
					...Mentor
				}
				course_level
			}
			workshop {
				id
				title
				mentor {
					...Mentor
				}
				level
			}
			created_at
		}
	}

	fragment Mentor on MentorDTO {
		user {
			avatar
			name
		}
	}
`;
