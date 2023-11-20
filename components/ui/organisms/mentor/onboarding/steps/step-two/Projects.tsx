import React, { ChangeEvent, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import {
	IExperience,
	IMentor,
	IMentorOnboardingState,
	IMentorProjectType,
} from "../../../../../../../interfaces/mentor.interface";
import { Add, CalendarClearOutline } from "react-ionicons";
import { isValidUrl, slugify } from "../../../../../../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";
import EditProjectCard from "../../../../../atom/cards/mentor/onboarding/EditProjectCard";

const Projects = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	const handleRemoveProject = (slug: string) => {
		if (onboardingMentor.projects) {
			const updatedProjects = onboardingMentor.projects.filter(
				(project) => slugify(project.title) !== slug,
			);
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					projects: updatedProjects,
				}),
			);
		}
	};

	return (
		<div className="">
			<h1 className="text-sm text-[#B1B1B1] mb-3">
				Any Project(s) you worked on?
			</h1>
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.projects &&
					onboardingMentor.projects?.length >= 1 &&
					onboardingMentor.projects.map((project, index) => {
						const id = slugify(project.title);
						return (
							<div
								key={id}
								className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative animate__animated animate__fadeInUp animate__fastest">
								<div className="col-span-4 grid gap-1">
									<label htmlFor="" className="text-xs">
										Name of Project
									</label>
									<CustomTextInput
										name="title_of_project"
										id="title_of_project"
										type="text"
										className="text-black"
										readOnly
										value={project.title}
										containerProps={{
											className: "border border-zinc-200",
										}}
									/>
								</div>
								<div className="col-span-2 grid gap-1 relative">
									<label htmlFor="" className="text-xs">
										Project Link
									</label>
									<CustomTextInput
										name="link_to_project"
										id="link_to_project"
										type="url"
										className="text-black select-none"
										placeholder="Link To Project"
										value={project.link}
										containerProps={{
											className: "border border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<div className="col-span-2 grid gap-1 relative">
									<label htmlFor="" className="text-xs">
										Nature of Project
									</label>
									<CustomTextInput
										name="project_nature"
										id="project_nature"
										type="text"
										className="text-black select-none"
										placeholder="Nature of Project"
										value={project.type}
										containerProps={{
											className: "border border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<span
									onClick={() => {
										handleRemoveProject(id);
									}}
									className="col-span-8 text-center bottom-2 w-full hover:bg-rose-800 duration-500 rounded text-white p-1 bg-rose-600 px-4 right-3 cursor-pointer">
									Remove
								</span>
							</div>
						);
					})}
			</div>
			<EditProjectCard
				projectsArr={onboardingMentor.projects}
				onAdd={(updated) => {
					dispatch(
						setOnboardingMentor({
							...onboardingMentor,
							projects: updated,
						}),
					);
				}}
			/>
		</div>
	);
};

export default Projects;
