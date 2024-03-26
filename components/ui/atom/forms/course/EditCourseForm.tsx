/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, FC, useMemo, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { ICourse, IWorkshop, ICourseCategory, COURSE_LEVEL } from "../../../../../interfaces";
import { PrimaryButton } from "../../buttons";
import { ExtendedCourseWorkshopType } from "../../../../templates/course/edit";
import { useDispatch, useSelector } from "react-redux";
import { newCourse, setNewCourse } from "../../../../../redux/reducers/coursesSlice";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../../services/graphql/queries/course";
import { courseLevels } from "../../../../../data/courses";
import { Select } from "../../inputs/Select";
import CustomTextArea from "../../inputs/CustomTextArea";

type OmittedCourseType = Omit<ICourse, "mentor">;
type OmittedWorkshopType = Omit<IWorkshop, "mentor">;

type StateType = OmittedCourseType & OmittedWorkshopType;

type Props = {
	handleSave: (updatedValues: StateType) => void;
	state: StateType;
	isCourse?: boolean;
	isWorkshop?: boolean;
};

const EditCourseForm: FC<Props> = ({ handleSave, state, isCourse, isWorkshop }) => {
	const dispatch = useDispatch();
	const newCourseData = useSelector(newCourse);

	const [formState, setFormState] = useState<StateType>((newCourseData as any) || state);
	const [hasPrice, setHasPrice] = useState<boolean>(formState.price && formState.price !== 0 ? true : false);

	const handleChange =
		(field: keyof ExtendedCourseWorkshopType) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
			} else if (data && data.getAllCategories) return data.getAllCategories;
			return [];
		}
	}, [data, loading]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSave(formState);
			}}
			className="grid-cols-4 grid items-start gap-3">
			{/* Course Details Input - start */}
			<>
				<div className="col-span-4 relative">
					<label htmlFor="title" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Name
					</label>
					<CustomTextInput
						id="title"
						containerprops={{
							className: "border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						value={formState.title}
						onChange={(e) => {
							handleChange("title")(e);
							dispatch(setNewCourse({ ...newCourseData, title: e.target.value }));
						}}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative border border-[#bebebe] w-full h-full">
					<div className="flex items-center justify-center p-3">
						<Select<string>
							data={courseLevels.map((item) => item.split("_").join(" "))}
							title={formState?.course_level ? formState?.course_level?.split("_").join(" ") : ""}
							handleSelected={(item: COURSE_LEVEL) => {
								const selected = item.split(" ").join("_").toUpperCase();
								setFormState((prev) => {
									return { ...prev, course_level: selected as COURSE_LEVEL };
								});
								dispatch(setNewCourse({ ...newCourseData, course_level: selected as COURSE_LEVEL }));
							}}
							label="Level"
						/>
					</div>
				</div>
				<div className="sm:col-span-2 col-span-4 relative border border-[#bebebe] w-full h-full">
					<div className="flex items-center justify-center p-3">
						<Select<ICourseCategory>
							data={categories && categories.length > 0 ? categories : []}
							title={formState.category ? formState.category.title : ""}
							handleSelected={(item: ICourseCategory) => {
								setFormState((prev) => {
									return { ...prev, category: item };
								});
								dispatch(setNewCourse({ ...newCourseData, category: item }));
							}}
							displayProperty="title"
							label="Category"
						/>
					</div>
				</div>
				<div className="col-span-4 relative">
					<label htmlFor="about-course" className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						About {isCourse ? "Course" : isWorkshop && "Workshop"}
					</label>
					<CustomTextArea
						id={isCourse ? "about-course" : isWorkshop ? "about-workshop" : ""}
						containerprops={{
							className: "border border-[#bebebe] pt-8 pb-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						value={formState.description}
						onChange={(e) => {
							handleChange("description")(e);
							dispatch(setNewCourse({ ...newCourseData, description: e.target.value }));
						}}
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
											containerprops={{
												className: "text-sm",
											}}
											value={value}
											onChange={(e) => {
												setFormState((prev) => {
													const updated = [...formState.what_to_learn];
													updated[index] = e.target.value;
													return { ...prev, what_to_learn: updated };
												});
												dispatch(
													setNewCourse({
														...newCourseData,
														what_to_learn: formState.what_to_learn,
													}),
												);
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
									containerprops={{
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
											containerprops={{
												className: "text-sm",
											}}
											value={value}
											onChange={(e) => {
												setFormState((prev) => {
													const updated = [...formState.requirements];
													updated[index] = e.target.value;
													return { ...prev, requirements: updated };
												});
												dispatch(
													setNewCourse({
														...newCourseData,
														requirements: formState.requirements,
													}),
												);
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
									containerprops={{
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
								const turnOff = confirm(
									`Are you sure you want to turn off price for this ${
										isCourse ? "course" : isWorkshop && "workshop"
									}?`,
								);
								if (turnOff) setHasPrice(false);
							} else setHasPrice((p) => !p);
						}}
						className="bg-[#F3F3F3] p-1 rounded-full px-4 relative cursor-pointer">
						<div className="bg-transparent rounded-full p-2" />
						<div
							className={`rounded-full p-2 absolute top-1 duration-300 ${
								hasPrice ? "right-2 bg-[#70C5A1]" : "left-2 bg-zinc-400"
							}`}
						/>
					</div>
				</div>
				{hasPrice ? (
					<CustomTextInput
						id={isCourse ? "course-price" : isWorkshop ? "workshop-price" : ""}
						containerprops={{
							className: "mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm relative",
						}}
						className="pl-9"
						type="number"
						value={formState.price !== 0 ? formState.price : ""}
						onChange={(e) => {
							handleChange("price")(e);
							dispatch(
								setNewCourse({
									...newCourseData,
									price: Number(e.target.value),
								}),
							);
						}}
						leftIcon={<p className="font-semibold text-lg -mt-1">$</p>}
					/>
				) : null}
			</div>
			<div className="sm:col-span-2 col-span-4">
				<h1 className="text-sm">{isCourse ? "Course" : isWorkshop && "Workshop"} Thumbnail</h1>
				<div className="mt-3 h-32 sm:h-20 w-full object-cover relative flex justify-center items-center">
					<img
						src={formState.thumbnail || "/assets/images/mockups/course_one.png"}
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
