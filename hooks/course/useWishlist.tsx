import React from "react";
import { useSelector } from "react-redux";
import {
	setWishlist,
	wishlistedCourses,
} from "../../redux/reducers/features/coursesSlice";
import { ICourse } from "../../interfaces";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { slugify } from "../../utils";
import { useDispatch } from "react-redux";

const useWishlist = () => {
	const wishlist = useSelector(wishlistedCourses);
	const dispatch = useDispatch();

	const addToWishlist = (course: ICourse) => {
		const hasBeenAdded = wishlist.find(
			(wishlistedCourse) =>
				slugify(wishlistedCourse.title) === slugify(course.title),
		);
		if (hasBeenAdded) {
			toast.warning(
				"Course has already been added to wishlist!",
				ToastDefaultOptions({ id: "success", theme: "dark" }),
			);
		} else {
			dispatch(setWishlist([...wishlist, course]));
			toast.success(
				"Course added to wishlist!",
				ToastDefaultOptions({ id: "warning", theme: "dark" }),
			);
		}
	};
	const removeFromWishlist = (course: ICourse) => {
		const hasBeenAdded = wishlist.find(
			(wishlistedCourse) =>
				slugify(wishlistedCourse.title) === slugify(course.title),
		);
		if (hasBeenAdded) {
			const updatedWishlist = wishlist.filter(
				(wishlistedCourse) =>
					slugify(wishlistedCourse.title) !== slugify(course.title),
			);
			dispatch(setWishlist(updatedWishlist));
			toast.success(
				"Course has been removed from wishlist!",
				ToastDefaultOptions({
					id: "success",
					theme: "dark",
				}),
			);
		} else {
			// toast.success(
			// 	"Course added to wishlist!",
			// 	ToastDefaultOptions({ id: "warning", theme: "dark" }),
			// );
		}
	};

	return { wishlist, addToWishlist, removeFromWishlist };
};

export default useWishlist;
