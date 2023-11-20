import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../constants";
import { IMentorProjectType } from "../../../../../../interfaces/mentor.interface";
import {
	onboardingMentor,
	setOnboardingMentor,
} from "../../../../../../redux/reducers/features/onboardingSlice";
import { isValidUrl } from "../../../../../../utils";
import CustomTextInput from "../../../inputs/CustomTextInput";

const EditProjectCard = ({
	exsitingProject,
	onAdd,
	projectsArr,
}: {
	exsitingProject?: IMentorProjectType;
	projectsArr: IMentorProjectType[];
	onAdd?: (updated: IMentorProjectType[]) => void;
}) => {
	const initalState: IMentorProjectType = {
		link: "",
		title: "",
		type: "",
	};
	const [project, setProject] = useState<IMentorProjectType>(
		exsitingProject || initalState,
	);
	const handleChange =
		(field: keyof IMentorProjectType) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			const {
				target: { value },
			} = e;
			setProject({
				...project,
				[field]: value,
			});
		};
	const handleAddProject = () => {
		if (project.title && project.link && project.type) {
			const isDuplicate = projectsArr.some(
				(project) =>
					project.title.toLowerCase() ===
						project.title.toLowerCase() &&
					project.link === project.link &&
					project.type === project.type,
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
				const updatedProjects = projectsArr?.concat(project);
				if (onAdd) {
					onAdd(updatedProjects);
					setProject(initalState);
				}
			}
		}
	};

	return (
		<>
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3">
				<div className="col-span-4 grid gap-1">
					<CustomTextInput
						name="title_of_project"
						id="title_of_project"
						type="text"
						value={project.title}
						className="text-black"
						onChange={handleChange("title")}
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
						value={project.type}
						className="text-black select-none"
						placeholder="Nature of Project"
						containerProps={{
							className: "border border-zinc-200",
						}}
						onChange={handleChange("type")}
					/>
				</div>
			</div>
			<div
				className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer"
				onClick={() => handleAddProject()}>
				<span className="text-2xl">+</span>
				<p className="">Add New Project</p>
			</div>
		</>
	);
};

export default EditProjectCard;
