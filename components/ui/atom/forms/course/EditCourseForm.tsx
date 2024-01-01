/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { ICourse, IWorkshop, ICourseCategory } from "../../../../../interfaces";
import { PrimaryButton } from "../../buttons";
import { ExtendedCourseWorkshopType } from "../../../../templates/course/edit";
import { useDispatch, useSelector } from "react-redux";
import { newCourse, setNewCourse } from "../../../../../redux/reducers/coursesSlice";
import * as API from "../../../../../services/api";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../../services/graphql/mutations/courses";
import { courseLevels, courseTypes } from "../../../../../data/courses";

type OmittedCourseType = Omit<ICourse, "mentor">;
type OmittedWorkshopType = Omit<IWorkshop, "mentor">;

type StateType = OmittedWorkshopType | OmittedCourseType;

type Props = {
	handleSave: (updatedValues: StateType) => void;
	state: StateType;
	isCourse?: boolean;
	isWorkshop?: boolean;
};

const EditCourseForm: FC<Props> = ({ handleSave, state, isCourse, isWorkshop }) => {
	const dispatch = useDispatch();
	const newCourseData = useSelector(newCourse);

	const [formState, setFormState] = useState<StateType>(state || newCourseData);

	const [hasPrice, setHasPrice] = useState<boolean>(formState.price && formState.price !== 0 ? true : false);

	const handleChange =
		(field: keyof ExtendedCourseWorkshopType) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setFormState((prev) => {
				return { ...prev, [field]: e.target.value };
			});
		};

	const { data, loading, error } = useQuery<{ getAllCategories: ICourseCategory[] }, any>(GET_ALL_CATEGORIES);

	const categories = useMemo(() => {
		if (!loading) {
			if (error) {
				console.error({ error: error });
				return [];
			} else if (data && data.getAllCategories) {
				return data.getAllCategories;
			}
			return [];
		}
	}, [data, loading]);

	useEffect(() => {
		dispatch(setNewCourse({ ...newCourseData, ...(formState as OmittedCourseType) }));
	}, [formState]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSave(formState);
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
						value={isCourse && newCourseData ? newCourseData?.title : formState.title}
						onChange={(e) => {
							handleChange("title")(e);
						}}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative border border-[#bebebe]">
					<label htmlFor="level" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Level
					</label>
					<select
						onChange={(e) => {
							handleChange("course_level")(e);
						}}
						className="placeholder:text-[#A3A6A7] text-sm outline-none w-full bg-transparent p-4 h-full mt-3">
						{courseLevels.map((val, index) => {
							return (
								<option key={val} value={val} className="capitalize">
									{val.split("_").join(" ")}
								</option>
							);
						})}
					</select>
				</div>
				<div className="sm:col-span-2 col-span-4 relative border border-[#bebebe]">
					<label
						htmlFor={isCourse ? "course-type" : isWorkshop ? "workshop-type" : ""}
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Type of {isCourse ? "Course" : isWorkshop && "Workshop"}
					</label>
					<select className="placeholder:text-[#A3A6A7] text-sm outline-none w-full bg-transparent p-4 h-full mt-3">
						{courseTypes.map((val, index) => {
							return (
								<option key={val.name} value={val.name.toLowerCase()}>
									{val.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="sm:col-span-2 col-span-4 relative border border-[#bebebe]">
					<label
						htmlFor={isCourse ? "course-type" : isWorkshop ? "workshop-type" : ""}
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Category
					</label>
					<select
						onChange={(e) => {
							handleChange("category")(e);
						}}
						className="placeholder:text-[#A3A6A7] text-sm outline-none w-full bg-transparent p-4 h-full mt-3">
						<option></option>
						{categories
							? categories.length > 0 &&
							  categories.map((val, index) => {
									return (
										<option value={val.title} key={val.title}>
											{val.title}
										</option>
									);
							  })
							: "Loading..."}
					</select>
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
						value={formState.description || ""}
						onChange={handleChange("description")}
					/>
				</div>
			</>
			{/* Course Details Input - end */}

			{/* What to learn and requirements section - start */}
			<div className="flex justify-between w-full items-start gap-2 col-span-4">
				<div className="grid gap-4">
					<h1 className="text-sm font-normal my-2">What would be learnt</h1>
					<div className="">
						{formState.what_to_learn.length > 0 ? (
							formState.what_to_learn.map((value, index) => {
								return (
									<div
										key={index}
										className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
										<p className="text-sm text-[#B1B1B1]">{index + 1}.</p>
										<CustomTextInput
											id={
												isCourse
													? "course-what_to_learn"
													: isWorkshop
													? "workshop-what_to_learn"
													: ""
											}
											containerProps={{
												className: "text-sm",
											}}
											value={value}
											onChange={(e) => {
												setFormState((prev) => {
													const updated = [...formState.what_to_learn];
													updated[index] = e.target.value;
													return { ...prev, what_to_learn: updated };
												});
											}}
										/>
									</div>
								);
							})
						) : (
							<div className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
								<p className="text-sm text-[#B1B1B1]">{1}.</p>
								<CustomTextInput
									id={isCourse ? "course-what_to_learn" : isWorkshop ? "workshop-what_to_learn" : ""}
									containerProps={{
										className: "text-sm",
									}}
									value={formState.what_to_learn[0]}
									onChange={(e) => {
										setFormState((prev) => {
											return { ...prev, what_to_learn: [e.target.value] };
										});
									}}
								/>
							</div>
						)}
					</div>
					{formState.what_to_learn.length < 6 ? (
						<span
							className="text-[#70C5A1] text-sm cursor-pointer"
							onClick={() => {
								setFormState((prev) => {
									return { ...prev, what_to_learn: [...prev.what_to_learn, " "] };
								});
							}}>
							+ Add
						</span>
					) : null}
				</div>
				<div className="grid gap-4">
					<h1 className="text-sm font-normal my-2">Requirements</h1>
					<div className="">
						{formState.requirements.length > 0 ? (
							formState.requirements.map((value, index) => {
								return (
									<div
										key={index}
										className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
										<p className="text-sm text-[#B1B1B1]">{index + 1}.</p>
										<CustomTextInput
											id={
												isCourse
													? "course-requirements"
													: isWorkshop
													? "workshop-requirements"
													: ""
											}
											containerProps={{
												className: "text-sm",
											}}
											value={value}
											onChange={(e) => {
												setFormState((prev) => {
													const updated = [...formState.requirements];
													updated[index] = e.target.value;
													return { ...prev, requirements: updated };
												});
											}}
										/>
									</div>
								);
							})
						) : (
							<div className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
								<p className="text-sm text-[#B1B1B1]">{1}.</p>
								<CustomTextInput
									id={isCourse ? "course-requirements" : isWorkshop ? "workshop-requirements" : ""}
									containerProps={{
										className: "text-sm",
									}}
									value={formState.requirements[0]}
									onChange={(e) => {
										setFormState((prev) => {
											return { ...prev, requirements: [e.target.value] };
										});
									}}
								/>
							</div>
						)}
					</div>
					{formState.requirements.length < 6 ? (
						<span
							className="text-[#70C5A1] text-sm cursor-pointer"
							onClick={() => {
								setFormState((prev) => {
									return { ...prev, requirements: [...prev.requirements, " "] };
								});
							}}>
							+ Add
						</span>
					) : null}
				</div>
			</div>
			{/* What to learn and requirements section - end */}
			{/* Set Price and thumbnail - start */}
			<div className="sm:col-span-2 col-span-4">
				<div className="flex justify-between">
					<h1 className="text-sm">Set price for {isCourse ? "course" : isWorkshop && "workshop"}</h1>
					<div
						onClick={() => {
							if (formState.price && hasPrice) {
								if (
									confirm(
										`Are you sure you want to turn off price for this ${
											isCourse ? "course" : isWorkshop && "workshop"
										}?`,
									)
								) {
									setHasPrice(!hasPrice);
								}
							} else {
								setHasPrice(!hasPrice);
							}
						}}
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
						value={formState.price !== 0 ? formState.price.toLocaleString() : ""}
						onChange={handleChange("price")}
					/>
				) : null}
			</div>
			<div className="sm:col-span-2 col-span-4">
				<h1 className="text-sm">{isCourse ? "Course" : isWorkshop && "Workshop"} Thumbnail</h1>
				<div className="mt-3 h-32 sm:h-20 w-full object-cover relative flex justify-center items-center">
					<img
						src={formState.imgUrl || "/assets/images/mockups/course_one.png"}
						alt={formState.title}
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
