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
			course {
				title
				mentor {
					...Mentor
				}
			}
			workshop {
				title
				mentor {
					...Mentor
				}
			}
		}
	}

	fragment Mentor on MentorDTO {
		user {
			avatar
			name
		}
	}
`;
