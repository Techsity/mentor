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
			rating
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
			title
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
			rating
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
		mentor_verified
		user {
			name
			avatar
			country
		}
		role
		followers {
			id
		}
		courses {
			...CourseDetails
		}
	}

	fragment CourseDetails on CourseDto {
		id
		title
		course_level
		description
		what_to_learn
		requirements
		price
		mentor {
			user {
				name
				avatar
			}
		}
		course_images
		created_at
	}
`;
