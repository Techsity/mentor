import React, { useLayoutEffect, useState } from "react";
import workshops from "../../../../../../data/workshops";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import WorkshopDisplayCard from "../../../../atom/cards/mentee/WorkshopDisplayCard";
import { IWorkshop } from "../../../../../../interfaces";
import { scrollUp } from "../../../../../../utils";

const WorkshopSection = () => {
	const { isLargeScreen, isExtraLargeScreen } = useWindowSize();
	const [categories, setCategories] = useState<string[]>([]);
	const [activeCategory, setActiveCategory] = useState<string>("");
	useLayoutEffect(() => {
		const uniqueCategories = Array.from(
			new Set(workshops.map((workshop) => workshop.category)),
		);
		setCategories(uniqueCategories);
		setActiveCategory(uniqueCategories[0]);
	}, [workshops]);

	return (
		<>
			<div className="sticky h-20 top-40 z-10 bg-[#FDFDFD] flex justify-center">
				<div className="flex my-5 gap-6">
					{categories.map((category, index) => (
						<div
							key={index}
							onClick={() => {
								setActiveCategory(category);
								scrollUp();
							}}
							className={`cursor-pointer duration-300 p-1 animate__animated animate__fadeInUp before:absolute before:h-[2px] before:bottom-0 before:duration-300 before:left-0 before:bg-[#078661] relative text-[#094B10] ${
								activeCategory === category
									? "before:w-full"
									: ""
							}`}>
							{category}
						</div>
					))}
				</div>
			</div>
			<div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 tracking-tight gap-6 overflow-hidden md:mx-10 mx-5 bg-[#FDFDFD] md:border border-[#D0D0D0] md:p-10 h-auto">
				{workshops
					.filter((workshop) => workshop.category === activeCategory)
					.map((workshop: IWorkshop, indx: number) => {
						return (
							<WorkshopDisplayCard
								workshop={workshop}
								key={indx}
							/>
						);
					})
					.slice(0, isExtraLargeScreen ? 4 : isLargeScreen ? 3 : 4)}
			</div>
		</>
	);
};

export default WorkshopSection;
