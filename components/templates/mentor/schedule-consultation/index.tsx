import React from "react";
import MentorProfileCard from "../../../ui/atom/cards/mentor/MentorProfileCard";
import { AppointmentStatus, IAppointment, IMentor } from "../../../../interfaces/mentor.interface";
import { daysOfTheWeek } from "../../../../constants";
import classNames from "classnames";
import { currentUser } from "../../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import NewAppointment from "../../../ui/organisms/user/schedule-consultation/NewAppointment";
import ExistingAppointment from "../../../ui/organisms/user/schedule-consultation/ExistingAppointment";

const ScheduleConsultationTemplate = ({
	loading,
	mentor,
}: // existingAppointment,
{
	mentor?: IMentor;
	loading?: boolean;
	// existingAppointment?: IAppointment;
}) => {
	const user = useSelector(currentUser);

	const appointment = user?.appointments ? user.appointments.find((a) => a.mentor.id == mentor?.id) : undefined;

	return (
		<div className="py-10 h-full lg:px-20 sm:px-12 px-6">
			<MentorProfileCard mentor={mentor} detailsPage loading={loading} />
			<div className="flex lg:flex-row flex-col justify-between gap-5 py-6 w-full md:mt-5 items-start animate__animated animate__fadeInUp overflow-hidden">
				<div className="bg-[#06310B] p-4 md:p-8 md:px-10 text-white lg:w-[45%] w-full">
					<div className="flex justify-between items-center">
						<h1 className="font-medium">Availability</h1>
						<p className="text-[#CEFFEA] font-[300] text-sm mt-2">Lagos (GMT +1)</p>
					</div>
					<div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
						{daysOfTheWeek.map((d, index) => {
							const mentorIsAvailable = Boolean(
								mentor?.availability.find((date) => date.day.toLowerCase() == d.toLowerCase()),
							);
							return (
								<div
									key={index}
									className={classNames(
										!mentorIsAvailable ? "text-gray-500" : "text-white",
										"flex gap-6 text-sm sm:justify-start justify-between w-full items-center",
									)}>
									<h1 className="font-medium capitalize">{d}</h1>
									<p className="font-[300]">{mentorIsAvailable ? "Available" : "Unavailable"}</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="grid gap-1 flex-grow w-full lg:w-[35%]">
					{appointment ? (
						<ExistingAppointment {...appointment} />
					) : (
						<NewAppointment {...(mentor as IMentor)} />
					)}
					{/* <NewAppointment {...(mentor as IMentor)} /> */}
				</div>
			</div>
		</div>
	);
};

export default ScheduleConsultationTemplate;
