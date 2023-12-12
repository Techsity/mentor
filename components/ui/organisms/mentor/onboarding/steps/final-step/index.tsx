import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import { useDispatch } from "react-redux";
import FinalStepAboutYouEdit from "./FinalStepAboutYouEdit";
import FinalStepSkillEdit from "./FinalStepSkillEdit";
import FinalStepExperienceEdit from "./FinalStepExperienceEdit";
import FinalStepProjectsEdit from "./FinalStepProjectsEdit";
import FinalStepEducationEdit from "./FinalStepEducationEdit";
import FinalStepCertificateEdit from "./FinalStepCertificateEdit";
import FinalStepAvailabilityEdit from "./FinalStepAvailabilityEdit";
import FinalStepLanguageEdit from "./FinalStepLanguageEdit";
import {
	IMentorAvailability,
	IMentorCertificate,
	IMentorEducation,
	IMentorExpLevel,
	IMentorExperience,
	IMentorProjectType,
	IMentorSkills,
} from "../../../../../../../interfaces/mentor.interface";
import { MENTOR_ROLES } from "../../../../../../../constants/mentor";
import { PrimaryButton } from "../../../../../atom/buttons";
import ActivityIndicator from "../../../../../atom/loader/ActivityIndicator";
import { useMutation } from "@apollo/client";
import { ONBOARD_MENTOR } from "../../../../../../../services/graphql/mutations/mentors";

const FinalMentorOnboardingStep = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const [loading, setLoading] = useState<boolean>(false);

	const [createMentorProfile] = useMutation<any, OnboardingMentorMutationVariables>(ONBOARD_MENTOR);

	const handleSubmit = () => {
		setLoading(true);
		createMentorProfile({
			variables: {
				createMentorInput: {
					about: onboardingMentor.bio,
					availability: onboardingMentor.availability,
				},
			},
		});
	};
	return (
		<>
			<div className="animate__animated animate__fadeInLeft">
				<h1 className="text-[#00D569] text-xl sm:text-3xl -mt-5" style={{ fontFamily: "Days One" }}>
					Weldone, You are all set!
				</h1>
				<p className="text-sm text-black mb-5">
					Just so you know, here are the informations you provided. You can edit them if there are any errors.
				</p>
				<div className="grid gap-6">
					<FinalStepAboutYouEdit />
					<FinalStepSkillEdit />
					<FinalStepExperienceEdit />
					<FinalStepProjectsEdit />
					<FinalStepEducationEdit />
					<FinalStepCertificateEdit />
					<FinalStepAvailabilityEdit />
					<FinalStepLanguageEdit />
				</div>
			</div>
			<div className="my-6 flex justify-between items-center w-full">
				<div className="flex justify-start items-center">
					<PrimaryButton
						title={loading ? "" : "Looking good, let's go!"}
						icon={loading ? <ActivityIndicator /> : null}
						onClick={handleSubmit}
						className="px-8 p-2 flex justify-center"
						disabled={loading}
					/>
				</div>
			</div>
		</>
	);
};

//
export const FinalStepEditButton = ({
	step,
	title,
	editAction,
}: {
	title: string;
	step?: number;
	editAction?: any;
}) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);

	return (
		<div className="flex justify-between text-sm items-center font-[300]">
			<p className="text-[#A3A6A7] capitalize">{title}</p>
			<p
				className="text-[#70C5A1] select-none cursor-pointer"
				onClick={() => {
					if (step)
						dispatch(
							setOnboardingMentor({
								...onboardingMentor,
								currentStep: step,
							}),
						);
					if (editAction) editAction();
				}}>
				Edit
			</p>
		</div>
	);
};

//
type OnboardingMentorMutationVariables = {
	createMentorInput: {
		about: string;
		availability: IMentorAvailability[];
		certifications: IMentorCertificate[];
		education_bg: IMentorEducation[];
		exp_level: IMentorExpLevel;
		hourly_rate: number;
		language: string[];
		projects: IMentorProjectType[];
		role: MENTOR_ROLES;
		work_experience: IMentorExperience[];
		skills: IMentorSkills[];
	};
};

export default FinalMentorOnboardingStep;
