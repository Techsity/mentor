import React, { useEffect, useState } from "react";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { ICourseContent } from "../../../../../interfaces";

const EditCourseContent = (props: { content?: ICourseContent[] }) => {
	const { content } = props;
	return (
		<>
			{content && content?.length >= 1 ? (
				content?.map((cont, index) => {
					return (
						<div key={index} className="grid gap-4 max-w-lg">
							<div className="relative">
								<label
									htmlFor="title"
									className="text-sm text-[#bebebe]">
									Content Title
								</label>
								<CustomTextInput
									id="title"
									containerProps={{
										className:
											"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
									}}
									placeholder={"Content Title"}
								/>
							</div>
							<div className="">
								<div className="my-4 flex justify-between items-center">
									<h1 className="text-sm text-[#bebebe]">
										Lectures
									</h1>
									<div className="cursor-pointer">
										+ Add New Lecture
									</div>
								</div>
								<div className="relative border border-[#70C5A1] p-5">
									<CustomTextInput
										id="title"
										containerProps={{
											className:
												"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
										}}
										placeholder={cont.title}
									/>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="grid gap-4 max-w-lg">
					<div className="relative">
						<label
							htmlFor="title"
							className="text-sm text-[#bebebe]">
							Content Title
						</label>
						<CustomTextInput
							id="title"
							containerProps={{
								className:
									"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
							}}
							placeholder={"Content Title"}
						/>
					</div>
					<div className="">
						<div className="my-4 flex justify-between items-center">
							<h1 className="text-sm text-[#bebebe]">Lectures</h1>
							<div className="cursor-pointer">
								+ Add New Lecture
							</div>
						</div>
						<div className="relative border border-[#70C5A1] p-5">
							<CustomTextInput
								id="title"
								containerProps={{
									className:
										"border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm mt-3",
								}}
								placeholder={"Content Title"}
							/>
						</div>{" "}
					</div>
				</div>
			)}
		</>
	);
};

export default EditCourseContent;
