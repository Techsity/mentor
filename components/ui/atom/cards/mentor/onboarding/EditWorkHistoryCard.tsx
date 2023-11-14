import React, { useState } from "react";
import Calendar from "react-calendar";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { IExperience } from "../../../../../../interfaces/mentor.interface";
import { PrimaryButton } from "../../../buttons";
import { slugify } from "../../../../../../utils";
import { TrashBinOutline } from "react-ionicons";
import { toast } from "react-toastify";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { ToastDefaultOptions } from "../../../../../../constants";

const EditWorkHistoryCard = ({
	experience,
	allExperiences,
	updateWorkExperiences,
	onRemove,
}: {
	experience?: IExperience;
	allExperiences: IExperience[];
	updateWorkExperiences?: (updated: IExperience[]) => void;
	onRemove?: (id: string) => void;
}) => {
	const initialState: IExperience = {
		id: "",
		company: { name: "" },
		endDate: "",
		startDate: "",
		position: "",
		role: "",
		topSkills: [],
		aboutRole: "",
	};
	const [startDateCalendarIsOpen, setStartDateCalendarIsOpen] =
		useState<boolean>(false);
	const [endDateCalendarIsOpen, setEndDateCalendarIsOpen] =
		useState<boolean>(false);
	const [workExperience, setWorkExperience] = useState<IExperience>(
		experience || initialState,
	);
	const [loading, setLoading] = useState<boolean>(false);
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
				allExperiences &&
				allExperiences.some(
					(work) =>
						work.company.name.toLowerCase() ===
							workExperience.company.name.toLowerCase() &&
						work.startDate === workExperience.startDate &&
						work.endDate === workExperience.endDate,
				);
			if (!isDuplicate)
				updateWorkExperiences &&
					updateWorkExperiences(
						allExperiences.concat({
							id: slugify(
								`${
									workExperience.company.name +
									workExperience.position +
									workExperience.startDate
								}`,
							),
							...workExperience,
						}),
					);
			setWorkExperience(initialState);
		}
	};
	const handleExperienceUpdate = (updatedExp: IExperience) => {
		const updatedExperiences = [...allExperiences];
		const indexOfExperienceToUpdate = updatedExperiences.findIndex(
			(experience) =>
				experience.company.name === updatedExp.company.name &&
				experience.startDate === updatedExp.startDate &&
				experience.endDate === updatedExp.endDate,
		);
		if (indexOfExperienceToUpdate !== -1) {
			updatedExperiences[indexOfExperienceToUpdate] = {
				...updatedExperiences[indexOfExperienceToUpdate],
				...updatedExp,
			};
			if (updateWorkExperiences) {
				setLoading(true);
				toast.dismiss("success");
				setTimeout(function () {
					setLoading(false);
					updateWorkExperiences(updatedExperiences);
					toast.success(
						"Updated successfully",
						ToastDefaultOptions({ id: "success", theme: "dark" }),
					);
				}, 1000);
			}
		}
	};
	return (
		<>
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
						name="end_date"
						id="end_date"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="End Date"
						value={workExperience.endDate}
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
						name="about_role"
						id="about_role"
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
			{!experience ? (
				<div
					onClick={handleAddWorkHistory}
					className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer">
					<span className="text-2xl">+</span>
					<p className="">Add New Experience</p>
				</div>
			) : (
				<div className="flex justify-end gap-4 items-center w-full">
					<PrimaryButton
						title=""
						icon={<TrashBinOutline color="#fff" />}
						className="px-2 rounded p-1 bg-rose-500"
						onClick={() => {
							onRemove && onRemove(experience.company.name);
						}}
					/>
					<PrimaryButton
						title={loading ? "" : "Update"}
						icon={loading ? <ActivityIndicator /> : null}
						className="px-8 p-1 rounded"
						onClick={() => {
							handleExperienceUpdate(workExperience);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default EditWorkHistoryCard;
