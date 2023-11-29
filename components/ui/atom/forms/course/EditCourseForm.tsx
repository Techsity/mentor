import React, { FC, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { ICourse } from "../../../../../interfaces";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import { RefrencedMentorType } from "../../../../../interfaces/mentor.interface";
import user from "../../../../../data/user";

type Props = {
	handleSave: (updatedValues: Omit<ICourse, "mentor">) => void;
	initialState?: Omit<ICourse, "mentor">;
};
const initial: Omit<ICourse, "mentor"> = {
	available: false,
	content: [],
	description: "",
	duration: parseInt("00"),
	level: "All Level",
	limit: 20,
	price: "free",
	rating: 0,
	requirements: [],
	title: "",
	toLearn: [],
	imgUrl: "",
};
const EditCourseForm: FC<Props> = ({ handleSave, initialState }) => {
	const user = useSelector(currentUser);
	const [state, setState] = useState<Omit<ICourse, "mentor">>(
		initialState || initial,
	);
	const [hasPrice, setHasPrice] = useState<boolean>(false);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSave(state);
			}}
			className="grid-cols-4 grid items-start gap-3">
			{/* Course Details Input - start */}
			<>
				<div className="col-span-2 relative">
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
				<div className="col-span-2 relative">
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
				<div className="col-span-2 relative">
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
				<div className="col-span-2 relative">
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
				<div className="col-span-2">
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
				<div className="col-span-2">
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
			<div className="col-span-2">
				<div className="flex justify-between"></div>
			</div>
			<div className="col-span-2">
				<div className=""></div>
			</div>
		</form>
	);
};

export default EditCourseForm;
