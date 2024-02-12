import { IReview } from "../interfaces";
import { dummyUsers } from "./user";

const reviews: IReview[] = [
	{
		content:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple.",
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
		content: "I once thought digital marketing was for the big guys until i took this course. Great course!",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
	{
		content:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
	{
		content:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		ratings: 4.5,
		reviewed_by: dummyUsers[2],
		type: "course",
	},
];

export default reviews;
