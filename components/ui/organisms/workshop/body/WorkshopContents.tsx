import React, { MouseEventHandler, useState } from "react";
import { IWorkshop, IWorkshopContent } from "../../../../../interfaces";
import { calculateTotalDuration, slugify } from "../../../../../utils";
import { PrimaryButton } from "../../../atom/buttons";
import classNames from "classnames";

const WorkshopContents = ({
	workshop,
	className,
	live = false,
}: {
	workshop: IWorkshop;
	className?: string;
	live?: boolean;
}) => {
	const CourseContentItem = ({ content }: { content: IWorkshopContent }) => {
		return (
			<>
				<div
					className={`p-2 px-4 border border-[#70C5A1] bg-[#70C5A1] text-white select-none cursor-default duration-300 relative z-10`}>
					<div className="group relative w-full h-full">
						<h1 className="grid items-center gap-2">
							{content.title}{" "}
							<span className="flex items-center gap-10">
								<span className={`text-white text-sm`}>
									{content.date.toDateString()}
								</span>
								<span className={`text-white text-sm`}>
								1:00pm - 2:15PM
								</span>
							</span>
						</h1>
					</div>
				</div>
			</>
		);
	};
	return live ? (
		<div
			className={classNames(
				"lg:max-w-[38%] 2xl:max-w-[34%] w-full bg-[#fff] sm:p-8 p-4 xl:min-h-[85vh] text-black xl:-mt-24 border-2 border-[#70C5A1] lg:sticky top-24 overflow-y-auto animate__animated animate__fadeIn",
				className,
			)}>
			{/* <div className="xl:max-w-[35%] w-full bg-[#fff] sm:p-8 p-4 xl:min-h-[85vh] text-black xl:-mt-24 border-2 border-[#70C5A1] lg:sticky top-24 overflow-y-auto  animate__animated animate__slideInRight order-first lg:order-last"> */}
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-xl mb-3">Course Content</h1>
				{/* {workshop.price !== "free" ? (
					<div className="p-2 px-8 border border-[#FFB100] text-[#FFB100] duration-300 select-none cursor-default">
						₦{workshop.price.toLocaleString()}
					</div>
				) : (
					<div className="p-2 px-8 border border-[#70C5A1] text-[#70C5A1] duration-300 select-none cursor-default">
						Free
					</div>
				)} */}
			</div>
			<div className="my-6 grid gap-4 overflow-hidden">
				{workshop.contents.map((content, index) => (
					<CourseContentItem content={content} key={index} />
				))}
			</div>
		</div>
	) : (
		<div
			className={classNames(
				"lg:max-w-[38%] w-full bg-[#fff] sm:p-8 p-4 xl:min-h-[85vh] text-black xl:-mt-24 border-2 border-[#70C5A1] lg:sticky top-24 overflow-y-auto animate__animated animate__fadeIn",
				className,
			)}>
			{/* <div className="xl:max-w-[35%] w-full bg-[#fff] sm:p-8 p-4 xl:min-h-[85vh] text-black xl:-mt-24 border-2 border-[#70C5A1] lg:sticky top-24 overflow-y-auto  animate__animated animate__slideInRight order-first lg:order-last"> */}
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-xl">Course Content</h1>
				{workshop.price !== "free" ? (
					<div className="p-2 px-8 border border-[#FFB100] text-[#FFB100] duration-300 select-none cursor-default">
						₦{workshop.price.toLocaleString()}
					</div>
				) : (
					<div className="p-2 px-8 border border-[#70C5A1] text-[#70C5A1] duration-300 select-none cursor-default">
						Free
					</div>
				)}
			</div>
			<div className="my-6 grid gap-4 overflow-hidden">
				{workshop.contents.map((content, index) => (
					<CourseContentItem content={content} key={index} />
				))}

				<PrimaryButton
					title="Register for Workshop"
					link={`/workshops/${slugify(workshop.title)}/register`}
					className="p-4 text-lg flex justify-center items-center"
				/>
			</div>
		</div>
	);
};

export default WorkshopContents;
