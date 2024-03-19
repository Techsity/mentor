import gql from "graphql-tag";

export const FETCH_ALL_WORKSHOPS = gql`
	query ViewAllWorkshops($skip: Float!, $take: Float!) {
		viewAllWorkshops(skip: $skip, take: $take) {
			...WorkshopDetails
		}
	}

	fragment WorkshopDetails on WorkshopDto {
		id
		title
		scheduled_date
		description
		price
		requirements
		what_to_learn
		mentor {
			...MentorDetails
		}
		type {
			id
			type
		}
		category {
			id
			slug
		}
		contents {
			title
			date
			startTime
			endTime
		}
		thumbnail
		level
		reviews {
			content
			ratings
			reviewed_by {
				avatar
				name
				id
			}
		}
		created_at
	}

	fragment MentorDetails on MentorDTO {
		id
		user {
			name
			avatar
		}
	}
`;

export const VIEW_WORKSHOP_DETAILS = gql`
	query ViewWorkshop($workshopId: String!) {
		viewWorkshop(workshopId: $workshopId) {
			...WorkshopDetails
		}
	}

	fragment WorkshopDetails on WorkshopDto {
		id
		title
		scheduled_date
		description
		price
		requirements
		what_to_learn
		mentor {
			...MentorDetails
		}
		type {
			id
			type
		}
		category {
			id
			slug
		}
		contents {
			title
			date
			startTime
			endTime
		}
		thumbnail
		level
		reviews {
			content
			ratings
			reviewed_by {
				avatar
				name
				id
			}
		}
		created_at
	}

	fragment MentorDetails on MentorDTO {
		id
		user {
			name
			avatar
		}
	}
`;
