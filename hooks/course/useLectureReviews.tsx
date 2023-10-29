import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { IUser } from "../../interfaces/user.interface";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";

export interface ILectureReview {
	user: Pick<IUser, "name" | "avatar"> | null;
	comment: string;
}
const reviews: ILectureReview[] = [
	{
		comment:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		user: {
			name: "Adewole Sulaiman",
			avatar: "/assets/images/avatar.png",
		},
	},
	{
		comment:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		user: {
			name: "Adewole Sulaiman",
			avatar: "/assets/images/avatar.png",
		},
	},
	{
		comment:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		user: {
			name: "Adewole Sulaiman",
			avatar: "/assets/images/avatar.png",
		},
	},
	{
		comment:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		user: {
			name: "Adewole Sulaiman",
			avatar: "/assets/images/avatar.png",
		},
	},
	{
		comment:
			"I once thought digital marketing was for the big guys until i took this course, thank you for making it so easy and simple",
		user: {
			name: "Adewole Sulaiman",
			avatar: "/assets/images/avatar.png",
		},
	},
];
const useLectureReviews = () => {
	const user = useSelector(currentUser);
	const [loading, setLoading] = useState<boolean>(false);
	const [newReview, setNewReview] = useState<ILectureReview | null>(null);
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) =>
			setNewReview((prevReview) => ({
				...prevReview,
				comment: e.target.value,
				user,
			})),
		[setNewReview, user],
	);
	const addNewReview = () => {
		if (newReview?.comment) {
			setLoading(true);
			setTimeout(function () {
				reviews.push(newReview);
				setLoading(false);
				setNewReview(null);
			}, 1000);
		}
	};
	// const memoizedReviews = useMemo(() => reviews.reverse(), [reviews]);
	return {
		loading,
		setLoading,
		newReview,
		setNewReview,
		reviews,
		handleChange,
		addNewReview,
	};
};

export default useLectureReviews;
