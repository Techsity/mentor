import React, { useMemo, useState } from "react";
import CustomTextInput from "../../../inputs/CustomTextInput";
import Calendar from "react-calendar";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { TrashBinOutline } from "react-ionicons";
import { PrimaryButton } from "../../../buttons";
import { toast } from "react-toastify";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { slugify } from "../../../../../../utils";

type ExtractedEducationType = IMentorOnboardingState["education"][0];

const EditEducationCard = ({
	allEducationData,
	reEdit = false,
	exisitingEducation,
	onUpdate,
}: {
	allEducationData: ExtractedEducationType[];
	reEdit?: boolean;
	onUpdate?: (updated: ExtractedEducationType[]) => void;
	exisitingEducation?: ExtractedEducationType;
}) => {
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
	const [loading, setLoading] = useState<boolean>(false);
	const [education, setEducation] = useState<ExtractedEducationType>(
		exisitingEducation || initalState,
	);

	const isDuplicate = useMemo(() => {
		return allEducationData.some(
			(edu) =>
				slugify(edu.school.name) === slugify(education.school.name) &&
				edu.startDate === education.startDate &&
				edu.endDate === education.endDate,
		);
	}, [education, allEducationData]);

	const handleUpdate = () => {
		setLoading(true);
		/** //! To-do:  
		 * Avoid too many clicks
		// const controller = new AbortController();
		// controller.signal
		 */
		const updatedEducation = [...allEducationData];
		// This adds a new education
		if (!exisitingEducation && !isDuplicate)
			if (
				education.school.name &&
				education.startDate &&
				education.endDate
			) {
				updatedEducation.push(education);
				console.log({ updatedEducation, allEducationData });
				setTimeout(function () {
					onUpdate && onUpdate(updatedEducation);
					setLoading(false);
					setEducation(initalState);
				}, 1000);
			}
		// this updates the existing education
		const updateEducationIndex = updatedEducation.findIndex(
			(ed) =>
				ed.course === exisitingEducation?.course &&
				ed.degree === exisitingEducation?.degree &&
				ed.school === exisitingEducation?.school &&
				ed.startDate === exisitingEducation?.startDate &&
				ed.endDate === exisitingEducation?.endDate,
		);
		if (updateEducationIndex !== -1)
			updatedEducation[updateEducationIndex] = {
				...updatedEducation[updateEducationIndex],
				...education,
			};
		setTimeout(function () {
			onUpdate && onUpdate(updatedEducation);
			exisitingEducation && toast.success("Field updated successfully");
			setLoading(false);
		}, 1000);
	};

	const handleRemoveEducation = () => {
		if (exisitingEducation) {
			const updated = allEducationData.filter(
				(edu) =>
					slugify(edu.school.name) !==
						slugify(education.school.name) &&
					edu.startDate !== education.startDate &&
					edu.endDate !== education.endDate,
			);
			if (onUpdate) {
				onUpdate(updated);
			}
		}
	};

	return (
		<>
			<div className="relative text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3">
				{reEdit && exisitingEducation && (
					<span className="absolute top-2 right-3 cursor-pointer z-10">
						<svg
							onClick={handleRemoveEducation}
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
					{exisitingEducation && (
						<label htmlFor="" className="text-xs">
							Name of School
						</label>
					)}
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
					{exisitingEducation && (
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
					{exisitingEducation && (
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
					{exisitingEducation && (
						<label htmlFor="" className="text-xs">
							Degree
						</label>
					)}
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
					{exisitingEducation && (
						<label htmlFor="" className="text-xs">
							Course
						</label>
					)}
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
			{!reEdit && !exisitingEducation ? (
				loading ? (
					<div className="flex mt-2 justify-end items-end">
						<ActivityIndicator />
					</div>
				) : (
					<div
						onClick={handleUpdate}
						className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer">
						<span className="text-2xl">+</span>
						<p className="">Add Education</p>
					</div>
				)
			) : (
				reEdit && (
					<div className="flex justify-end gap-4 items-center w-full">
						<PrimaryButton
							title={"Update"}
							icon={loading ? <ActivityIndicator /> : null}
							disabled={loading}
							className="px-8 p-1 rounded"
							onClick={handleUpdate}
						/>
					</div>
				)
			)}
		</>
	);
};

export default EditEducationCard;
