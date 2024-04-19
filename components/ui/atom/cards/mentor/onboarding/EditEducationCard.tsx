import React, { useMemo, useState } from "react";
import CustomTextInput from "../../../inputs/CustomTextInput";
import Calendar from "react-calendar";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { TrashBinOutline } from "react-ionicons";
import { PrimaryButton } from "../../../buttons";
import { toast } from "react-toastify";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { slugify } from "../../../../../../utils";
import { useModal } from "../../../../../../context/modal.context";
import CalendarModal from "../../../modals/CalendarModal";

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
		course_of_study: "",
		credential_type: "",
		from_year: "",
		school: "",
		to_year: "",
	};
	const [endDateCalendarIsOpen, setEndDateCalendarIsOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [education, setEducation] = useState<ExtractedEducationType>(exisitingEducation || initalState);

	const { closeModal, openModal } = useModal();

	const isDuplicate = useMemo(() => {
		return allEducationData.some(
			(edu) =>
				slugify(edu.school) === slugify(education.school) &&
				edu.from_year === education.from_year &&
				edu.to_year === education.to_year,
		);
	}, [education, allEducationData]);

	const handleUpdate = () => {
		setLoading(true);
		const updatedEducation = [...allEducationData];
		// This adds a new education
		if (!exisitingEducation && !isDuplicate)
			if (education.school && education.from_year && education.to_year) {
				updatedEducation.push(education);
				onUpdate && onUpdate(updatedEducation);
				setLoading(false);
				setEducation(initalState);
			}
		// this updates the existing education
		const updateEducationIndex = updatedEducation.findIndex(
			(ed) =>
				ed.course_of_study === exisitingEducation?.course_of_study &&
				ed.credential_type === exisitingEducation?.credential_type &&
				ed.school === exisitingEducation?.school &&
				ed.from_year === exisitingEducation?.from_year &&
				ed.to_year === exisitingEducation?.to_year,
		);
		if (updateEducationIndex !== -1)
			updatedEducation[updateEducationIndex] = {
				...updatedEducation[updateEducationIndex],
				...education,
			};
		onUpdate && onUpdate(updatedEducation);
		exisitingEducation && toast.success("Field updated successfully");
		setLoading(false);
	};

	const handleRemoveEducation = () => {
		if (exisitingEducation) {
			const updated = allEducationData.filter(
				(edu) =>
					slugify(edu.school) !== slugify(education.school) &&
					edu.from_year !== education.from_year &&
					edu.to_year !== education.to_year,
			);
			if (onUpdate) {
				onUpdate(updated);
			}
		}
	};

	const onCalendarUpdate = (name: "from" | "to", val: any) => {
		const date = new Date(val as Date).toLocaleDateString();
		if (name === "from")
			setEducation({
				...education,
				from_year: date,
			});
		else
			setEducation({
				...education,
				to_year: date,
			});
		closeModal();
	};

	const handleOpenCalendarModal = (name: "from" | "to", minDate?: Date) => {
		openModal(<CalendarModal minDate={minDate} onChange={(val) => onCalendarUpdate(name, val)} />, {
			animate: true,
			closeOnBackgroundClick: true,
		});
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
							setEducation({ ...education, school: e.target.value });
						}}
						value={education.school}
						containerprops={{ className: "border border-zinc-200" }}
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
						value={education.from_year}
						containerprops={{ className: "border cursor-pointer border-zinc-200" }}
						readOnly
						onClick={() => handleOpenCalendarModal("from")}
					/>
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
						value={education.to_year}
						containerprops={{ className: "border cursor-pointer border-zinc-200" }}
						readOnly
						onClick={() => handleOpenCalendarModal("to", new Date(education.from_year))}
					/>
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
						containerprops={{ className: "border border-zinc-200" }}
						value={education.credential_type}
						onChange={(e) =>
							setEducation({
								...education,
								credential_type: e.target.value,
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
						value={education.course_of_study}
						onChange={(e) =>
							setEducation({
								...education,
								course_of_study: e.target.value,
							})
						}
						containerprops={{ className: "border border-zinc-200" }}
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
