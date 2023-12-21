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
	IMentor,
	IMentorAvailability,
	IMentorCertificate,
	IMentorEducation,
	IMentorExpLevel,
	IMentorExperience,
	IMentorProjectType,
	IMentorSkills,
} from "../../../../../../../interfaces/mentor.interface";
import { PrimaryButton } from "../../../../../atom/buttons";
import ActivityIndicator from "../../../../../atom/loader/ActivityIndicator";
import { useMutation } from "@apollo/client";
import { ONBOARD_MENTOR } from "../../../../../../../services/graphql/mutations/mentors";
import { formatGqlError } from "../../../../../../../utils/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../../constants";
import { switchProfile } from "../../../../../../../redux/reducers/features/authSlice";

const FinalMentorOnboardingStep = () => {
	const onboardingMentor = useSelector(onboardingMentorState);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const [createMentorProfile] = useMutation<OnboardingMentorMutationResponse, OnboardingMentorMutationVariables>(
		ONBOARD_MENTOR,
	);

	const handleSubmit = () => {
		setLoading(true);

		createMentorProfile({
			variables: {
				createMentorInput: {
					about: onboardingMentor.bio,
					availability: onboardingMentor.availability,
					certifications: onboardingMentor.certificates,
					education_bg: onboardingMentor.education,
					exp_level: IMentorExpLevel.LEVEL_2, //Todo: remove this and set exp_level properly from the form
					hourly_rate: 10,
					language: onboardingMentor.languages,
					projects: onboardingMentor.projects,
					role: onboardingMentor.role,
					skills: onboardingMentor.skills,
					work_experience: onboardingMentor.workHistory || [],
				},
			},
		})
			.then((response) => {
				console.log(response.data?.createMentorProfile);
				if (response.data?.createMentorProfile) {
					// setLoading(false);
					// dispatch(switchProfile({ profile: response.data?.createMentorProfile }));
					router.replace("/profile");
				}
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
				const errMessage = formatGqlError(err);
				if (errMessage === "Unauthorized") {
					const next = router.basePath.concat(router.asPath);
					router.replace(`/auth?login&next=${encodeURIComponent(next)}`);
					toast.error("Please Login", ToastDefaultOptions({ id: "error" }));
				}
				if (
					errMessage.includes(
						`duplicate key value violates unique constraint "REL_b81a5e23718af21c0d316a9a64"`,
					)
				) {
					toast.info("Account already created", ToastDefaultOptions({ id: "error" }));
					// router.replace("/profile");
				}
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
		role: string;
		work_experience: IMentorExperience[];
		skills: IMentorSkills[];
	};
};
type OnboardingMentorMutationResponse = {
	createMentorProfile: IMentor;
};
export default FinalMentorOnboardingStep;
