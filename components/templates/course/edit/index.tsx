/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { StarRatingIcon } from "../../../ui/atom/icons/svgs";
import EditCourseForm from "../../../ui/atom/forms/course/EditCourseForm";
import AddCourseContent from "../../../ui/organisms/course/edit-course/AddCourseContent";
import { ICourse, IWorkshop, ProfileTabLinkType } from "../../../../interfaces";
import { courseTypes } from "../../../../data/courses";
import { PrimaryButton } from "../../../ui/atom/buttons";
import AddWorkShopSchedule from "../../../ui/organisms/workshop/edit-workshop/AddWorkShopSchedule";
import { useRouter } from "next/router";
import StatsDisplay from "../../../ui/organisms/course/edit-course/StatsDisplay";

export interface ExtendedCourseWorkshopType extends Omit<ICourse, "mentor">, Omit<IWorkshop, "mentor"> {}

type Props = {
	isCourse?: boolean;
	isWorkshop?: boolean;
	handleSave: (state: Omit<ICourse, "mentor"> | Omit<IWorkshop, "mentor">) => void;
	state?: ExtendedCourseWorkshopType;
};

const courseInitialState: Omit<ICourse, "mentor"> = {
	title: "",
	description: "",
	course_type: courseTypes[0].name,
	course_images: "",
	course_level: "ALL_LEVELS",
	duration: 0,
	limit: 0,
	rating: 0,
	price: 0,
	available: false,
	imgUrl: "",
	requirements: [],
	course_contents: [],
	category: {
		title: "",
		course_type: {
			description: "",
			type: "",
		},
		description: "",
		created_at: "",
		updated_at: "",
	},
	reviews: [],
	what_to_learn: [],
};
const workshopInitialState: Omit<IWorkshop, "mentor"> = {
	title: "",
	available: false,
	tag: "Upcoming",
	reviews: [],
	description: "",
	participants: 0,
	contents: [],
	duration: 0,
	requirements: [],
	what_to_learn: [],
	price: 0,
	isSubscribed: false,
	scheduled_date: "",
};

const WorkshopAndCourseEditTemplate = ({ isCourse, isWorkshop, handleSave, state }: Props) => {
	const courseState = useMemo(() => {
		return state ? state : courseInitialState;
	}, [state]);

	const workshopState = useMemo(() => {
		return state ? state : workshopInitialState;
	}, [state]);

	const router = useRouter();
	const tab = router.query.tab as ProfileTabLinkType;

	const isNewItemPage = useMemo(() => {
		return (
			Boolean(tab === "courses" && router.asPath.split("/")[router.asPath.split("/").length - 1] === "new") ||
			Boolean(tab === "workshop" && router.asPath.split("/")[router.asPath.split("/").length - 1] === "new")
		);
	}, [router]);

	return (
		<div className="">
			<div className="items-start flex gap-3 flex-col 2xl:flex-row justify-between">
				<div className="2xl:max-w-[60%] w-full">
					<h1 className="my-3 text-[#B1B1B1] font-normal text-sm">
						{isCourse ? "Course Overview" : isWorkshop && "Workshop Overview"}
					</h1>
					<div className="border border-[#70C5A1] p-3">
						{isCourse ? (
							<EditCourseForm isCourse state={{ ...(courseState as any) }} handleSave={handleSave} />
						) : (
							isWorkshop && (
								<EditCourseForm
									isWorkshop
									state={{ ...(workshopState as any) }}
									handleSave={handleSave}
								/>
							)
						)}
					</div>
					{isCourse ? (
						<div className="border border-[#70C5A1] p-5 mt-6">
							<AddCourseContent {...{ state: courseState }} />
						</div>
					) : (
						isWorkshop && <AddWorkShopSchedule {...{ state: workshopState }} />
					)}
				</div>
				<div className="2xl:max-w-[40%] w-full">
					<h1 className="my-3 text-[#B1B1B1] font-normal text-sm">
						How this {isCourse ? "course" : isWorkshop && "workshop"} is doing
					</h1>
					<div
						className={`border border-[#70C5A1] p-3 grid ${
							!isNewItemPage && "items-center"
						} gap-4 min-h-[40dvh] 2xl:min-h-screen`}>
						<StatsDisplay />
						{/* Reviews section - start */}
						{!isNewItemPage && (
							<div className="mt-3">
								<h1 className="text-sm mb-3">Reviews</h1>
								{isCourse
									? courseState.reviews
											.map(({ content, ratings, reviewed_by, type }, id) => {
												return (
													<div key={id} className="border border-[#70C5A1] p-4 my-4">
														<p className="my-4 text-xs">{content}</p>
														<div className="flex justify-between items-center">
															<div className="flex items-center gap-1">
																<img
																	src={
																		reviewed_by.avatar ||
																		"/assets/images/avatar.png"
																	}
																	alt="testimonial"
																	className="h-6 w-6 rounded-full"
																/>
																<p className="text-sm">{reviewed_by.name}</p>
															</div>
															<div className="flex items-center gap-2">
																<StarRatingIcon
																	color="#70C5A1"
																	height={20}
																	width={20}
																/>
																<p className="text-sm">{ratings.toFixed(1)}</p>
															</div>
														</div>
													</div>
												);
											})
											.slice(0, 4)
									: isWorkshop &&
									  workshopState.reviews
											.map(({ content, ratings, reviewed_by, type }, id) => {
												return (
													<div key={id} className="border border-[#70C5A1] p-4 my-4">
														<p className="my-4 text-xs">{content}</p>
														<div className="flex justify-between items-center">
															<div className="flex items-center gap-1">
																<img
																	src={
																		reviewed_by.avatar ||
																		"/assets/images/avatar.png"
																	}
																	alt="testimonial"
																	className="h-6 w-6 rounded-full"
																/>
																<p className="text-sm">{reviewed_by.name}</p>
															</div>
															<div className="flex items-center gap-2">
																<StarRatingIcon
																	color="#70C5A1"
																	height={20}
																	width={20}
																/>
																<p className="text-sm">{ratings.toFixed(1)}</p>
															</div>
														</div>
													</div>
												);
											})
											.slice(0, 4)}
								{isCourse ? (
									courseState.reviews.length > 4 ? (
										<div className="my-4">
											<PrimaryButton title="More Reviews" className="p-1 px-5 text-sm" />
										</div>
									) : null
								) : isWorkshop && workshopState.reviews.length > 4 ? (
									<div className="my-4">
										<PrimaryButton title="More Reviews" className="p-1 px-5 text-sm" />
									</div>
								) : null}
							</div>
						)}
					</div>
					{/* Reviews section - end */}
				</div>
			</div>
		</div>
	);
};

export default WorkshopAndCourseEditTemplate;
