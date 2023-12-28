import React, { useMemo, useState } from "react";
import protectedPageWrapper from "../../../../protectedPageWrapper";
import { useRouter } from "next/router";
import ProfileLayout from "../../../../../components/ui/layout/profile/ProfileLayout";
import { ProfileTabLinkType } from "../../../../../interfaces";
import WorkshopAndCourseEditTemplate from "../../../../../components/templates/course/edit";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../../../../components/ui/atom/buttons";
import { currentUser } from "../../../../../redux/reducers/authSlice";

const EditPageContainer = () => {
	const router = useRouter();
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;
	const id = router.query.id;
	const tab = router.query.tab as ProfileTabLinkType;

	const isEditCourse = useMemo(() => {
		return Boolean(tab === "courses" && typeof id !== "undefined");
	}, [router]);

	const isEditWorkshop = useMemo(() => {
		return Boolean(tab === "workshop" && typeof id !== "undefined");
	}, [router]);

	const handleCourseSave = (updated: any) => {
		console.log(updated);
	};
	const handleWorkshopSave = (updated: any) => {
		console.log(updated);
	};

	return (
		<ProfileLayout>
			<div className="flex justify-between items-center mb-3 animate__animated animate__fadeIn sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
				<h1 className="capitalize">{isEditCourse ? "Edit course" : isEditWorkshop && "Edit Workshop"}</h1>
				{isMentor && tab === "courses" && isEditCourse ? (
					<div className="flex items-center gap-3">
						<PrimaryButton title="Save" className="bg-[#FFB100] text-[#000] p-2 px-4" />
						<PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" />
					</div>
				) : (
					tab === "courses" && (
						<PrimaryButton title="+ New Course" className="bg-[#FFB100] text-[#000] p-2 px-4" />
					)
				)}
				{tab === "workshop" && isEditWorkshop && (
					<div className="flex items-center gap-3">
						<PrimaryButton title="Save" className="bg-[#FFB100] text-[#000] p-2 px-4" />
						<PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" />
					</div>
				)}
			</div>
			{isEditCourse ? (
				<WorkshopAndCourseEditTemplate handleSave={handleCourseSave} isCourse />
			) : (
				isEditWorkshop && <WorkshopAndCourseEditTemplate handleSave={handleWorkshopSave} isWorkshop />
			)}
		</ProfileLayout>
	);
};

export default protectedPageWrapper(EditPageContainer);
