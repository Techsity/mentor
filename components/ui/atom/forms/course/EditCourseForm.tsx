/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { ICourse } from "../../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import { RefrencedMentorType } from "../../../../../interfaces/mentor.interface";
import user from "../../../../../data/user";
import { PrimaryButton } from "../../buttons";

type Props = {
	handleSave: (updatedValues: Omit<ICourse, "mentor">) => void;
	state: Omit<ICourse, "mentor">;
};

const EditCourseForm: FC<Props> = ({ handleSave, state }) => {
	const user = useSelector(currentUser);
	const [hasPrice, setHasPrice] = useState<boolean>(
		state.price && state.price !== "free" ? true : false,
	);
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
					<label
						htmlFor="title"
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Name
					</label>
					<CustomTextInput
						id="title"
						containerProps={{
							className:
								"border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={"Basics of Digital marketing"}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative">
					<label
						htmlFor="level"
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Level
					</label>
					<CustomTextInput
						id="level"
						containerProps={{
							className:
								"border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={"Basics of Digital marketing"}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative">
					<label
						htmlFor="type-of-course"
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Type of Course
					</label>
					<CustomTextInput
						id="type-of-course"
						containerProps={{
							className:
								"border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={"Basics of Digital marketing"}
					/>
				</div>
				<div className="sm:col-span-2 col-span-4 relative">
					<label
						htmlFor="category"
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						Category
					</label>
					<CustomTextInput
						containerProps={{
							className:
								"border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={"Basics of Digital marketing"}
					/>
				</div>
				<div className="col-span-4 relative">
					<label
						htmlFor="about-course"
						className="text-[#70C5A1] font-normal text-xs absolute top-3 left-4">
						About Course
					</label>
					<CustomTextInput
						id="about-course"
						containerProps={{
							className:
								"border border-[#bebebe] pt-3 placeholder:text-[#A3A6A7] text-sm",
						}}
						placeholder={
							"This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3 This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python"
						}
					/>
				</div>
			</>
			{/* Course Details Input - end */}
			{/* What to learn and requirements section - start */}
			<>
				<div className="sm:col-span-2 col-span-4">
					<h1 className="text-sm font-normal my-2">
						What would be learnt
					</h1>
					{Array.from({ length: 6 }).map((_, index) => {
						return (
							<div
								key={index}
								className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
								<p className="text-sm text-[#B1B1B1]">
									{index + 1}.
								</p>
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
					{Array.from({ length: 6 }).map((_, index) => {
						return (
							<div
								key={index}
								className="relative flex gap-1 items-center border-b border-[#bebebe] hover:border-black duration-300">
								<p className="text-sm text-[#B1B1B1]">
									{index + 1}.
								</p>
								<CustomTextInput
									id="about-course"
									containerProps={{
										className: "text-sm",
									}}
									placeholder={"requirement"}
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
					<h1 className="text-sm">Set price for course</h1>
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
						id="about-course"
						containerProps={{
							className:
								"mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm animate__animated animate__fadeIn",
						}}
						placeholder={
							state.price !== "free"
								? state.price.toLocaleString()
								: "Set original price"
						}
					/>
				) : null}
			</div>
			<div className="sm:col-span-2 col-span-4">
				<h1 className="text-sm">Course Thumbnail</h1>
				<div className="mt-3 h-32 sm:h-20 w-full object-cover relative flex justify-center items-center">
					<img
						src={
							state.imgUrl ||
							"/assets/images/mockups/course_one.png"
						}
						alt={state.title}
						className="h-full w-full"
						loading="eager"
					/>
					<PrimaryButton
						title="Edit"
						className="px-5 bg-zinc-100/40 text-white absolute"
					/>
				</div>
			</div>
		</form>
	);
};

export default EditCourseForm;
