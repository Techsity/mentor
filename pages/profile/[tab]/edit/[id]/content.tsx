import React, { useMemo } from "react";
import EditCourseContent from "../../../../../components/ui/organisms/course/edit-course/EditCourseContent";
import router, { useRouter } from "next/router";
import ProfileLayout from "../../../../../components/ui/layout/profile/ProfileLayout";
import { PrimaryButton } from "../../../../../components/ui/atom/buttons";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";

const ContentEditPageContainer = () => {
	const router = useRouter();
	const { tab, id } = router.query;

	const user = useSelector(currentUser);
	const isMentor = user?.mentor;

	const isCourseContentPage = useMemo(() => {
		return Boolean(
			tab === "courses" &&
				typeof id !== "undefined" &&
				router.asPath.split("/")[router.asPath.split("/").length - 1] === "content",
		);
	}, [router]);

	return (
		<ProfileLayout>
			<div className="flex justify-between items-center mb-3 animate__animated animate__fadeIn sticky top-20 bg-white/50 backdrop-blur-md w-full z-20 py-4">
				<h1 className="capitalize">{isCourseContentPage && "Edit course contents"}</h1>
				{isCourseContentPage && (
					<div className="flex items-center gap-3">
						<PrimaryButton title="Save" className="bg-[#FFB100] text-[#000] p-2 px-4" />
						<PrimaryButton title="Delete" className="bg-[#E96850] text-[#fff] p-2 px-4" />
					</div>
				)}
			</div>
			{isCourseContentPage ? <EditCourseContent /> : <>null</>}
		</ProfileLayout>
	);
};

export default ContentEditPageContainer;
