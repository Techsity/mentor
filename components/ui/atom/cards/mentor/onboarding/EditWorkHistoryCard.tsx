import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { PrimaryButton } from "../../../buttons";
import { slugify } from "../../../../../../utils";
import { toast } from "react-toastify";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { IMentorExperience } from "../../../../../../interfaces/mentor.interface";

const EditWorkHistoryCard = ({
	experience,
	allExperiences,
	updateWorkExperiences,
}: {
	experience?: IMentorExperience;
	allExperiences: IMentorExperience[];
	updateWorkExperiences?: (updated: IMentorExperience[]) => void;
}) => {
	const initialState: IMentorExperience = {
		company: "",
		to_year: "",
		from_year: "",
		job_role: "",
		description: "",
	};
	const [startDateCalendarIsOpen, setStartDateCalendarIsOpen] = useState<boolean>(false);
	const [endDateCalendarIsOpen, setEndDateCalendarIsOpen] = useState<boolean>(false);
	const [workExperience, setWorkExperience] = useState<IMentorExperience>(experience || initialState);
	const [loading, setLoading] = useState<boolean>(false);

	const isDuplicate = useMemo(() => {
		return allExperiences.some(
			(work) =>
				work.company === workExperience.company &&
				work.job_role === workExperience.job_role &&
				work.from_year === workExperience.from_year &&
				work.description === workExperience.description &&
				work.to_year === workExperience.to_year,
		);
	}, [allExperiences, workExperience]);

	const handleAddWorkHistory = () => {
		if (
			workExperience.company &&
			workExperience.from_year &&
			workExperience.to_year &&
			workExperience.job_role
			//  &&
			// workExperience.position
		) {
			if (!isDuplicate)
				updateWorkExperiences &&
					updateWorkExperiences(
						allExperiences.concat({
							...workExperience,
						}),
					);
			setWorkExperience(initialState);
		}
	};
	const handleExperienceUpdate = (updatedExp: IMentorExperience) => {
		setLoading(true);
		const updatedExperiences = [...allExperiences];
		const indexOfExperienceToUpdate = updatedExperiences.findIndex(
			(experience) =>
				experience.company === updatedExp.company &&
				experience.from_year === updatedExp.from_year &&
				experience.to_year === updatedExp.to_year,
		);
		if (indexOfExperienceToUpdate !== -1) {
			updatedExperiences[indexOfExperienceToUpdate] = {
				...updatedExperiences[indexOfExperienceToUpdate],
				...updatedExp,
			};
			if (updateWorkExperiences) updateWorkExperiences(updatedExperiences);

			setTimeout(function () {
				setLoading(false);
				toast.success("Field updated successfully");
			}, 1000);
		}
	};
	const handleRemoveExperience = () => {
		if (experience) {
			const updatedWorkHistory = allExperiences.filter(
				(work) =>
					slugify(work.company) !== slugify(experience?.company) && work.job_role === experience?.job_role,
			);
			if (updateWorkExperiences) updateWorkExperiences(updatedWorkHistory);
		}
	};
	return (
		<>
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative pt-8">
				{experience && (
					<span className="absolute top-2 right-3 cursor-pointer z-10">
						<svg
							onClick={handleRemoveExperience}
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
				)}
				<div className="col-span-4 grid gap-1">
					{experience && (
						<label htmlFor="" className="text-xs">
							Name of Company
						</label>
					)}

					<CustomTextInput
						name="name_of_company"
						id="name_of_company"
						type="text"
						placeholder="Company"
						className="text-black"
						onChange={(e) => {
							setWorkExperience({
								...workExperience,
								company: e.target.value,
							});
						}}
						value={workExperience.company}
						containerprops={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
				<div className="col-span-2 grid gap-1 relative z-10">
					{experience && (
						<label htmlFor="" className="text-xs">
							Start Date
						</label>
					)}

					<CustomTextInput
						name="start_date"
						id="start_date"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="Start Date"
						value={workExperience.from_year}
						containerprops={{
							className: "border cursor-pointer border-zinc-200",
						}}
						readOnly
						onClick={() => {
							setEndDateCalendarIsOpen(false);
							setStartDateCalendarIsOpen(!startDateCalendarIsOpen);
						}}
					/>
					{startDateCalendarIsOpen && !endDateCalendarIsOpen && (
						<div className="absolute right-0 top-16">
							<Calendar
								onChange={(props) => {
									const date = new Date(props as Date).toLocaleDateString();
									setWorkExperience({
										...workExperience,
										from_year: date,
									});
									setStartDateCalendarIsOpen(false);
								}}
								maxDate={new Date()}
							/>
						</div>
					)}
				</div>
				<div className="col-span-2 grid gap-1 relative z-10">
					{experience && (
						<label htmlFor="" className="text-xs">
							End Date
						</label>
					)}

					<CustomTextInput
						name="end_date"
						id="end_date"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="End Date"
						value={workExperience.to_year}
						containerprops={{
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
									const date = new Date(props as Date).toLocaleDateString();
									setWorkExperience({
										...workExperience,
										to_year: date,
									});
									setEndDateCalendarIsOpen(false);
								}}
								maxDate={new Date()}
								minDate={new Date(workExperience.from_year)}
							/>
						</div>
					)}
				</div>
				<div className="col-span-4 grid gap-1">
					{experience && (
						<label htmlFor="" className="text-xs">
							Job Role
						</label>
					)}

					<CustomTextInput
						name="job_role"
						id="job_role"
						type="text"
						placeholder="Your Role"
						className="text-black"
						containerprops={{
							className: "border border-zinc-200",
						}}
						value={workExperience.job_role}
						onChange={(e) =>
							setWorkExperience({
								...workExperience,
								job_role: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-span-4 grid gap-1">
					{experience && (
						<label htmlFor="" className="text-xs">
							Role Description
						</label>
					)}

					<CustomTextInput
						name="about_role"
						id="about_role"
						placeholder="About This Role"
						type="text"
						className="text-black"
						value={workExperience.description}
						onChange={(e) =>
							setWorkExperience({
								...workExperience,
								description: e.target.value,
							})
						}
						containerprops={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
			</div>
			{!experience ? (
				<div
					onClick={handleAddWorkHistory}
					className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer">
					<span className="text-2xl">+</span>
					<p className="">Add New Experience</p>
				</div>
			) : (
				!isDuplicate && (
					<div className="flex justify-end gap-4 items-center w-full">
						<PrimaryButton
							title={loading ? "" : "Update"}
							icon={loading ? <ActivityIndicator /> : null}
							disabled={loading}
							className="px-8 p-1 rounded"
							onClick={() => {
								handleExperienceUpdate(workExperience);
							}}
						/>
					</div>
				)
			)}
		</>
	);
};

export default EditWorkHistoryCard;
