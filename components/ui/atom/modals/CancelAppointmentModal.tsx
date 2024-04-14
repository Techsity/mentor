import React, { ChangeEvent, FormEvent, useEffect, useId, useState } from "react";
import { useModal } from "../../../../context/modal.context";
import { useMutation } from "@apollo/client";
import { REPORT_MENTOR } from "../../../../services/graphql/mutations/mentors";
import { formatGqlError } from "../../../../utils/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";
import { slugify } from "../../../../utils";
import { PrimaryButton } from "../buttons";
import CustomTextArea from "../inputs/CustomTextArea";
import classNames from "classnames";
import ActivityIndicator from "../loader/ActivityIndicator";
import { IAppointment } from "../../../../interfaces/mentor.interface";
import { CANCEL_APPOINTMENT } from "../../../../services/graphql/mutations/user";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../../redux/reducers/auth/apiAuthSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/auth/authSlice";

const CancelAppointmentModal = (appointment: IAppointment) => {
	const user = useSelector(currentUser);
	const CONTENT_THRESHOLD = 200;
	const toastId = useId();
	const { closeModal } = useModal();
	const dispatch = useDispatch();

	const [content, setContent] = useState<string>("");
	const [limitReached, setLimitReached] = useState<boolean>(false);
	const [cancelAppointment, { loading }] = useMutation<
		{ cancelAppointment: IAppointment },
		{ appointmentId: string; reason: string }
	>(CANCEL_APPOINTMENT);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setContent(value);
		setLimitReached(value.length >= CONTENT_THRESHOLD + 1);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!limitReached) {
			if (!content || content == "")
				return toast.error("Report content cannot be empty", { ...ToastDefaultOptions(), toastId });
			try {
				await cancelAppointment({
					variables: { appointmentId: appointment.id, reason: content.trim() },
				})
					.then(async () => {
						await dispatch(fetchUserProfile() as any);
						closeModal();
					})
					.catch((e) => {
						throw e;
					});
			} catch (error) {
				console.error({ error });
				const errMsg = formatGqlError(error);
				toast.error(errMsg, { ...ToastDefaultOptions(), toastId });
			}
		}
	};

	useEffect(() => {
		if (!appointment) closeModal();
	}, [appointment]);

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white h-auto w-[95vw] sm:w-[65vw] lg:w-[70vw] md:w-[75vw] rounded p-5 inline-block">
			<h1 className="font-medium">Cancel Appoinment</h1>
			<span className="flex flex-col items-start my-5">
				<span className="text-sm text-gray-400">
					Tell us why you are cancelling this appointment. This helps us to take the correct action.
				</span>
				{!user?.is_mentor && (
					<span className="text-sm text-gray-500 font-medium">
						Note: The refund process may take up-to 5 business days.
					</span>
				)}
			</span>
			<CustomTextArea
				onChange={handleChange}
				placeholder="Please provide more details"
				containerprops={{
					className: `placeholder:text-gray-300 text-sm mb-4 ${limitReached ? "border-red-500" : ""}`,
				}}
			/>
			<div className="flex flex-col lg:flex-row justify-between lg:items-center text-xs">
				<span className={classNames("italic text-gray-600", limitReached && "text-red-500")}>
					Max length: {CONTENT_THRESHOLD} words
				</span>
				<span className={classNames("", limitReached && "text-red-500")}>
					{!limitReached && "Remaining"} {content.length} words
				</span>
			</div>
			<PrimaryButton
				title={!loading ? "Submit" : ""}
				// title="Submit"
				type="submit"
				disabled={loading || limitReached || content.trim().length < 1 || content == "" || !content}
				icon={loading ? <ActivityIndicator /> : <></>}
				className="p-1.5 px-4 rounded mt-3 flex justify-center"
			/>
		</form>
	);
};

export default CancelAppointmentModal;
