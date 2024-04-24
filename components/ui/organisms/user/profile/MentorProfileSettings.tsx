import React, { ChangeEvent, useId, useMemo, useRef, useState } from "react";
import { FinalStepEditButton } from "../../mentor/onboarding/steps/final-step";
import CustomTextArea from "../../../atom/inputs/CustomTextArea";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { IMentor } from "../../../../../interfaces/mentor.interface";
import classNames from "classnames";

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
			<h1 className="mt-6 mb-3">Mentor Profile Settings</h1>
			<div className="grid gap-2 relative">
				<div className="">
					<p className="text-zinc-600 capitalize text-sm">About me</p>
					<span className="italic text-muted text-zinc-400 text-sm w-xs">
						Describe your personality, interests, skills, and what you enjoy most about connecting with
						people. A warm, engaging "About Me" section can help attract clients that are a great fit. (Max{" "}
						{ABOUT_CHARS_LIMIT} characters).
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
							"h-auto min-h-[150px] w-full bg-slate-50 text-sm",
							aboutLimitReached && "border-red-500",
						),
					}}
					onChange={({ target: { value } }) => handleChange("about", value)}
				/>
				{aboutLimitReached && <span className="text-red-500 italic text-sm">Characters Limit reached</span>}
			</div>
			<div className="mt-4">
				<h1 className="">df</h1>
			</div>
			<div className="mt-4">
				<h1 className="text-sm">Languages Spoken</h1>
			</div>
		</>
	);
};

export default MentorProfileSettings;
