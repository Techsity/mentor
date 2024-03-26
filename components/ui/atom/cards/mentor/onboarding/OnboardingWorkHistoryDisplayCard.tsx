import React from "react";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { IMentorExperience } from "../../../../../../interfaces/mentor.interface";

const OnboardingWorkHistoryDisplayCard = ({
	experience,
	onRemove,
}: {
	experience: IMentorExperience;
	onRemove?: (exp: IMentorExperience) => void;
}) => {
	return (
		<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative animate__animated animate__fadeInUp animate__fastest">
			<span className="absolute top-2 right-3 cursor-pointer z-10">
				<svg
					onClick={() => {
						onRemove && onRemove(experience);
					}}
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
			<div className="col-span-4 grid gap-1">
				<label htmlFor="" className="text-xs">
					Company
				</label>
				<CustomTextInput
					name="name_of_company"
					id="name_of_company"
					type="text"
					className="text-black"
					readOnly
					value={experience.company}
					containerprops={{
						className: "border border-zinc-200",
					}}
				/>
			</div>
			<div className="col-span-2 grid gap-1 relative">
				<label htmlFor="" className="text-xs">
					Start Date
				</label>
				<CustomTextInput
					type="text"
					className="text-black select-none"
					placeholder="Start Date"
					value={experience.from_year}
					containerprops={{
						className: "border border-zinc-200",
					}}
					readOnly
				/>
			</div>
			<div className="col-span-2 grid gap-1 relative">
				<label htmlFor="" className="text-xs">
					End Date
				</label>
				<CustomTextInput
					type="text"
					className="text-black select-none"
					placeholder="End Date"
					value={experience.to_year}
					containerprops={{
						className: "border border-zinc-200",
					}}
					readOnly
				/>
			</div>
			<div className="col-span-4 grid gap-1">
				<label htmlFor="" className="text-xs">
					Role
				</label>
				<CustomTextInput
					name="roles"
					id="roles"
					type="text"
					placeholder="Your Role"
					readOnly
					value={experience.job_role}
					className="text-black"
					containerprops={{
						className: "border border-zinc-200",
					}}
				/>
			</div>
			<div className="col-span-4 grid gap-1">
				<label htmlFor="" className="text-xs">
					About Role
				</label>
				<CustomTextInput
					name="about_role"
					id="about_role"
					placeholder="About This Role"
					readOnly
					value={experience.description}
					type="text"
					className="text-black"
					containerprops={{
						className: "border border-zinc-200",
					}}
				/>
			</div>
		</div>
	);
};

export default OnboardingWorkHistoryDisplayCard;
