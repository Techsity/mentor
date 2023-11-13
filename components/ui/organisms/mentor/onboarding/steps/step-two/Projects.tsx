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
	IMentorOnboardingState,
} from "../../../../../../../interfaces/mentor.interface";
import { Add, CalendarClearOutline } from "react-ionicons";
import { isValidUrl, slugify } from "../../../../../../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";

type ExtractedProjectType = IMentorOnboardingState["projects"][0];

const Projects = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initalState: ExtractedProjectType = {
		link: "",
		name: "",
		nature: "",
	};

	const [project, setProject] = useState<ExtractedProjectType>(initalState);

	const handleAddProject = () => {
		if (project.name && project.link && project.nature) {
			const isDuplicate =
				onboardingMentor.projects &&
				onboardingMentor.projects.some(
					(project) =>
						project.name.toLowerCase() ===
							project.name.toLowerCase() &&
						project.link === project.link &&
						project.nature === project.nature,
				);
			if (!isDuplicate) {
				// !check if project link is a valid url
				if (!isValidUrl(project.link)) {
					toast.error(
						"Invalid project URL",
						ToastDefaultOptions({
							id: "error",
							theme: "dark",
						}),
					);
					return;
				}
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						projects: onboardingMentor.projects?.concat(project),
					}),
				);
				setProject(initalState);
			}
		}
	};

	const handleRemoveProject = (slug: string) => {
		if (onboardingMentor.projects) {
			const updatedProjects = onboardingMentor.projects.filter(
				(project) => slugify(project.name) !== slug,
			);
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					projects: updatedProjects,
				}),
			);
		}
	};
	const handleChange =
		(field: keyof ExtractedProjectType) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const {
				target: { value },
			} = e;
			setProject({
				...project,
				[field]: value,
			});
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
						const id = slugify(project.name);
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
										value={project.name}
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
										value={project.nature}
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
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3">
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="title_of_project"
						id="title_of_project"
						type="text"
						value={project.name}
						className="text-black"
						onChange={handleChange("name")}
						containerProps={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
				<div className="col-span-2 grid gap-1 relative">
					<CustomTextInput
						name="link_to_project"
						id="link_to_project"
						type="url"
						className="text-black select-none"
						value={project.link}
						placeholder="Link To Project"
						containerProps={{
							className: "border border-zinc-200",
						}}
						onChange={handleChange("link")}
					/>
				</div>
				<div className="col-span-2 grid gap-1 relative">
					<CustomTextInput
						name="project_nature"
						id="project_nature"
						type="text"
						value={project.nature}
						className="text-black select-none"
						placeholder="Nature of Project"
						containerProps={{
							className: "border border-zinc-200",
						}}
						onChange={handleChange("nature")}
					/>
				</div>
			</div>
			<div
				className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer"
				onClick={() => handleAddProject()}>
				<span className="text-2xl">+</span>
				<p className="">Add New Project</p>
			</div>
		</div>
	);
};

export default Projects;
