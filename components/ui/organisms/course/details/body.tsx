import React, { MouseEventHandler, useState } from "react";
import { ICourse, ICourseContent } from "../../../../../interfaces";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { calculateTotalDuration, parseDuration } from "../../../../../utils";

const CourseDetailsBody = (course: ICourse) => {
	const [activeContent, setActiveContent] = useState<ICourseContent>(
		course.content[0],
	);
	const CourseContentDropdown = ({
		content,
		onClick,
	}: {
		content: ICourseContent;
		onClick?: MouseEventHandler<HTMLDivElement>;
	}) => {
		const mainDuration = calculateTotalDuration(content);
		return (
			<>
				<div
					onClick={onClick}
					className={`p-4 border border-[#70C5A1] ${
						activeContent === content
							? "bg-white"
							: "bg-[#70C5A1] text-white"
					} select-none cursor-pointer duration-300 relative z-10`}>
					<div className="group relative w-full h-full">
						<div className="flex justify-between items-center duration-300">
							<h1 className="grid items-center gap-2">
								{content.title}{" "}
								<span className="text-sm text-[#A3A6A7]">
									{mainDuration}
								</span>
							</h1>
							<svg
								width="23"
								height="23"
								viewBox="0 0 23 23"
								fill="none"
								className={`duation-300 ${
									activeContent === content
										? ""
										: "rotate-[180deg]"
								}`}>
								<path
									d="M0.25 11.5C0.25 13.725 0.909801 15.9001 2.14597 17.7502C3.38213 19.6002 5.13914 21.0422 7.19481 21.8936C9.25048 22.7451 11.5125 22.9679 13.6948 22.5338C15.8771 22.0997 17.8816 21.0283 19.455 19.4549C21.0283 17.8816 22.0998 15.877 22.5338 13.6948C22.9679 11.5125 22.7451 9.25047 21.8936 7.19481C21.0422 5.13914 19.6002 3.38213 17.7502 2.14596C15.9001 0.909798 13.725 0.249996 11.5 0.249996C10.0226 0.249996 8.55973 0.540985 7.19481 1.10635C5.8299 1.67171 4.58971 2.50039 3.54505 3.54504C2.50039 4.5897 1.67172 5.82989 1.10636 7.19481C0.54099 8.55972 0.25 10.0226 0.25 11.5ZM16.5625 13.75L6.4375 13.75L11.5 6.99999L16.5625 13.75Z"
									fill={
										activeContent === content
											? "#70C5A1"
											: "white"
									}
								/>
							</svg>
						</div>
					</div>
				</div>
				{activeContent === content ? (
					<div className="p-2 pb-3 grid gap-3 animate__animated animate__slideInDown animate__faster">
						{content.list.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between">
								{item.name}
								<span className="flex items-center gap-3 text-sm text-[#A3A6A7]">
									{parseDuration(item.duration)}
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none">
										<path
											d="M8 0.5C6.51664 0.5 5.0666 0.939867 3.83323 1.76398C2.59986 2.58809 1.63856 3.75943 1.07091 5.12988C0.50325 6.50032 0.354725 8.00832 0.644114 9.46318C0.933503 10.918 1.64781 12.2544 2.6967 13.3033C3.7456 14.3522 5.08197 15.0665 6.53683 15.3559C7.99168 15.6453 9.49968 15.4968 10.8701 14.9291C12.2406 14.3614 13.4119 13.4001 14.236 12.1668C15.0601 10.9334 15.5 9.48336 15.5 8C15.5 7.01509 15.306 6.03982 14.9291 5.12988C14.5522 4.21993 13.9997 3.39314 13.3033 2.6967C12.6069 2.00026 11.7801 1.44781 10.8701 1.0709C9.96019 0.693993 8.98492 0.5 8 0.5ZM6.5 11.375V4.625L11 8L6.5 11.375Z"
											fill="#A3A6A7"
										/>
									</svg>
								</span>
							</div>
						))}
					</div>
				) : null}
			</>
		);
	};
	return (
		<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-6">
			<div className="flex flex-col xl:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow xl:min-h-screen overflow-hidden">
					<AnimationOnScroll
						animateIn="animate__slideInUp"
						animateOnce>
						<div className="">
							<h1 className="font-semibold text-xl">
								About this Course
							</h1>
							<p className="text-zinc-400 font-[300] max-w-2xl py-4">
								{course.description}
							</p>
						</div>
					</AnimationOnScroll>
					<div className=""></div>
					<div className=""></div>
					<div className=""></div>
				</div>
				<div className="xl:max-w-[35%] w-full bg-[#fff] p-8 xl:min-h-[85vh] text-black xl:-mt-24 border-2 border-[#70C5A1] sticky top-24 overflow-y-auto  animate__animated animate__slideInRight">
					<div className="flex items-center justify-between">
						<h1 className="font-semibold text-xl">
							Course Content
						</h1>
						<div className="p-2 px-8 border border-[#70C5A1] text-[#70C5A1] duration-300 select-none cursor-default">
							₦{course.price.toLocaleString()}
						</div>
					</div>
					<div className="my-6 grid gap-4 overflow-hidden">
						{course.content.map((content, index) => (
							<CourseContentDropdown
								content={content}
								key={index}
								onClick={() => setActiveContent(content)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetailsBody;
