/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const BlogPageHero = () => {
	const filters: string[] = [
		"Mentör",
		"Digital Courses",
		"Vocational Courses",
		"Educational Courses",
		"News",
	];

	return (
		<div
			className="min-h-[65vh] pt-36 px-6 sm:px-12 lg:px-32 relative"
			style={{
				background: "url('/assets/images/blog_page_bg2.png')",
				backgroundSize: "120% 100%",
				backgroundRepeat: "no-repeat",
				backgroundColor: "#021A05",
			}}
		>
			<div className="flex justify-between items-center">
				<div className="animate__animated animate__fadeInLeft text-white">
					<h1 style={{ fontFamily: "Days One" }} className="text-3xl">
						Check out some of our blogs
					</h1>
					<p className="font-[400] mt-5">
						Mentör blog is an open source community for everyone... You can also
						contribute to the blogs.
					</p>
					<div className="flex justify-start mt-6 select-none">
						<Link href="#">
							<span
								className="border px-10 p-3 whitespace-nowrap cursor-pointer duration-300 hover:bg-[#70C5A15a]"
								style={{ fontFamily: "Days One" }}
							>
								Make a Blog Post
							</span>
						</Link>
					</div>
					<div className="flex flex-wrap justify-start gap-5 items-center mt-6 select-none">
						<h1>Filter by:</h1>
						{filters.map((filter, index) => {
							return filter ? (
								<label
									htmlFor={filter.toLowerCase()}
									className="flex gap-1 items-center"
									key={index}
								>
									<input
										name={filter.toLowerCase()}
										id={filter.toLowerCase()}
										type="checkbox"
										className="border border-[#70C5A1] outline-[#70C5A1] bg-[#70C5A1] focus:ring-0"
									/>
									{filter}
								</label>
							) : null;
						})}
					</div>
				</div>
				<div className="sm:flex hidden justify-center items-center animate__animated animate__fadeInRight">
					<div className="bg-[#70C5A1] h-[230px] flex justify-center items-center w-[230px] rounded-full animate__animated animate__rubberBand animate__infinite animate__slow">
						<svg width="108" height="130" viewBox="0 0 108 130" fill="none">
							<path
								d="M0 81.3035C0 48.9533 17.9851 32.7781 53.9553 32.7781C89.9851 32.7781 108 48.9533 108 81.3035C108 97.336 103.385 109.46 94.1538 117.676C84.923 125.892 71.5236 130 53.9553 130C36.4467 130 23.077 125.892 13.8462 117.676C4.61542 109.46 0 97.336 0 81.3035ZM18.4914 13.0941V9.842C18.4914 3.28067 21.9157 0 28.7643 0H37.34C44.1886 0 47.6129 3.28067 47.6129 9.842V13.0941C47.6129 19.6555 44.1886 22.9361 37.34 22.9361H28.7643C21.9157 22.9361 18.4914 19.6555 18.4914 13.0941ZM77.0918 81.3891C77.0918 61.9333 69.4094 52.2054 54.0447 52.2054C38.6799 52.2054 30.9975 61.9333 30.9975 81.3891C30.9975 100.845 38.6799 110.573 54.0447 110.573C69.4094 110.573 77.0918 100.845 77.0918 81.3891ZM63.335 13.0941V9.842C63.335 3.28067 66.7593 0 73.6079 0H82.1836C89.0322 0 92.4566 3.28067 92.4566 9.842V13.0941C92.4566 19.6555 89.0322 22.9361 82.1836 22.9361H73.6079C66.7593 22.9361 63.335 19.6555 63.335 13.0941Z"
								fill="white"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogPageHero;
