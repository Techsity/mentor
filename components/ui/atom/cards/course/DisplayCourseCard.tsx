/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../../interfaces";
import { ArrowForwardSharp, HeartOutline, HeartSharp } from "react-ionicons";
import Link from "next/link";
import { slugify } from "../../../../../utils";
import useWishlist from "../../../../../hooks/course/useWishlist";

const DisplayCourseCard = ({ course }: { course: ICourse }) => {
	const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();
	const hasBeenAdded = wishlist.find(
		(wishlistedCourse) =>
			slugify(wishlistedCourse.title) === slugify(course.title),
	);
	return (
		<>
			<div className="inline-block snap-start">
				<div className="w-auto h-auto lg:h-auto md:max-w-md xl:max-w-lg relative overflow-hidden shadow pb-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
					<>
						<div className="absolute animate__animated animate__fadeIn animate__faster justify-between z-10 text-white w-full flex items-center p-6">
							{wishlist.length > 0 && hasBeenAdded ? (
								<HeartSharp
									onClick={() => removeFromWishlist(course)}
									color="#fff"
									height="23px"
									width="23px"
									cssClasses="duration-300 cursor-pointer"
								/>
							) : (
								<HeartOutline
									onClick={() => addToWishlist(course)}
									color="#fff"
									height="23px"
									width="23px"
									cssClasses="duration-300 cursor-pointer"
								/>
							)}

							<Link href={`/courses/${slugify(course.title)}`}>
								<div className="cursor-pointer">
									<ArrowForwardSharp
										color="#fff"
										height="20px"
										width="20px"
									/>
								</div>
							</Link>
						</div>
						<Link href={`/courses/${slugify(course.title)}`}>
							<div className="flex flex-col items-start gap-4 cursor-pointer h-full w-full">
								<div className="relative h-[40%] w-full bg-zinc-200">
									<div className="bg-black w-full h-full bg-opacity-40 hidden group-hover:block animate__animated animate__fast animate__fadeIn absolute" />
									<img
										src={
											course.imgUrl ||
											"/assets/images/mockups/course_one.png"
										}
										className="w-full h-full object-cover"
										alt={course.title}
										loading="lazy"
									/>
								</div>
								<h1 className="px-5 text-rgS font-medium tracking-tight">
									{course.title}
								</h1>
								<div className="flex items-center gap-1 justify-between px-5 text-xxs w-full">
									<span className="font-normal">
										{course.level}
									</span>
									<span className="font-normal">
										{course.duration} hours
									</span>
									<span className="font-normal">
										{course.limit.toLocaleString()} students
									</span>
									<div className="flex items-center gap-2 text-[#094B10] ml-3 text-[13px]">
										{course.rating}
										<svg
											width="13"
											height="13"
											viewBox="0 0 9 9"
											fill="none">
											<path
												d="M8.77514 4.09957L6.9643 5.73977L7.50675 8.18173C7.53546 8.30939 7.52727 8.44299 7.4832 8.56585C7.43914 8.6887 7.36116 8.79535 7.25902 8.87246C7.15687 8.94956 7.03509 8.99371 6.90891 8.99938C6.78272 9.00504 6.65772 8.97198 6.54954 8.90431L4.49739 7.61249L2.44966 8.90431C2.34148 8.97198 2.21648 9.00504 2.09029 8.99938C1.9641 8.99371 1.84232 8.94956 1.74018 8.87246C1.63803 8.79535 1.56005 8.6887 1.51599 8.56585C1.47193 8.44299 1.46374 8.30939 1.49244 8.18173L2.03409 5.74227L0.22285 4.09957C0.127052 4.01382 0.0577799 3.90063 0.0237208 3.77418C-0.0103383 3.64773 -0.00766819 3.51366 0.0313962 3.38878C0.0704606 3.26391 0.14418 3.15378 0.243311 3.07221C0.342441 2.99064 0.46257 2.94126 0.588631 2.93027L2.97605 2.71566L3.90796 0.408716C3.95663 0.287666 4.03872 0.184267 4.14389 0.111538C4.24906 0.038808 4.37262 0 4.499 0C4.62538 0 4.74893 0.038808 4.8541 0.111538C4.95927 0.184267 5.04136 0.287666 5.09003 0.408716L6.02476 2.71566L8.41137 2.93027C8.53743 2.94126 8.65756 2.99064 8.75669 3.07221C8.85582 3.15378 8.92954 3.26391 8.9686 3.38878C9.00767 3.51366 9.01034 3.64773 8.97628 3.77418C8.94222 3.90063 8.87295 4.01382 8.77715 4.09957H8.77514Z"
												fill="#FF5C00"
												fillOpacity="0.5"
											/>
										</svg>
									</div>
								</div>
								{/* Note: Change to short summary - should not be more than 15 words. No need to split */}
								<p className="text-xsm px-5 font-normal w-full">
									{course.description}
								</p>
								<div className="flex items-center justify-between mt-3 px-5 w-full">
									<div className="flex gap-2 items-center text-xsm relative">
										<img
											src={
												course.mentor.avatar ||
												"/assets/images/avatar.png"
											}
											alt={course.mentor.name}
											className="w-10 rounded-full"
											loading="lazy"
										/>
										<h1>{course.mentor.name}</h1>
										{/* <div className="absolute w-ful left-0"></div> */}
									</div>
									{course.price === "free" ? (
										<div className="text-white text-xsm bg-[#094B10] select-none rounded px-8 p-2 cursor-pointer">
											Free
										</div>
									) : (
										<div className="text-black text-xsm bg-[#FFB100] select-none rounded px-8 p-2 cursor-pointer">
											₦{course.price.toLocaleString()}
										</div>
									)}
								</div>
							</div>
						</Link>
					</>
				</div>
			</div>
		</>
	);
};

export default DisplayCourseCard;
