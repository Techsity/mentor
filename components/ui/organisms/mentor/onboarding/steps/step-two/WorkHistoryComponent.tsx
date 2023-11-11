import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { IExperience } from "../../../../../../../interfaces/mentor.interface";
import { Add, CalendarClearOutline } from "react-ionicons";

type ExtractedExperienceType = Pick<
	IExperience,
	"company" | "endDate" | "startDate" | "position" | "topSkils" | "roles"
> & { aboutRole?: string };

const WorkHistoryComponent = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initalState: ExtractedExperienceType = {
		company: { name: "" },
		endDate: new Date().toLocaleDateString(),
		startDate: new Date().toLocaleDateString(),
		position: "",
		roles: [],
		topSkils: [],
		aboutRole: "",
	};
	const [startDateCalendarIsOpen, setStartDateCalendarIsOpen] =
		useState<boolean>(false);
	const [endDateCalendarIsOpen, setEndDateCalendarIsOpen] =
		useState<boolean>(false);

	const [workExperience, setWorkExperience] =
		useState<ExtractedExperienceType>(initalState);

	const handleAddWorkHistory = () => {
		if (
			workExperience.company &&
			workExperience.startDate &&
			workExperience.endDate
			//  &&
			// workExperience.position
		) {
			const isDuplicate =
				onboardingMentor.workHistory &&
				onboardingMentor.workHistory.some(
					(work) =>
						work.company.name.toLowerCase() ===
							workExperience.company.name.toLowerCase() &&
						work.startDate === workExperience.startDate &&
						work.endDate === workExperience.endDate,
				);
			if (!isDuplicate)
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						workHistory: onboardingMentor.workHistory?.concat([
							workExperience,
						]),
					}),
				);
			setWorkExperience(initalState);
		}
	};

	const handleRemoveWorkHistory = (id: number) => {
		if (onboardingMentor.workHistory) {
			const updatedWorkHistory = onboardingMentor.workHistory.filter(
				(work) =>
					(onboardingMentor.workHistory?.indexOf(work) as number) +
						1 !==
					id,
			);
			console.log(id);
			console.log(updatedWorkHistory);
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					workHistory: updatedWorkHistory,
				}),
			);
		}
	};
	// useEffect(() => {
	// 	dispatch(
	// 		setOnboardingMentor({
	// 			...onboardingMentor,
	// 			workHistory: onboardingMentor.workHistory?.concat([
	// 				workExperience,
	// 			]),
	// 		}),
	// 	);

	// 	return () => {}
	// }, [workExperience]);

	return (
		<div className="gap-2 grid">
			<h1 className="text-sm text-[#B1B1B1]">Where have you worked?</h1>
			<div className="flex flex-col gap-4 items-center">
				{onboardingMentor?.workHistory &&
					onboardingMentor.workHistory?.length >= 1 &&
					onboardingMentor.workHistory.map((work) => {
						const id: number = (onboardingMentor?.workHistory &&
							onboardingMentor.workHistory?.indexOf(work) +
								1) as number;
						return (
							<div
								key={id}
								className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative">
								<span className="absolute top-5 right-0">
									<svg
										onClick={() => {
											if (id) handleRemoveWorkHistory(id);
										}}
										className="h-5 w-5 ml-3"
										viewBox="0 0 20 20"
										fill="#d31119">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								</span>
								<div className="col-span-4 grid gap-1">
									<label htmlFor="" className="text-xs">
										Company
									</label>
									<CustomTextInput
										name="name_of_company"
										id="name_of_company"
										type="text"
										className="text-black"
										readOnly
										value={work.company.name}
										containerProps={{
											className: "border border-zinc-200",
										}}
									/>
								</div>
								<div className="col-span-2 grid gap-1 relative">
									<label htmlFor="" className="text-xs">
										Start Date
									</label>
									<CustomTextInput
										type="text"
										className="text-black cursor-pointer select-none"
										placeholder="Start Date"
										value={work.startDate}
										containerProps={{
											className:
												"border cursor-pointer border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<div className="col-span-2 grid gap-1 relative">
									<label htmlFor="" className="text-xs">
										End Date
									</label>
									<CustomTextInput
										type="text"
										className="text-black cursor-pointer select-none"
										placeholder="End Date"
										value={work.endDate}
										containerProps={{
											className:
												"border cursor-pointer border-zinc-200",
										}}
										readOnly
									/>
								</div>
							</div>
						);
					})}
			</div>
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3">
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="name_of_company"
						id="name_of_company"
						type="text"
						className="text-black"
						onChange={(e) => {
							setWorkExperience({
								...workExperience,
								company: { name: e.target.value },
							});
						}}
						value={workExperience.company.name}
						containerProps={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
				<div className="col-span-2 grid gap-1 relative">
					<CustomTextInput
						name="start_date"
						id="start_date"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="Start Date"
						value={workExperience.startDate}
						// rightIcon={
						// 	<CalendarClearOutline
						// 		height={"20px"}
						// 		width={"20px"}
						// 	/>
						// }
						containerProps={{
							className: "border cursor-pointer border-zinc-200",
						}}
						readOnly
						onClick={() => {
							setEndDateCalendarIsOpen(false);
							setStartDateCalendarIsOpen(
								!startDateCalendarIsOpen,
							);
						}}
					/>
					{startDateCalendarIsOpen && !endDateCalendarIsOpen && (
						<div className="absolute right-0 top-16">
							<Calendar
								onChange={(props) => {
									const date = new Date(
										props as Date,
									).toLocaleDateString();
									setWorkExperience({
										...workExperience,
										startDate: date,
									});
									setStartDateCalendarIsOpen(false);
								}}
								maxDate={new Date()}
							/>
						</div>
					)}
				</div>
				<div className="col-span-2 grid gap-1 relative">
					<CustomTextInput
						// ref={endDateRef}
						name="end_date"
						id="end_date"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="End Date"
						value={workExperience.endDate}
						// rightIcon={
						// 	<CalendarClearOutline
						// 		height={"20px"}
						// 		width={"20px"}
						// 	/>
						// }
						containerProps={{
							className: "border cursor-pointer border-zinc-200",
						}}
						readOnly
						onClick={() => {
							setStartDateCalendarIsOpen(false);
							setEndDateCalendarIsOpen(!endDateCalendarIsOpen);
						}}
					/>
					{endDateCalendarIsOpen && !startDateCalendarIsOpen && (
						<div className="absolute right-0 top-16">
							<Calendar
								onChange={(props) => {
									const date = new Date(
										props as Date,
									).toLocaleDateString();
									setWorkExperience({
										...workExperience,
										endDate: date,
									});
									setEndDateCalendarIsOpen(false);
								}}
								maxDate={new Date()}
							/>
						</div>
					)}
				</div>
			</div>
			<div
				onClick={handleAddWorkHistory}
				className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer">
				<span className="text-2xl">+</span>
				<p className="">Add New Experience</p>
			</div>
		</div>
	);
};

export default WorkHistoryComponent;
