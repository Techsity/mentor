/* eslint-disable @next/next/no-img-element */
import React, { useId } from "react";
import { AppointmentStatus, IAppointment } from "../../../../../../interfaces/mentor.interface";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { currentUser, updateMentorProfile } from "../../../../../../redux/reducers/auth/authSlice";
import { PrimaryButton } from "../../../buttons";
import SessionIndicator from "./SessionIndicator";
import { useMutation } from "@apollo/client";
import { ACCEPT_MENTORSHIP_REQUEST } from "../../../../../../services/graphql/mutations/mentors";
import { useDispatch } from "react-redux";
import { formatGqlError } from "../../../../../../utils/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../../constants";
import Avatar from "../../../common/user/Avatar";
import { useRouter } from "next/router";
import { fetchUserProfile } from "../../../../../../redux/reducers/auth/apiAuthSlice";
import { useModal } from "../../../../../../context/modal.context";
import CancelAppointmentModal from "../../../modals/CancelAppointmentModal";

const MentorshipDisplayCard = (session: IAppointment) => {
	const toastId = useId();
	const user = useSelector(currentUser);
	const router = useRouter();
	const dispatch = useDispatch();
	const { openModal } = useModal();

	const [acceptRequest, { loading: acceptLoading }] = useMutation<
		{ acceptAppointment: IAppointment },
		{ acceptAppointmentId: string }
	>(ACCEPT_MENTORSHIP_REQUEST);

	const declineLoading = false;
	// const [declineRequest, { loading: declineLoading }] = useMutation(ACCEPT_MENTORSHIP_REQUEST);

	const updateLocalState = (data: IAppointment) => {
		if (user?.is_mentor && user.mentor !== null && user.mentor) {
			let mentorAppointments = user?.mentor?.appointments || [];
			const index = mentorAppointments.findIndex((appointment) => appointment.id === data.id);
			if (index !== -1) {
				const updatedAppointment = {
					...mentorAppointments[index],
					status: AppointmentStatus.ACCEPTED,
					date: data.date,
				};
				mentorAppointments = [
					...mentorAppointments.slice(0, index),
					updatedAppointment,
					...mentorAppointments.slice(index + 1),
				];
				dispatch(updateMentorProfile({ appointments: mentorAppointments }));
			}
		} else {
			console.log({ data });
		}
	};

	const handleAcceptRequest = async () => {
		if (user?.is_mentor) {
			try {
				const { data } = await acceptRequest({ variables: { acceptAppointmentId: session.id } });
				console.log({ data: data?.acceptAppointment });
				if (data?.acceptAppointment) updateLocalState(data.acceptAppointment);
			} catch (error) {
				console.error({ error: JSON.stringify(error) });
				const errMsg = formatGqlError(error);
				toast.error(errMsg || "Something went wrong", { ...ToastDefaultOptions(), toastId });
			}
		}
	};

	const handleCancelRequest = async () => {
		if (
			session.status !== AppointmentStatus.CANCELLED_BY_USER &&
			session.status !== AppointmentStatus.CANCELLED_BY_MENTOR
		) {
			openModal(<CancelAppointmentModal {...session} />, { animate: false, closeOnBackgroundClick: false });
		} else {
			console.log("Request cannot be processed");
		}
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

	const isValid =
		session.status !== AppointmentStatus.DECLINED &&
		session.status !== AppointmentStatus.CANCELLED_BY_USER &&
		session.status !== AppointmentStatus.CANCELLED_BY_MENTOR;

	const navigateToMentorProfile = () => {
		if (isValid) if (session.mentor && !user?.is_mentor) router.push(`/mentors/${session.mentor.id}/consult`);
	};

	const checkRefundStatus = async () => {
		console.log("checkRefundStatus");
	};

	return (
		<div className="overflow-hidden rounded">
			<div
				className={classNames(
					"relative flex flex-col border border-t-transparent bg-white gap-3 h-[150px] cursor-default select-none duration-300",
					isValid ? "border-[#70C5A1]" : "border-zinc-300",
					isValid && "border-b-transparent",
					session.status == AppointmentStatus.DECLINED && "grayscale",
				)}>
				<SessionIndicator {...{ session }} />
				<div
					className={classNames(
						"flex items-center gap-3 p-2",
						!isValid && "grayscale",
						session.mentor && !user?.is_mentor && isValid && "cursor-pointer",
					)}
					onClick={navigateToMentorProfile}>
					<Avatar
						className="h-14 w-14 select-none"
						user={(session.user && session.user) || (session.mentor && session.mentor.user)}
					/>
					<div className="">
						<h1 className="font-medium text-black">
							{(session.user && session.user.name) || (session.mentor && session.mentor.user.name)}
						</h1>
						<p className="text-xs text-[#B1B1B1]">{(session.mentor && session.mentor.role) || "Mentee"}</p>
					</div>
				</div>
			</div>

			{/* CTA Buttons For User */}
			{!user?.is_mentor && isValid && (
				<div className="flex justify-between items-center">
					<PrimaryButton
						title="cancel"
						onClick={handleCancelRequest}
						disabled={acceptLoading || declineLoading}
						className="w-full p-2 capitalize flex items-center justify-center text-sm text-white bg-[#E96850]"
					/>
				</div>
			)}
			{!user?.is_mentor &&
				(session.status === AppointmentStatus.CANCELLED_BY_USER ||
					session.status === AppointmentStatus.CANCELLED_BY_MENTOR) && (
					<div className="flex justify-between items-center">
						<PrimaryButton
							title="check refund status"
							onClick={checkRefundStatus}
							disabled={acceptLoading || declineLoading}
							className="w-full p-2 capitalize flex items-center justify-center text-sm"
						/>
					</div>
				)}
			{/* CTA Buttons For Mentor */}
			{user?.is_mentor && isValid && (
				<div className="flex justify-between items-center">
					<PrimaryButton
						title={
							session.status === AppointmentStatus.PENDING ||
							session.status === AppointmentStatus.RESCHEDULED_BY_USER
								? "decline"
								: "cancel"
						}
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
