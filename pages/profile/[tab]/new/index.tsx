import React, { useEffect, useId, useMemo, useState } from "react";
import protectedPageWrapper from "../../../protectedPageWrapper";
import { useRouter } from "next/router";
import ProfileLayout from "../../../../components/ui/layout/ProfileLayout";
import { ProfileTabLinkType } from "../../../../interfaces";
import WorkshopAndCourseEditTemplate from "../../../../components/templates/course/edit";
import { PrimaryButton } from "../../../../components/ui/atom/buttons";
import { currentUser } from "../../../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { newCourse, setNewCourse } from "../../../../redux/reducers/coursesSlice";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";

const EditPageContainer = () => {
	const router = useRouter();
	const toastId = useId();
	const tab = router.query.tab as ProfileTabLinkType;
	const user = useSelector(currentUser);
	const isMentor = user?.mentor;
	const dispatch = useDispatch();
	const newCourseData = useSelector(newCourse);
	const course_contents = newCourseData?.course_contents;

	const isCourse = useMemo(() => {
		return Boolean(tab === "courses");
	}, [router]);

	const isWorkshop = useMemo(() => {
		return Boolean(tab === "workshop");
	}, [router]);

	const isNewItemPage = useMemo(() => {
		return (
			Boolean(tab === "courses" && router.asPath.split("/")[router.asPath.split("/").length - 1] === "new") ||
			Boolean(tab === "workshop" && router.asPath.split("/")[router.asPath.split("/").length - 1] === "new")
		);
	}, [router]);

	const saveNewCourse = async () => {
		try {
			const files: any[] = [];
			if (course_contents)
				for (const section of course_contents) {
					for (const { file } of section.course_sections) {
						if (file) files.push(file);
					}
				}
			console.log({ files });
		} catch (err) {
			console.error({ err });
			ToastDefaultOptions;
			toast.error("Something went wrong. Try re-uploading the files in your course contents", {
				toastId,
				...ToastDefaultOptions(),
			});
		}
	};

	return (
		<ProfileLayout>
			<div className="flex justify-between items-center mb-3 animate__animated animate__fadeIn sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
				<h1 className="capitalize">{isCourse ? "Add new course" : isWorkshop && "Add new Workshop"}</h1>

				{isMentor && tab === "courses" && isNewItemPage ? (
					<div className="flex items-center gap-3 lg:pr-8">
						<PrimaryButton
							onClick={saveNewCourse}
							title="Save"
							className="bg-[#FFB100] text-[#000] p-2 px-4"
						/>
					</div>
				) : isCourse ? (
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
			<p className="text-yellow-600 text-[13px] my-2">
				Note: Make sure you save your progress before reloading the page to avoid losing data.
			</p>
			{isCourse ? (
				<WorkshopAndCourseEditTemplate
					handleSave={(state) => {
						dispatch(setNewCourse({ ...newCourseData, ...(state as any) }));
					}}
					isCourse
				/>
			) : (
				isWorkshop && (
					<WorkshopAndCourseEditTemplate
						handleSave={(state) => {
							console.log({ workshop: state });
						}}
						isWorkshop
					/>
				)
			)}
		</ProfileLayout>
	);
};

export default protectedPageWrapper(EditPageContainer);
