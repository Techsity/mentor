import React, { useMemo, useState } from "react";
import protectedPageWrapper from "../../../protectedPageWrapper";
import { useRouter } from "next/router";
import ProfileLayout from "../../../../components/ui/layout/profile/ProfileLayout";
import { ProfileTabLinkType } from "../../../../interfaces";
import WorkshopAndCourseEditTemplate from "../../../../components/templates/course/edit";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../../../components/ui/atom/buttons";
import { currentUser } from "../../../../redux/reducers/features/authSlice";

const EditPageContainer = () => {
	const router = useRouter();
	const tab = router.query.tab as ProfileTabLinkType;
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;

	const isCourse = useMemo(() => {
		return Boolean(tab === "courses");
	}, [router]);

	const isWorkshop = useMemo(() => {
		return Boolean(tab === "workshop");
	}, [router]);

	return (
		<ProfileLayout>
			<div className="flex justify-between items-center mb-3 animate__animated animate__fadeIn sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
				<h1 className="capitalize">{isCourse ? "Add new course" : isWorkshop && "Add new Workshop"}</h1>
				{isMentor && tab === "courses" && isCourse ? (
					<div className="flex items-center gap-3">
						<PrimaryButton title="Save" className="bg-[#FFB100] text-[#000] p-2 px-4" />
						<PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" />
					</div>
				) : (
					tab === "courses" && (
						<PrimaryButton title="+ New Course" className="bg-[#FFB100] text-[#000] p-2 px-4" />
					)
				)}
				{tab === "workshop" && isWorkshop && (
					<div className="flex items-center gap-3">
						<PrimaryButton title="Save" className="bg-[#FFB100] text-[#000] p-2 px-4" />
						<PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" />
					</div>
				)}
			</div>
			{isCourse ? (
				<WorkshopAndCourseEditTemplate handleSave={() => {}} isCourse />
			) : (
				isWorkshop && <WorkshopAndCourseEditTemplate handleSave={() => {}} isWorkshop />
			)}
		</ProfileLayout>
	);
};

export default protectedPageWrapper(EditPageContainer);
