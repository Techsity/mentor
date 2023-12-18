import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { IUser } from "../../interfaces/user.interface";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";
import reviewsData from "../../data/reviews";
import { IReview } from "../../interfaces";

const useLectureReviews = () => {
	const user = useSelector(currentUser);
	const emptyReview: IReview = {
		content: "",
		ratings: 4.5,
		reviewed_by: user as IUser,
		type: "",
	};
	const [loading, setLoading] = useState<boolean>(false);
	const [reviews, setReviews] = useState<IReview[]>(reviewsData);
	const [newReview, setNewReview] = useState<IReview>(emptyReview);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewReview((prevReview) => ({
			...prevReview,
			content: e.target.value,
		}));

	const addNewReview = () => {
		if (newReview?.content) {
			setLoading(true);
			setTimeout(function () {
				setReviews((prev) => {
					return [...prev, newReview];
				});
				setLoading(false);
				setNewReview(emptyReview);
			}, 1000);
			// Api AddReview Endpoint Logic
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
