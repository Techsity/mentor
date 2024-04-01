import { ChangeEvent, useId, useState } from "react";
import { IUser } from "../../interfaces/user.interface";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/auth/authSlice";
import { ICourse, IReview } from "../../interfaces";
import { useMutation } from "@apollo/client";
import { SUBMIT_REVIEW } from "../../services/graphql/mutations/user";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { formatGqlError } from "../../utils/auth";

type CreateReviewInputType = {
	content: string;
	rating: number;
};

const useLectureReviews = (course: ICourse) => {
	const toastId = useId();
	const user = useSelector(currentUser);
	const emptyReview: IReview = {
		content: "",
		rating: 1,
		reviewed_by: user as IUser,
		type: "",
	};
	// const [loading, setLoading] = useState<boolean>(false);
	const [reviews, setReviews] = useState<IReview[]>(course.reviews || []);
	const [newReview, setNewReview] = useState<IReview>(emptyReview);
	const [submitReview, { loading }] = useMutation<
		{ createReview: IReview },
		{ args: { createReviewInput: CreateReviewInputType; courseId: string } }
	>(SUBMIT_REVIEW);

	const handleChange = (name: keyof Pick<IReview, "content" | "rating">) => (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (name == "rating" && parseInt(value) > 5) {
			console.log({ value });
			return;
		}
		setNewReview((prevReview) => ({
			...prevReview,
			[name]: value,
		}));
	};
	const addNewReview = async () => {
		if (newReview?.content) {
			try {
				const { data } = await submitReview({
					variables: {
						args: {
							createReviewInput: { content: newReview.content, rating: newReview.rating },
							courseId: String(course.id),
						},
					},
				});
				if (data?.createReview.rating) {
					setReviews((prev) => {
						return [...prev, newReview];
					});
					setNewReview(emptyReview);
				}
			} catch (error) {
				console.error({ error });
				const errMsg = formatGqlError(error);
				toast.error(errMsg || "Something went wrong. Please try again", { ...ToastDefaultOptions(), toastId });
			}
		}
	};
	// const memoizedReviews = useMemo(() => reviews.reverse(), [reviews]);
	return {
		loading,
		// setLoading,
		newReview,
		setNewReview,
		reviews,
		handleChange,
		addNewReview,
	};
};

export default useLectureReviews;
