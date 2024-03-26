import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setWishlist, wishlistedCourses } from "../../redux/reducers/userSlice";
import { ICourse } from "../../interfaces";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { slugify } from "../../utils";
import { useDispatch } from "react-redux";

const useWishlist = () => {
	const wishlist = useSelector(wishlistedCourses);
	const dispatch = useDispatch();

	const addToWishlist = (course: ICourse) => {
		dispatch(setWishlist([...wishlist, course]));
		toast.info(`Course added to wishlist!`, ToastDefaultOptions());
	};
	const removeFromWishlist = (course: ICourse) => {
		const updatedWishlist = wishlist.filter(
			(wishlistedCourse) => slugify(wishlistedCourse.title) !== slugify(course.title),
		);
		dispatch(setWishlist(updatedWishlist));
		toast.info("Course removed from wishlist!", ToastDefaultOptions());
	};

	return { wishlist, addToWishlist, removeFromWishlist };
};

export default useWishlist;
