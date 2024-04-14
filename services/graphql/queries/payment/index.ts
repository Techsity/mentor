import gql from "graphql-tag";

export type Bank = {
	name: string;
	slug: string;
	code: string;
	longcode: string;
	gateway: any;
	pay_with_bank: boolean;
	active: boolean;
	is_deleted: boolean;
	country: string;
	currency: string;
	type: string;
	id: number;
	createdAt: string;
	updatedAt: string;
};

export const FETCH_BANKS = gql`
	query FetchBanks {
		fetchBanks {
			name
			slug
			code
			longcode
			pay_with_bank
			active
			is_deleted
			id
		}
	}
`;
