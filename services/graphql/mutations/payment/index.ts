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
	mutation VerifyPayment($reference: String!) {
		verifyPayment(reference: $reference) {
			subscription {
				...SubFields
			}
			appointment {
				...AppFields
			}
		}
	}

	fragment AppFields on AppointmentDTO {
		id
		date
		status
		paymentReference
		mentor {
			...Mentor
		}
		created_at
	}

	fragment SubFields on SubscriptionDto {
		id
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
	fragment Mentor on MentorDTO {
		id
		user {
			avatar
			name
		}
	}
`;
