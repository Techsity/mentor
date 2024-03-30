/* eslint-disable @next/next/no-img-element */
import React, { useId } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../../interfaces/mentor.interface";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../../redux/reducers/authSlice";
import { PrimaryButton } from "../../../buttons";
import SessionIndicator from "./SessionIndicator";
import { useMutation } from "@apollo/client";
import { ACCEPT_MENTORSHIP_REQUEST } from "../../../../../../services/graphql/mutations/mentors";
import { useDispatch } from "react-redux";
import { formatGqlError } from "../../../../../../utils/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../constants";

const MentorshipDisplayCard = (session: IAppointment) => {
	const toastId = useId();
	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	const [acceptRequest, { loading: acceptLoading }] = useMutation<
		{ acceptAppointment: Partial<IAppointment> },
		{ acceptAppointmentId: string }
	>(ACCEPT_MENTORSHIP_REQUEST);
	const declineLoading = false;
	// const [declineRequest, { loading: declineLoading }] = useMutation(ACCEPT_MENTORSHIP_REQUEST);

	const handleAcceptRequest = async () => {
		if (user?.is_mentor) {
			try {
				const { data } = await acceptRequest({ variables: { acceptAppointmentId: session.id } });
				console.log({ data: data?.acceptAppointment });
				// Todo: find and update the status and date of the appointment in the mentor's redux state
			} catch (error) {
				console.error({ error: JSON.stringify(error) });
				const errMsg = formatGqlError(error);
				toast.error(errMsg || "Something went wrong", { ...ToastDefaultOptions(), toastId });
			}
		}
	};

	const handleCancelRequest = async () => {
		console.log("request cancelled");
		//
	};

	const handleDeclineRequest = async () => {
		try {
			if (user?.is_mentor) {
				if (session.status == AppointmentStatus.PENDING) {
					console.log("request declined");
					// Continue
				} else await handleCancelRequest();
			}
		} catch (error) {
			console.error({ error: JSON.stringify(error) });
		}
	};

	return (
		<div className="overflow-hidden rounded">
			<div
				className={classNames(
					"relative flex flex-col border border-[#70C5A1] border-t-transparent bg-white gap-3 h-[150px] cursor-default select-none duration-300",
					session.status !== AppointmentStatus.DECLINED && "border-b-transparent",
					session.status == AppointmentStatus.DECLINED && "grayscale",
				)}>
				<SessionIndicator {...{ session }} />
				<div className="flex items-center gap-3 p-2">
					<div className="">
						<img
							src={
								(session.user && session.user.avatar) ||
								(session.mentor && session.mentor.user.avatar) ||
								"/assets/images/avatar.png"
							}
							alt={(session.user && session.user.name) || (session.mentor && session.mentor.user.name)}
							className="text-sm rounded-full h-14 w-14 select-none"
						/>
					</div>
					<div className="">
						<h1 className="font-medium text-black">
							{(session.user && session.user.name) || (session.mentor && session.mentor.user.name)}
						</h1>
						<p className="text-xs text-[#B1B1B1]">{(session.mentor && session.mentor.role) || "Mentee"}</p>
					</div>
				</div>
			</div>

			{/* CTA Buttons For User */}
			{!user?.is_mentor && session.status !== AppointmentStatus.DECLINED && (
				<div className="flex justify-between items-center">
					<PrimaryButton
						title="cancel"
						onClick={handleCancelRequest}
						disabled={acceptLoading || declineLoading}
						className="w-full p-2 capitalize flex items-center justify-center text-sm text-white bg-[#E96850]"
					/>
				</div>
			)}
			{/* CTA Buttons For Mentor */}
			{user?.is_mentor && session.status !== AppointmentStatus.DECLINED && (
				<div className="flex justify-between items-center">
					<PrimaryButton
						title={session.status === AppointmentStatus.PENDING ? "decline" : "cancel"}
						onClick={handleDeclineRequest}
						disabled={acceptLoading || declineLoading}
						className="w-full p-2 capitalize flex items-center justify-center text-sm text-white bg-[#E96850]"
					/>
					{session.status !== AppointmentStatus.ACCEPTED && (
						<PrimaryButton
							title="accept"
							onClick={handleAcceptRequest}
							disabled={declineLoading || acceptLoading}
							className="w-full p-2 capitalize flex items-center justify-center text-sm"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default MentorshipDisplayCard;
