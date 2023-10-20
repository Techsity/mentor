/* eslint-disable @next/next/no-img-element */
import React from "react";

const HowMentorsCanMentorYou = () => {
	return (
		<div className="py-10">
			<h1
				className="text-center text-[#70C5A1] md:text-2xl text-xl px-5"
				style={{ fontFamily: "Days One" }}>
				How mentors on Mentör can help you
			</h1>
			<div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 mt-8 px-6 sm:px-10 lg:px-24">
				<div className="max-w-sm bg-white border border-[#70C5A1] cursor-default hover:shadow-lg duration-300 pb-6">
					<a href="#">
						<img
							loading="lazy"
							className="rounded-t-lg"
							src="/assets/images/how_mentor_1.png"
							alt=""
						/>
					</a>
					<h1
						style={{ fontFamily: "Days One" }}
						className="mt-5 text-lg px-5">
						Navigate to <br className="hidden sm:block" /> Mentors
					</h1>
				</div>
				<div className="max-w-sm bg-white border border-[#70C5A1] cursor-default hover:shadow-lg duration-300 pb-6">
					<a href="#">
						<img
							loading="lazy"
							className="rounded-t-lg"
							src="/assets/images/how_mentor_2.png"
							alt=""
						/>
					</a>
					<h1
						style={{ fontFamily: "Days One" }}
						className="mt-5 text-lg max-w-md px-5">
						Search for the Mentor that interests you
					</h1>
				</div>
				<div className="max-w-sm bg-white border border-[#70C5A1] cursor-default hover:shadow-lg duration-300 pb-6">
					<a href="#">
						<img
							loading="lazy"
							className="rounded-t-lg"
							src="/assets/images/how_mentor_3.png"
							alt=""
						/>
					</a>
					<h1
						style={{ fontFamily: "Days One" }}
						className="mt-5 text-lg max-w-md px-5">
						Schedule a session or start an instant session.
					</h1>
				</div>
				<div className="max-w-sm bg-white border border-[#70C5A1] cursor-default hover:shadow-lg duration-300 pb-6">
					<a href="#">
						<img
							loading="lazy"
							className="rounded-t-lg"
							src="/assets/images/how_mentor_4.png"
							alt=""
						/>
					</a>
					<h1
						style={{ fontFamily: "Days One" }}
						className="mt-5 text-lg max-w-md px-5">
						Become better than you came!
					</h1>
				</div>
			</div>
		</div>
	);
};

export default HowMentorsCanMentorYou;
