import React, { useState } from "react";
import { Calendar } from "react-calendar";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { IMentorOnboardingState } from "../../../../../../../interfaces/mentor.interface";
import { slugify } from "../../../../../../../utils";

type ExtractedEducationType = IMentorOnboardingState["education"][0];

const Education = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initalState: ExtractedEducationType = {
		school: { name: "" },
		endDate: "",
		startDate: "",
		course: "",
		degree: "",
	};
	const [startDateCalendarIsOpen, setStartDateCalendarIsOpen] =
		useState<boolean>(false);
	const [endDateCalendarIsOpen, setEndDateCalendarIsOpen] =
		useState<boolean>(false);

	const [education, setEducation] =
		useState<ExtractedEducationType>(initalState);

	const handleAddEducation = () => {
		if (education.school.name && education.startDate && education.endDate) {
			const isDuplicate =
				onboardingMentor.education &&
				onboardingMentor.education.some(
					(edu) =>
						edu.school.name.toLowerCase() ===
							education.school.name.toLowerCase() &&
						edu.startDate === education.startDate &&
						edu.endDate === education.endDate,
				);
			if (!isDuplicate)
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						education:
							onboardingMentor.education?.concat(education),
					}),
				);
			setEducation(initalState);
		}
	};

	const handleRemoveEducation = (slug: string) => {
		if (onboardingMentor.education) {
			const updatedEducation = onboardingMentor.education.filter(
				(education) => slugify(education.school.name) !== slug,
			);
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					education: updatedEducation,
				}),
			);
		}
	};

	return (
		<div className="">
			<h1 className="text-sm text-[#B1B1B1]">Education</h1>
			<div className="flex flex-col gap-4 items-center mb-5 -mt-2">
				{onboardingMentor?.education &&
					onboardingMentor.education?.length >= 1 &&
					onboardingMentor.education.map((educaton, index) => {
						const id = slugify(educaton.school.name);
						return (
							<div
								key={id}
								className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative animate__animated animate__fadeInUp animate__fastest">
								<span className="absolute top-2 right-3 cursor-pointer z-10">
									<svg
										onClick={() => {
											handleRemoveEducation(id);
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
										Name of School
									</label>
									<CustomTextInput
										name="name_of_school"
										id="name_of_school"
										type="text"
										className="text-black"
										readOnly
										value={education.school.name}
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
										value={education.startDate}
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
										value={education.endDate}
										containerProps={{
											className: "border border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<div className="col-span-4 grid gap-1">
									<CustomTextInput
										name="degree"
										id="degree"
										type="text"
										placeholder="Degree"
										readOnly
										value={education.degree}
										className="text-black"
										containerProps={{
											className: "border border-zinc-200",
										}}
									/>
								</div>
								<div className="col-span-4 grid gap-1">
									<CustomTextInput
										name="course"
										id="course"
										placeholder="Course"
										readOnly
										value={education.course}
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
						name="name_of_school"
						id="name_of_school"
						type="text"
						placeholder="Name of School"
						className="text-black"
						onChange={(e) => {
							setEducation({
								...education,
								school: { name: e.target.value },
							});
						}}
						value={education.school.name}
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
						value={education.startDate}
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
									setEducation({
										...education,
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
						name="end_date"
						id="end_date"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="End Date"
						value={education.endDate}
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
									setEducation({
										...education,
										endDate: date,
									});
									setEndDateCalendarIsOpen(false);
								}}
								maxDate={new Date()}
								minDate={new Date(education.startDate)}
							/>
						</div>
					)}
				</div>
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="degree"
						id="degree"
						type="text"
						placeholder="Degree"
						className="text-black"
						containerProps={{
							className: "border border-zinc-200",
						}}
						value={education.degree}
						onChange={(e) =>
							setEducation({
								...education,
								degree: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="course"
						id="course"
						placeholder="Course"
						type="text"
						className="text-black"
						value={education.course}
						onChange={(e) =>
							setEducation({
								...education,
								course: e.target.value,
							})
						}
						containerProps={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
			</div>
			<div
				onClick={handleAddEducation}
				className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer">
				<span className="text-2xl">+</span>
				<p className="">Add Education</p>
			</div>
		</div>
	);
};

export default Education;
