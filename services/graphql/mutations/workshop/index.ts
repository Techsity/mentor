import gql from "graphql-tag";

export const SUBSCRIBE_TO_WORKSHOP = gql`
	mutation SubscribeToWorkshop($workshopId: String!) {
		subscribeToWorkshop(workshopId: $workshopId) {
			id
			workshop_id
			type
			is_completed
			created_at
		}
	}
`;
