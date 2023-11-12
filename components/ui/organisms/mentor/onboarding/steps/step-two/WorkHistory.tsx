import React, { useState } from "react";
import { Calendar } from "react-calendar";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { IExperience } from "../../../../../../../interfaces/mentor.interface";
import { slugify } from "../../../../../../../utils";

type ExtractedExperienceType = Pick<
	IExperience,
	"company" | "endDate" | "startDate" | "position" | "topSkils"
> & { aboutRole?: string; role: string };

const WorkHistory = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initalState: ExtractedExperienceType = {
		company: { name: "" },
		endDate: "",
		startDate: "",
		position: "",
		role: "",
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
			workExperience.company.name &&
			workExperience.startDate &&
			workExperience.endDate &&
			workExperience.role
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
						workHistory:
							onboardingMentor.workHistory?.concat(
								workExperience,
							),
					}),
				);
			setWorkExperience(initalState);
		}
	};

	const handleRemoveWorkHistory = (slug: string) => {
		if (onboardingMentor.workHistory) {
			const updatedWorkHistory = onboardingMentor.workHistory.filter(
				(work) => slugify(work.company.name) !== slug,
			);
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
		<div className="">
			<h1 className="text-sm text-[#B1B1B1] mb-3">Where have you worked?</h1>
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.workHistory &&
					onboardingMentor.workHistory?.length >= 1 &&
					onboardingMentor.workHistory.map((work, index) => {
						const id = slugify(work.company.name);
						return (
							<div
								key={id}
								className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative animate__animated animate__fadeInUp animate__fastest">
								<span className="absolute top-2 right-3 cursor-pointer z-10">
									<svg
										onClick={() => {
											handleRemoveWorkHistory(id);
										}}
										className="h-5 w-5 ml-3 cursor-pointer"
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
										className="text-black select-none"
										placeholder="Start Date"
										value={work.startDate}
										containerProps={{
											className: "border border-zinc-200",
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
										className="text-black select-none"
										placeholder="End Date"
										value={work.endDate}
										containerProps={{
											className: "border border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<div className="col-span-4 grid gap-1">
									<CustomTextInput
										name="roles"
										id="roles"
										type="text"
										placeholder="Your Role"
										readOnly
										value={work.role}
										className="text-black"
										containerProps={{
											className: "border border-zinc-200",
										}}
									/>
								</div>
								<div className="col-span-4 grid gap-1">
									<CustomTextInput
										name="about_roles"
										id="about_roles"
										placeholder="About This Role"
										readOnly
										value={work.aboutRole}
										type="text"
										className="text-black"
										containerProps={{
											className: "border border-zinc-200",
										}}
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
						placeholder="Company"
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
								minDate={new Date(workExperience.startDate)}
							/>
						</div>
					)}
				</div>
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="roles"
						id="roles"
						type="text"
						placeholder="Your Role"
						className="text-black"
						containerProps={{
							className: "border border-zinc-200",
						}}
						value={workExperience.role}
						onChange={(e) =>
							setWorkExperience({
								...workExperience,
								role: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="about_roles"
						id="about_roles"
						placeholder="About This Role"
						type="text"
						className="text-black"
						value={workExperience.aboutRole}
						onChange={(e) =>
							setWorkExperience({
								...workExperience,
								aboutRole: e.target.value,
							})
						}
						containerProps={{
							className: "border border-zinc-200",
						}}
					/>
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

export default WorkHistory;
