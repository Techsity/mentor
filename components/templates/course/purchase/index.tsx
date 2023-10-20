/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../interfaces";
import { formatFollowersCount } from "../../../../utils";
import CourseSummary from "../../../ui/atom/cards/purchase/CourseSummary";
import CartSummary from "../../../ui/atom/cards/purchase/CartSummary";
import CoursePurchaseForm from "../../../ui/atom/forms/CoursePurchaseForm";

const PurchaseCourseTemplate = (course: ICourse) => {
	return (
		<>
			<div className="md:flex justify-between item-start w-full h-full">
				<div className="min-w-[50%] pb-10">
					<CoursePurchaseForm />
				</div>
				<div className="flex-grow sticky h-[69dvh] top-20 bg-[#F6F9F8]">
					<CartSummary price={course.price} />
				</div>
			</div>
			<CourseSummary {...course} />
		</>
	);
};

export default PurchaseCourseTemplate;
