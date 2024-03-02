import React, { useMemo } from "react";
import EditCourseContent from "../../../../components/ui/organisms/course/edit-course/EditCourseContent";
import { useRouter } from "next/router";
import ProfileLayout from "../../../../components/ui/layout/ProfileLayout";
import { PrimaryButton } from "../../../../components/ui/atom/buttons";
import protectedPageWrapper from "../../../protectedPageWrapper";

const ContentEditPageContainer = () => {
	const router = useRouter();
	const { tab } = router.query;

	const isCourse = useMemo(() => {
		return Boolean(tab === "courses");
	}, [router]);

	const isWorkshop = useMemo(() => {
		return Boolean(tab === "workshop");
	}, [router]);

	const isNewItemPage = useMemo(() => {
		return (
			Boolean(tab === "courses" && router.asPath.split("/")[router.asPath.split("/").length - 2] === "new") ||
			Boolean(tab === "workshop" && router.asPath.split("/")[router.asPath.split("/").length - 2] === "new")
		);
	}, [router]);

	const navigateBack = () => {
		if (window && window.history.length > 1) router.back();
		else router.push("/profile/courses/new");
	};

	return (
		<ProfileLayout>
			<div className="flex justify-between items-center mb-3 animate__animated animate__fadeIn sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
				<h1 className="capitalize">Add {isCourse ? "course" : isWorkshop && "workshop"} contents</h1>
				{isNewItemPage && (
					<div className="flex items-center gap-3 lg:pr-8">
						<PrimaryButton
							onClick={navigateBack}
							title="Back"
							className="bg-[#FFB100] text-[#000] p-2 px-4"
						/>
						{/* <PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" /> */}
					</div>
				)}
			</div>
			{isNewItemPage ? <EditCourseContent /> : <>Loading...</>}
		</ProfileLayout>
	);
};

export default protectedPageWrapper(ContentEditPageContainer);
