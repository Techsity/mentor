/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ICourse } from "../../../../interfaces";
import CourseSummary from "../../../ui/atom/cards/purchase/CourseSummary";
import PaidPurchaseForm from "../../../ui/atom/forms/purchase-form/PaidPurchaseForm";

const PurchaseCourseTemplate = (course: ICourse) => {
	return (
		<>
			<PaidPurchaseForm resource={course} reason="course" />
			<CourseSummary {...course} />
		</>
	);
};

export default PurchaseCourseTemplate;
