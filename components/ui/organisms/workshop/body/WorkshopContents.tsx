import React, { MouseEventHandler, useState } from "react";
import { IWorkshop, IWorkshopContent } from "../../../../../interfaces";
import { calculateTotalDuration, slugify } from "../../../../../utils";
import { PrimaryButton } from "../../../atom/buttons";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setWorkshopToRegister } from "../../../../../redux/reducers/workshopSlice";
import { useRouter } from "next/router";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";

const WorkshopContents = ({
	workshop,
	className,
	preview = false,
}: {
	workshop: IWorkshop;
	className?: string;
	preview?: boolean;
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const WorkshopContentItem = ({ content }: { content: IWorkshopContent }) => {
		// Determine whether it's AM or PM based on the time
		const parseMeridan = (time: string) => parseInt(time.split(":")[0], 10);
		const startTimeMeridan =
			parseMeridan(content.startTime) == 0 ? "AM" : parseMeridan(content.startTime) >= 12 ? "PM" : "AM";
		const endTimeMeridan =
			parseMeridan(content.endTime) == 0 ? "AM" : parseMeridan(content.endTime) >= 12 ? "PM" : "AM";
		content.startTime = parseInt(content.startTime.split(":")[0], 10) == 0 ? "12:00" : content.startTime;
		content.endTime = parseInt(content.endTime.split(":")[0], 10) == 0 ? "12:00" : content.endTime;

		return (
			<>
				<div
					className={`p-2 px-4 border border-[#70C5A1] bg-[#70C5A1] text-white select-none cursor-default duration-300 relative z-10`}>
					<div className="group relative w-full h-full">
						<h1 className="grid items-center gap-2 text-sm">
							{content.title}{" "}
							<span className="flex items-center justify-between">
								<span className={`text-white`}>{new Date(content.date).toDateString()}</span>
								<span className={`text-white`}>
									{content.startTime.split(":").slice(0, 2).join(":") + startTimeMeridan} -{" "}
									{content.endTime.split(":").slice(0, 2).join(":") + endTimeMeridan}
								</span>
							</span>
						</h1>
					</div>
				</div>
			</>
		);
	};
	return (
		<div
			className={classNames(
				"lg:max-w-[38%] 2xl:max-w-[34%] w-full bg-[#fff] sm:p-8 p-4 h-full text-black xl:-mt-28 border-2 border-[#70C5A1] lg:sticky top-24 overflow-y-auto animate__animated animate__fadeIn",
				className,
			)}>
			<div className="flex items-center justify-between">
				<h1 className="font-semibold">Workshop Schedule</h1>
				{workshop.price !== 0 ? (
					<div className="p-2 text-sm px-8 border border-[#FFB100] text-[#FFB100] duration-300 select-none cursor-default">
						${workshop.price.toLocaleString()}
					</div>
				) : (
					<div className="p-2 text-sm px-8 border border-[#70C5A1] text-[#70C5A1] duration-300 select-none cursor-default">
						Free
					</div>
				)}
			</div>
			<div className="grid gap-4 overflow-hidden relative mt-5">
				{workshop.contents.map((content, index) => (
					<WorkshopContentItem content={content} key={index} />
				))}
				{preview ? (
					<PrimaryButton
						title={!loading ? "Register for Workshop" : ""}
						icon={loading ? <ActivityIndicator /> : null}
						onClick={() => {
							dispatch(setWorkshopToRegister(workshop));
							setLoading(true);
							setTimeout(function () {
								router.push(`/workshops/${workshop.id}/register`);
							}, 1000);
						}}
						className="p-2 text-lg flex justify-center items-center mt-6 text-sm"
					/>
				) : null}
			</div>
		</div>
	);
};

export default WorkshopContents;
