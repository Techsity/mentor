import { IReview } from "../interfaces";
import { dummyUsers } from "./user";

const reviews: IReview[] = [
	{
		content: "Great course for beginners!",
		ratings: 5,
		reviewed_by: dummyUsers[1],
		type: "course",
	},
	{
		content: "Great workshop for beginners!",
		ratings: 5,
		reviewed_by: dummyUsers[0],
		type: "workshop",
	},
	{
		content: "Great course!",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
	{
		content: "Great course!",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
	{
		content: "Great course!",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
	{
		content: "Great course!",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
];

export default reviews;
