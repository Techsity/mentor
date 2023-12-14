/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { ICourse, IWorkshop } from "../../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import { PrimaryButton } from "../../buttons";

type StateType = Omit<ICourse, "mentor"> | Omit<IWorkshop, "mentor">;

type Props = {
	handleSave: (updatedValues: Omit<ICourse, "mentor"> | Omit<IWorkshop, "mentor">) => void;
	state: StateType;
	isCourse?: boolean;
	isWorkshop?: boolean;
};

const EditCourseForm: FC<Props> = ({ handleSave, state, isCourse, isWorkshop }) => {
	const [hasPrice, setHasPrice] = useState<boolean>(state.price && state.price !== 0 ? true : false);

	const defaultRequirements = Array.from({ length: 6 - state.requirements.length }).map(
		(_, index) => `Default Requirement ${index + 1}`,
	);

	const combinedRequiementsArray = state.requirements.concat(defaultRequirements);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSave(state);
			}}
			className="grid-cols-4 grid items-start gap-3">
			{/* Course Details Input - start */}
			<>
				<div className="sm:col-span-2 col-span-4 relative">
					<label htmlFor="title" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Name
					</label>
					<CustomTextInput
						id="title"
						containerProps={{
							className: "border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={state.title}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative">
					<label htmlFor="level" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Level
					</label>
					<CustomTextInput
						id="level"
						containerProps={{
							className: "border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={"All Level"}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative">
					<label
						htmlFor={isCourse ? "course-type" : isWorkshop ? "workshop-type" : ""}
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Type of {isCourse ? "Course" : isWorkshop && "Workshop"}
					</label>
					<CustomTextInput
						id={isCourse ? "course-type" : isWorkshop ? "workshop-type" : ""}
						containerProps={{
							className: "border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={"Technical"}
						//Todo: implement a dropdown to select course or workshop type
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative">
					<label htmlFor="category" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Category
					</label>
					<CustomTextInput
						containerProps={{
							className: "border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={
							(isCourse ? (state.category?.title as string) : isWorkshop && (state.category as string)) ||
							"Design"
						}
					/>
				</div>
				<div className="col-span-4 relative">
					<label htmlFor="about-course" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						About {isCourse ? "Course" : isWorkshop && "Workshop"}
					</label>
					<CustomTextInput
						id={isCourse ? "about-course" : isWorkshop ? "about-workshop" : ""}
						containerProps={{
							className: "border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={state.description || ""}
					/>
				</div>
			</>
			{/* Course Details Input - end */}
			{/* What to learn and requirements section - start */}
			<>
				<div className="sm:col-span-2 col-span-4">
					<h1 className="text-sm font-normal my-2">What would be learnt</h1>
					{Array.from({ length: 6 }).map((_, index) => {
						return (
							<div
								key={index}
								className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
								<p className="text-sm text-[#B1B1B1]">{index + 1}.</p>
								<CustomTextInput
									id="about-course"
									containerProps={{
										className: "text-sm",
									}}
									placeholder={"what to learn"}
								/>
							</div>
						);
					})}
				</div>
				<div className="sm:col-span-2 col-span-4">
					<h1 className="text-sm font-normal my-2">Requirements</h1>
					{combinedRequiementsArray.map((value, index) => {
						return (
							<div
								key={index}
								className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
								<p className="text-sm text-[#B1B1B1]">{index + 1}.</p>
								<CustomTextInput
									id={isCourse ? "course-requirements" : isWorkshop ? "workshop-requirements" : ""}
									containerProps={{
										className: "text-sm",
									}}
									placeholder={value}
								/>
							</div>
						);
					})}
				</div>
			</>
			{/* What to learn and requirements section - end */}
			{/* Set Price and thumbnail - start */}
			<div className="sm:col-span-2 col-span-4">
				<div className="flex justify-between">
					<h1 className="text-sm">Set price for {isCourse ? "course" : isWorkshop && "workshop"}</h1>
					<div
						onClick={() => setHasPrice(!hasPrice)}
						className="bg-[#F3F3F3] p-1 rounded-full px-4 relative cursor-pointer">
						<div className="bg-transparent rounded-full p-2" />
						<div
							className={`rounded-full p-2 animate__animated animate__faster absolute top-1 duration-300 ${
								hasPrice
									? "right-2 bg-[#70C5A1] animate__slideInLeft"
									: "left-2 bg-zinc-400 animate__slideInRight"
							}`}
						/>
					</div>
				</div>
				{hasPrice ? (
					<CustomTextInput
						id={isCourse ? "course-price" : isWorkshop ? "workshop-price" : ""}
						containerProps={{
							className:
								"mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm animate__animated animate__fadeIn",
						}}
						placeholder={state.price !== 0 ? state.price.toLocaleString() : "Set original price"}
					/>
				) : null}
			</div>
			<div className="sm:col-span-2 col-span-4">
				<h1 className="text-sm">{isCourse ? "Course" : isWorkshop && "Workshop"} Thumbnail</h1>
				<div className="mt-3 h-32 sm:h-20 w-full object-cover relative flex justify-center items-center">
					<img
						src={state.imgUrl || "/assets/images/mockups/course_one.png"}
						alt={state.title}
						className="h-full w-full"
						loading="eager"
					/>
					<PrimaryButton title="Edit" className="px-5 bg-zinc-100/40 text-white absolute" />
				</div>
			</div>
		</form>
	);
};

export default EditCourseForm;
