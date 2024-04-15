import gql from "graphql-tag";

export type InitializePaymentInput = {
	accountNumber: string;
	amount: number;
	bankCode: string;
	currency: string;
	birthday: string;
	resourceId: string;
	resourceType: string;
};

export const INITIATE_PAYMENT = gql`
	mutation InitiatePayment($input: InitializePaymentInput!) {
		initiatePayment(input: $input) {
			display_text
			reference
			status
		}
	}
`;

export const VERIFY_PAYMENT = gql`
	mutation VerifyPayment($reference: String!, $otp: String!) {
		verifyPayment(reference: $reference, otp: $otp) {
			data {
				amount
				status
				reference
				gateway_response
			}
			display_text
		}
	}
`;

export const CONFIRM_PAYMENT = gql`
	mutation ConfirmPendingTransaction($resourceId: String!, $resourceType: SubscriptionType!) {
		confirmPendingTransaction(resourceId: $resourceId, resourceType: $resourceType) {
			amount
			resourceId
			resourceType
			currency
		}
	}
`;
