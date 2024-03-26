import React from "react";
import { IAppointment } from "../../../../../interfaces/mentor.interface";

const ExistingAppointment = (existingAppointment: IAppointment) => {
	const date = existingAppointment.date;
	const day = "";
	const startTime = "";
	const endTime = "";
	return (
		<div className="flex sm:flex-row flex-col items-center justify-between gap-2 animate__animated animate__fadeIn text-[#094B10] ">
			<div
				className="text-sm border border-[#70C5A1] p-3 w-full capitalize text-center"
				style={{ fontFamily: "Days One" }}>
				{day}
			</div>
			<div className="text-sm border border-[#70C5A1] p-3 w-full text-center" style={{ fontFamily: "Days One" }}>
				{startTime} - {endTime}
			</div>
		</div>
	);
};

export default ExistingAppointment;
