/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../../interfaces";
import { ArrowForwardSharp, HeartOutline, HeartSharp } from "react-ionicons";
import Link from "next/link";
import { slugify } from "../../../../../utils";
import useWishlist from "../../../../../hooks/course/useWishlist";
import { useRouter } from "next/router";

const DisplayCourseCard = ({ course, loading = false }: { course: ICourse | null; loading?: boolean }) => {
	const router = useRouter();
	const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();
	const hasBeenAdded = wishlist.find(
		(wishlistedCourse) => slugify(wishlistedCourse?.title as string) === slugify(course?.title as string),
	);
	return (
		<>
			<div className="animate__animated animate__fadeIn animate__faster inline-block snap-start">
				<div className="rounded w-full sm:w-[300px] h-auto md:max-w-sm xl:max-w-xl relative overflow-hidden shadow pb-4 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
					<>
						{/* Wishlist Feature - Start */}
						{!loading && (
							<div className="absolute animate__animated animate__fadeIn animate__faster justify-between z-10 text-white w-full flex items-center p-6">
								{wishlist.length > 0 && hasBeenAdded ? (
									<HeartSharp
										onClick={() => course && removeFromWishlist(course)}
										color="#fff"
										height="23px"
										width="23px"
										cssClasses="duration-300 cursor-pointer"
									/>
								) : (
									<HeartOutline
										onClick={() => course && addToWishlist(course)}
										color="#fff"
										height="23px"
										width="23px"
										cssClasses="duration-300 cursor-pointer"
									/>
								)}

								<Link href={`/courses/${slugify(course?.title as string)}`}>
									<div className="cursor-pointer">
										<ArrowForwardSharp color="#fff" height="20px" width="20px" />
									</div>
								</Link>
							</div>
						)}
						{/* Wishlist Feature - End*/}

						<div
							onClick={() => {
								if (!loading) router.push(`/courses/${slugify(course?.title as string)}`);
							}}>
							<div className="flex flex-col items-start gap-4 cursor-pointer h-full w-full">
								<div className="relative h-full max-h-[40%] w-full bg-zinc-200 overflow-hidden">
									{!loading && (
										<>
											<div className="bg-black w-full h-full bg-opacity-40 hidden group-hover:block animate__animated animate__fast animate__fadeIn absolute" />
											<img
												src={course?.imgUrl || "/assets/images/mockups/course_one.png"}
												className="w-full h-full object-cover bg-zinc-200"
												alt={course?.title}
												loading="lazy"
											/>
										</>
									)}
									{loading && (
										<div className="z-10 h-[250px] w-full bg-zinc-100 animate__animated animate__fadeOut animate__infinite" />
									)}
								</div>
								<h1
									className={
										!loading
											? "px-5 font-medium tracking-tight"
											: "mx-5 px-5 h-2 bg-zinc-200 w-3/5 animate__animated animate__fadeIn animate__infinite animate__slow"
									}>
									{!loading && course?.title}
								</h1>
								<div className="flex items-center gap-1 justify-between px-5 text-xs w-full">
									<span
										className={
											!loading
												? "font-normal"
												: "px-5 bg-zinc-200 h-1.5 animate__animated animate__fadeIn animate__infinite"
										}>
										{!loading &&
											course &&
											course?.course_level?.charAt(0).toUpperCase() +
												course?.course_level?.slice(1).toLowerCase()}
									</span>
									<span
										className={
											!loading
												? "font-normal"
												: "px-5 bg-zinc-200 h-1.5 animate__animated animate__fadeIn animate__infinite"
										}>
										{!loading && course?.duration || 0 + " hours"}
									</span>
									<span
										className={
											!loading
												? "font-normal"
												: "px-5 bg-zinc-200 h-1.5 animate__animated animate__fadeIn animate__infinite"
										}>
										{!loading && course?.reviews && course.reviews.length + " reviews"}
									</span>
									{!loading ? (
										<div className="flex items-center gap-2 text-[#094B10] ml-3 text-[13px]">
											{course?.rating}
											<svg width="13" height="13" viewBox="0 0 9 9" fill="none">
												<path
													d="M8.77514 4.09957L6.9643 5.73977L7.50675 8.18173C7.53546 8.30939 7.52727 8.44299 7.4832 8.56585C7.43914 8.6887 7.36116 8.79535 7.25902 8.87246C7.15687 8.94956 7.03509 8.99371 6.90891 8.99938C6.78272 9.00504 6.65772 8.97198 6.54954 8.90431L4.49739 7.61249L2.44966 8.90431C2.34148 8.97198 2.21648 9.00504 2.09029 8.99938C1.9641 8.99371 1.84232 8.94956 1.74018 8.87246C1.63803 8.79535 1.56005 8.6887 1.51599 8.56585C1.47193 8.44299 1.46374 8.30939 1.49244 8.18173L2.03409 5.74227L0.22285 4.09957C0.127052 4.01382 0.0577799 3.90063 0.0237208 3.77418C-0.0103383 3.64773 -0.00766819 3.51366 0.0313962 3.38878C0.0704606 3.26391 0.14418 3.15378 0.243311 3.07221C0.342441 2.99064 0.46257 2.94126 0.588631 2.93027L2.97605 2.71566L3.90796 0.408716C3.95663 0.287666 4.03872 0.184267 4.14389 0.111538C4.24906 0.038808 4.37262 0 4.499 0C4.62538 0 4.74893 0.038808 4.8541 0.111538C4.95927 0.184267 5.04136 0.287666 5.09003 0.408716L6.02476 2.71566L8.41137 2.93027C8.53743 2.94126 8.65756 2.99064 8.75669 3.07221C8.85582 3.15378 8.92954 3.26391 8.9686 3.38878C9.00767 3.51366 9.01034 3.64773 8.97628 3.77418C8.94222 3.90063 8.87295 4.01382 8.77715 4.09957H8.77514Z"
													fill="#FF5C00"
													fillOpacity="0.5"
												/>
											</svg>
										</div>
									) : (
										<span
											className={
												"px-5 bg-zinc-200 h-1.5 animate__animated animate__fadeIn animate__infinite"
											}
										/>
									)}
								</div>
								{/* Note: Change to short summary - should not be more than 15 words. No need to split */}
								<p
									className={
										!loading
											? "text-[13px] px-5 font-normal w-full"
											: "mt-3 mx-5 h-1.5 w-5/6 bg-zinc-200 animate__animated animate__fadeIn animate__slow animate__infinite"
									}>
									{!loading && course?.description}
								</p>
								<div className="flex items-center justify-between mt-3 px-5 w-full">
									<div className="flex gap-2 items-center text-sm relative">
										<div className="h-10 w-10 rounded-full overflow-hidden bg-zinc-200 relative">
											{!loading && (
												<img
													src={course?.mentor.user.avatar || "/assets/images/avatar.png"}
													alt={course?.mentor.user.name}
													className="w-full h-full rounded-full"
													loading="lazy"
												/>
											)}
										</div>
										<h1 className={loading ? "px-10 h-2 bg-zinc-200" : ""}>
											{!loading && course?.mentor.user.name}
										</h1>
									</div>
									{!loading ? (
										course?.price === 0 ? (
											<div className="text-white text-sm bg-[#094B10] select-none rounded px-8 p-2 cursor-pointer font-medium">
												Free
											</div>
										) : (
											<div className="text-black text-sm font-medium bg-[#FFB100] select-none rounded px-8 p-2 cursor-pointer">
												${course?.price.toLocaleString()}
											</div>
										)
									) : (
										<span className="text-white text-sm bg-[#033] select-none rounded px-10 p-4 cursor-pointer font-medium relative overflow-" />
									)}
								</div>
							</div>
						</div>
					</>
				</div>
			</div>
		</>
	);
};

export default DisplayCourseCard;
