import React from "react";
import Calendar from "react-calendar";

const CalendarModal = ({ onChange, minDate }: { onChange: (val: any, e: any) => void; minDate?: Date }) => {
	return (
		<div className="">
			<Calendar onChange={onChange} maxDate={new Date()} minDate={minDate} />
		</div>
	);
};
export default CalendarModal;
