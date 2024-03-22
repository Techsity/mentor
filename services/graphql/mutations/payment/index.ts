import gql from "graphql-tag";

export const INITIALIZE_PAYMENT = gql`
	mutation InitiatePayment($amount: Float!, $resourceType: String!, $resourceId: String!) {
		initiatePayment(amount: $amount, resourceType: $resourceType, resourceId: $resourceId) {
			authorization_url
			reference
			status
		}
	}
`;

export const VERIFY_PAYMENT = gql`
	mutation VerifyPayment($reference: String!) {
		verifyPayment(reference: $reference)
	}
`;
