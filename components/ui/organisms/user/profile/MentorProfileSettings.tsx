import React, { useId, useMemo, useState } from "react";
import CustomTextArea from "../../../atom/inputs/CustomTextArea";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import classNames from "classnames";
import { MENTOR_ROLES } from "../../../../../constants/mentor";
import { PrimaryButton } from "../../../atom/buttons";
import TagsInput from "../../../atom/inputs/TagsInput";
import { SkillEdit } from "../../mentor/onboarding/steps/final-step/FinalStepSkillEdit";

type CurrentEditFocus = "about" | "role";

const MentorProfileSettings = () => {
	const toastId = useId();
	let user = useSelector(currentUser);
	const mentor = user?.mentor;
	const [state, setState] = useState<Partial<IMentor>>({ ...mentor });
	const [stateHasChanged, setStateHasChanged] = useState<boolean>(false);

	const handleMentorProfileUpdate = async () => {
		try {
		} catch (error) {
			console.error({ error });
		} finally {
			setStateHasChanged(false);
		}
	};

	const handleChange = (name: keyof typeof state, value: any) => {
		setStateHasChanged(true);
		setState((p) => {
			return { ...p, [name]: value };
		});
	};
	const ABOUT_CHARS_LIMIT = 500;
	const aboutLimitReached = useMemo(
		() => Boolean(stateHasChanged && state.about && state.about?.trim().length >= ABOUT_CHARS_LIMIT),
		[stateHasChanged, state.about],
	);

	return (
		<>
			<h1 className="mt-6 mb-3 font-semibold">Mentor Profile</h1>
			<div className="grid gap-4 relative">
				<div className="">
					<p className="text-zinc-600 capitalize text-sm">About me</p>
					<span className="italic text-muted text-zinc-400 text-sm w-xs">
						Describe your personality, interests, skills, and what you enjoy most about connecting with
						people. (Max {ABOUT_CHARS_LIMIT} characters).
					</span>
				</div>
				<CustomTextArea
					inputMode="text"
					autoCorrect="none"
					autoCapitalize="none"
					autoComplete="none"
					value={state?.about}
					className="resize-none bg-transparent px-4"
					containerprops={{
						className: classNames(
							"h-auto min-h-[150px] w-full bg-slate-50 text-sm py-3",
							aboutLimitReached && state?.about !== mentor?.about && "border-red-500",
						),
					}}
					onChange={({ target: { value } }) => handleChange("about", value)}
				/>
				{aboutLimitReached && state?.about !== mentor?.about && (
					<span className="text-red-500 italic text-sm">Characters Limit reached</span>
				)}
			</div>
			<div className="mt-4 flex gap-3 items-center">
				<p className="text-zinc-600 text-sm">I&apos;m a </p>
				<select
					className="px-3 p-1 rounded capitalize text-sm outline-none bg-transparent border focus:ring-1 ring-[#70C5A1] border-[#70C5A1]"
					onChange={({ target: { value } }) => handleChange("role", value)}>
					{Object.values(MENTOR_ROLES).map((value, index) => {
						return (
							<option key={index} value="" className="capitalize">
								{value.split("_").join(" ").toLowerCase()}
							</option>
						);
					})}
				</select>
			</div>
			<div className="mt-4">
				<SkillEdit
					skillsArr={state?.skills || []}
					onUpdateSkills={(skills) =>
						setState((p) => {
							console.log({ skills });
							return { ...p, skills };
						})
					}
				/>
			</div>
			<div className="mt-4">
				<p className="text-zinc-600 text-sm">Languages Spoken</p>
			</div>
		</>
	);
};

export default MentorProfileSettings;
