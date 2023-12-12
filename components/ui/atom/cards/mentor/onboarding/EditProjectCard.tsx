import React, { ChangeEvent, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../constants";
import { IMentorProjectType } from "../../../../../../interfaces/mentor.interface";
import { isValidUrl, slugify } from "../../../../../../utils";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { TrashBinOutline } from "react-ionicons";
import { PrimaryButton } from "../../../buttons";

const EditProjectCard = ({
	existingProject,
	onUpdate,
	projectsArr,
	reEdit = false,
}: {
	existingProject?: IMentorProjectType;
	projectsArr: IMentorProjectType[];
	onUpdate?: (updated: IMentorProjectType[]) => void;
	reEdit?: boolean;
}) => {
	const initialState: IMentorProjectType = {
		// link: "",
		// title: "",
		// type: "",
		company: "",
		description: "",
		job_role: "",
	};
	const [project, setProject] = useState<IMentorProjectType>(existingProject || initialState);

	const isDuplicate = useMemo(() => {
		return projectsArr.some(
			(proj) =>
				proj.company.toLowerCase() === project?.company.toLowerCase() &&
				proj.description === project?.description &&
				proj.job_role === project.job_role,
		);
	}, [projectsArr, project]);

	const handleChange = (field: keyof IMentorProjectType) => (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setProject({
			...project,
			[field]: value,
		});
	};

	const handleProjectUpdate = () => {
		if (project.company && project.description && project.job_role) {
			const updatedProjects = [...projectsArr];
			// if (!isValidUrl(project.link)) {
			// 	// check if project link is a valid url
			// 	toast.error(
			// 		"Invalid project URL",
			// 		ToastDefaultOptions({
			// 			id: "error",
			// 			theme: "dark",
			// 		}),
			// 	);
			// 	return;
			// }
			// Add new project
			if (!existingProject && !isDuplicate) {
				updatedProjects.push(project);
			}
			// Update project if it already exists
			const indexOfProjectToUpdate = updatedProjects.findIndex(
				(project) =>
					project.company === existingProject?.company &&
					project.description === existingProject?.description &&
					project.job_role === existingProject?.job_role,
			);
			if (indexOfProjectToUpdate !== -1) {
				updatedProjects[indexOfProjectToUpdate] = {
					...updatedProjects[indexOfProjectToUpdate],
					...project,
				};
			}
			if (onUpdate) onUpdate(updatedProjects);
			existingProject && toast.success("Field updated successfully");
			setProject(initialState);
		}
	};

	const handleRemoveProject = () => {
		if (projectsArr && existingProject) {
			const updatedProjects = projectsArr.filter(
				(project) =>
					slugify(project.company) !== slugify(existingProject.company) &&
					slugify(project.job_role) !== slugify(existingProject.job_role),
			);
			if (onUpdate) onUpdate(updatedProjects);
		}
	};

	return (
		<div>
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 pt-8 relative">
				{existingProject && (
					<span className="absolute top-2 right-3 cursor-pointer z-10">
						<svg
							onClick={handleRemoveProject}
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
					<label htmlFor="" className="text-xs">
						Name of Project
					</label>
					<CustomTextInput
						name="title_of_project"
						id="title_of_project"
						type="text"
						value={project.company}
						className="text-black"
						onChange={handleChange("company")}
						containerProps={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
				<div className="col-span-2 grid gap-1 relative">
					<label htmlFor="" className="text-xs">
						Project Description
					</label>
					<CustomTextInput
						name="project_description"
						id="project_description"
						// type="url"
						type="text"
						className="text-black select-none"
						value={project.description}
						placeholder="Project Description"
						containerProps={{
							className: "border border-zinc-200",
						}}
						onChange={handleChange("description")}
					/>
				</div>
				<div className="col-span-2 grid gap-1 relative">
					<label htmlFor="" className="text-xs">
						Role
					</label>
					<CustomTextInput
						name="role"
						id="role"
						type="text"
						value={project.job_role}
						className="text-black select-none"
						placeholder="Role"
						containerProps={{
							className: "border border-zinc-200",
						}}
						onChange={handleChange("job_role")}
					/>
				</div>
			</div>
			{!reEdit && !existingProject ? (
				<div
					className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer"
					onClick={handleProjectUpdate}>
					<span className="text-2xl">+</span>
					<p className="">Add New Project</p>
				</div>
			) : (
				reEdit && (
					<div className="flex justify-end gap-4 items-center w-full mt-2">
						<PrimaryButton
							title=""
							icon={<TrashBinOutline color="#fff" />}
							className="px-2 rounded p-1 bg-rose-500"
							onClick={() => {
								// onRemove && onRemove(experience.company.name);
							}}
						/>
						<PrimaryButton
							title={"Update"}
							// icon={loading ? <ActivityIndicator /> : null}
							className="px-8 p-1 rounded"
							onClick={handleProjectUpdate}
						/>
					</div>
				)
			)}
		</div>
	);
};

export default EditProjectCard;
