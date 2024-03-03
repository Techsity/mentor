import React from "react";
import { IWorkshop } from "../../../../../interfaces";
import ListReviews from "../../../atom/common/course/ListReviews";
import Socials from "../../../atom/common/course/Socials";
import AboutWorkshop from "./AboutWorkshop";
import WhatToLearnInWorkshop from "./WhatToLearnInWorkshop";
import WorkshopRequirements from "./WorkshopRequirements";
import WorkshopContents from "./WorkshopContents";

const WorkShopDetailsBody = (workshop: IWorkshop) => {
	return (
		<div className="min-h-[50vh] h-full lg:px-20 sm:px-12 px-4">
			<div className="flex flex-col lg:flex-row justify-between gap-8 py-6 w-full mt-10 items-start">
				<div className="flex-grow w-full xl:min-h-screen overflow-hidden">
					<AboutWorkshop {...workshop} />
					<WhatToLearnInWorkshop {...workshop} />
					<WorkshopRequirements {...workshop} />
					<div className="my-8">
						<ListReviews reviews={workshop.reviews} />
					</div>
					<div className="">
						<div className="flex flex-wrap max-w-xl justify-between items-center mt-5">
							<p className="text-[#F15E63] cursor-pointer hover:underline">! Report Mentor</p>
							<Socials />
						</div>
					</div>
				</div>
				<WorkshopContents preview workshop={workshop} />
			</div>
		</div>
	);
};

export default WorkShopDetailsBody;
