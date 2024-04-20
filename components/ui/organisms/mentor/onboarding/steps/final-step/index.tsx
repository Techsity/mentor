import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	initialMentorOnboardingState,
	onboardingMentorState,
	setOnboardingMentor,
} from "../../../../../../../redux/reducers/onboardingSlice";
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
import {
	currentUser,
	isLoggedIn,
	updateMentorProfile,
	updateUserProfile,
} from "../../../../../../../redux/reducers/auth/authSlice";
import { setCurrentProfile } from "../../../../../../../redux/reducers/userSlice";
import ResponseMessages from "../../../../../../../constants/response-codes";
import { fetchUserProfile } from "../../../../../../../redux/reducers/auth/apiAuthSlice";

const FinalMentorOnboardingStep = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const isAuth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const [createMentorProfile] = useMutation<OnboardingMentorMutationResponse, OnboardingMentorMutationVariables>(
		ONBOARD_MENTOR,
	);

	const handleSubmit = async () => {
		setLoading(true);

		const availability: any[] = [
			...onboardingMentor.availability
				.filter((slot) => slot.isAvailable && slot.timeSlots.length >= 1)
				.map((item) => {
					return { day: item.day, timeSlots: item.timeSlots };
				}),
		];

		try {
			const response = await createMentorProfile({
				variables: {
					createMentorInput: {
						about: onboardingMentor.bio,
						availability,
						certifications: onboardingMentor.certificates,
						education_bg: onboardingMentor.education,
						exp_level: IMentorExpLevel.LEVEL_2, //Todo: remove this and set exp_level properly from the form
						hourly_rate: 0,
						language: onboardingMentor.languages,
						projects: onboardingMentor.projects,
						role: onboardingMentor.role,
						skills: onboardingMentor.skills,
						work_experience: onboardingMentor.workHistory || [],
					},
				},
			});

			if (response.data?.createMentorProfile) {
				dispatch(updateUserProfile({ is_mentor: true }));
				dispatch(updateMentorProfile({ ...response.data?.createMentorProfile }));
				dispatch(setCurrentProfile("mentor"));
				router.replace("/profile").then((done) => {
					if (done) dispatch(setOnboardingMentor(initialMentorOnboardingState));
				});
			}
		} catch (err) {
			console.error(err);
			const errMessage = formatGqlError(err);
			if (errMessage === "Unauthorized") {
				const next = router.basePath.concat(router.asPath);
				router.replace(`/auth?login&next=${encodeURIComponent(next)}`);
				toast.error("Unauthenticated", ToastDefaultOptions({ id: "error" }));
			}
			if (
				errMessage.includes(
					`duplicate key value violates unique constraint "REL_b81a5e23718af21c0d316a9a64"`,
				) ||
				errMessage.includes(ResponseMessages.MENTOR_PROFILE_ALREADY_EXISTS)
			) {
				// Account already created
				// toast.info("Redirecting...", ToastDefaultOptions({ id: "error" }));
				dispatch(fetchUserProfile() as any);
				router.replace("/profile");
			} else toast.error("Something went wrong", ToastDefaultOptions({ id: "error" }));
		} finally {
			setLoading(false);
		}
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
					if (step) dispatch(setOnboardingMentor({ ...onboardingMentor, currentStep: step }));
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
