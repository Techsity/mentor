import { useMutation } from "@apollo/client";
import classNames from "classnames";
import React, { useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	daysOfTheWeek,
	PAYMENT_MODAL_CONTAINER_CLASS,
	supportedCurrencies,
	ToastDefaultOptions,
} from "../../../../../constants";
import { IAppointment, IMentor, IMentorAvailability, TimeSlot } from "../../../../../interfaces/mentor.interface";
import { updateUserProfile, currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { BOOK_MENTOR } from "../../../../../services/graphql/mutations/user";
import { formatGqlError } from "../../../../../utils/auth";
import { PrimaryButton } from "../../../atom/buttons";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { ISOCurrency } from "../../../../../interfaces";
import { INITIATE_PAYMENT } from "../../../../../services/graphql/mutations/payment";
import { SubscriptionType } from "../../../../../services/enums";
import { processExchangeRate } from "../../../../../services/api";
import { useRouter } from "next/router";
import { fetchUserProfile } from "../../../../../redux/reducers/auth/apiAuthSlice";
import { useModal } from "../../../../../context/modal.context";
import PaymentModal from "../../../atom/modals/payment-modal";
import ResponseMessages from "../../../../../constants/response-codes";
import { CalendarOutline, ChevronDown, TimeOutline } from "react-ionicons";

type AvailabilitySubset = { id?: string; day: string; date: Date; timeSlots: TimeSlot[] };
type SelectedAppointmentSlot = Omit<AvailabilitySubset, "timeSlots"> & { timeSlot: TimeSlot };
const currentDate = new Date();

const sortMentorAvailability = (availability: IMentorAvailability[]) => {
	let availableDates: AvailabilitySubset[] = [];
	if (availability) {
		for (const slot of availability) {
			const { day, timeSlots, id } = slot;
			let date = new Date();
			const dayIndex = daysOfTheWeek.indexOf(day.toLowerCase());
			date.setDate(date.getDate() + ((dayIndex - date.getDay()) % 7));
			// + 7
			if (date.getDay() > currentDate.getDay()) {
				const availableSlot = { id, day, date, timeSlots: timeSlots.filter((slot) => slot.isOpen) };
				availableDates.push(availableSlot);
			}
		}
	}
	return { availableDates };
};

const NewAppointment = ({ mentor, refetch }: { mentor: IMentor; refetch?: () => void }) => {
	const router = useRouter();
	const toastId = useId();
	const [amount, setAmount] = useState<number>(mentor.hourly_rate);
	const { closeModal, openModal } = useModal();

	const { availableDates } = useMemo(
		() => sortMentorAvailability([...(mentor?.availability || [])]),
		[mentor?.availability],
	);

	const [selectedAvailability, setSelectedAvailability] = useState<AvailabilitySubset | null>(availableDates[0]);
	const [selectedAppointmentSlot, setSelectedAppointmentSlot] = useState<SelectedAppointmentSlot | null>(null);

	const dispatch = useDispatch();

	const [createAppointment, { loading: appointmentLoading }] = useMutation<
		{ createAppointment: IAppointment },
		{ createAppointmentInput: CreateAppointmentInput; mentor: string }
	>(BOOK_MENTOR);

	const handleSelect = (input: AvailabilitySubset) => {
		if (input.id !== selectedAvailability?.id) {
			setSelectedAvailability(input);
			// setSelectedAppointmentSlot({ ...input, timeSlot: input.timeSlots[0] });
			setSelectedAppointmentSlot(null);
		}
	};

	const refreshData = () => {
		dispatch(fetchUserProfile() as any);
		if (refetch) refetch();
	};

	// const handleCurrencyExchange = async (currency: (typeof supportedCurrencies)[0]) => {
	// 	if (currency.name !== selectedCurrency.name && !appointmentLoading) {
	// 		try {
	// 			setInitLoading(true);
	// 			const rate = await processExchangeRate(currency.name);
	// 			if (rate) {
	// 				setSelectedCurrency(currency);
	// 				setAmount(mentor.hourly_rate * rate);
	// 			}
	// 		} catch (error) {
	// 			console.error("error while processing exchange: ", { error: JSON.stringify(error) });
	// 			toast.error("Something went wrong. Please try again", { ...ToastDefaultOptions(), toastId });
	// 		} finally {
	// 			setInitLoading(false);
	// 		}
	// 	}
	// };

	// const processPayment = async (resourceId: string) => {
	// 	try {
	// 		// openModal(
	// 		// 	<PaymentModal
	// 		// 		amount={amount}
	// 		// 		next={() => {
	// 		// 			console.log("Done");
	// 		// 			refreshData();
	// 		// 			closeModal();
	// 		// 		}}
	// 		// 		{...{ resourceId }}
	// 		// 		resourceType={SubscriptionType.MENTORSHIP_APPOINTMENT}
	// 		// 		// selectedCurrency={}
	// 		// 	/>,
	// 		// 	{ closeOnBackgroundClick: false, containerClassName: PAYMENT_MODAL_CONTAINER_CLASS },
	// 		// );
	// 	} catch (error) {
	// 		console.error({ error });
	// 		const errMsg = formatGqlError(error);
	// 		toast.error(errMsg || "Something went wrong. Please try again.", {
	// 			...ToastDefaultOptions(),
	// 			toastId,
	// 		});
	// 	}
	// };

	const handleSubmit = async () => {
		const { timeSlot, day, id, date, ...rest } = selectedAppointmentSlot || {};
		const { startTime } = timeSlot || {};
		const meridian = startTime?.slice(-2) as "am" | "pm";
		let [hours, minutes] = (startTime?.split(":") || []) as any;
		hours = parseInt(hours);
		minutes = parseInt(minutes);
		if (meridian === "pm") {
			hours = hours + 12;
			if (hours === 24) hours = 12;
		}
		const appointmentDate = new Date();
		appointmentDate.setDate(date?.getDate() as number);
		appointmentDate?.setHours(parseInt(hours), parseInt(minutes), 0, 0);
		const appointment = { id, day, date: appointmentDate, timeSlot };
		console.log({ appointment });

		try {
			await createAppointment({
				variables: {
					createAppointmentInput: { date: appointment.date, time: `${appointment.timeSlot?.startTime}` },
					mentor: String(mentor?.id),
				},
			})
				.then(({ data }) => {
					console.log({ data: data?.createAppointment });
					if (data?.createAppointment.id) {
						toast.success("Session scheduled successfully", { toastId, ...ToastDefaultOptions() });
					}
				})
				.catch((err) => {
					throw err;
				});
		} catch (error) {
			console.error({ error: JSON.stringify(error) });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong. Please try again", { toastId, ...ToastDefaultOptions() });
		} finally {
			refreshData();
		}
	};

	const btnDisabled = appointmentLoading || selectedAppointmentSlot === null;
	const loading = appointmentLoading;

	return (
		<>
			<h1 className="text-[15px] font-medium">
				Select a convenient date and time for a 1:1 mentorship session with{" "}
				<span className="capitalize">
					{Number(mentor?.user?.name?.split(" ").length) > 1
						? `${mentor?.user.name.split(" ")[0]} ${mentor?.user.name.split(" ")[1]}`
						: mentor?.user.name}
				</span>
			</h1>
			<div className="w-full">
				<div className="w-full mt-4">
					<p className="my-1 text-sm">Available dates</p>
					<div className="flex items-center gap-3 w-full overflow-x-scroll hide-scroll-bar">
						{availableDates.map((slot, index) => {
							let { date, day, timeSlots } = slot;
							const remainingSlots = timeSlots.filter((slot) => slot.isOpen).length;
							const month = date.toDateString().split(" ")[1];
							return (
								<div
									key={index}
									onClick={() => handleSelect(slot)}
									className={classNames(
										"select-none rounded border border-[#70C5A1] inline-flex p-2 justify-between items-start h-20 w-full min-w-36 max-w-36 overflow-hidden cursor-pointer duration-300",
										selectedAvailability?.id === slot.id
											? "bg-[#70C5A1] text-white"
											: "hover:bg-[#70C5A1]/10",
									)}>
									<div className="grid text-sm">
										<span className="capitalize text-[15px]">{day.slice(0, 3)}</span>
										<div className="space-x-1 font-medium text-[16.5px]">
											<span className="">{date.getDate()}</span>
											<span className="">{month}</span>
										</div>
										<span className="opacity-40">
											{remainingSlots} slot
											{remainingSlots == 1 ? "" : "s"}
											{/* available */}
										</span>
									</div>
									<CalendarOutline
										color={selectedAvailability?.id === slot.id ? "#fff" : "#000"}
										width={"18px"}
										height="18px"
									/>
								</div>
							);
						})}
					</div>
					{selectedAvailability && (
						<div className="w-full mt-4">
							<p className="my-1 text-sm">Available Slots</p>
							<div className="flex snap-x duration-300 snap-mandatory items-center gap-3 w-full overflow-x-scroll hide-scroll-bar">
								{selectedAvailability.timeSlots.length >= 1 ? (
									selectedAvailability.timeSlots
										.filter(
											(slot, index, self) =>
												index ===
												self.findIndex(
													(s) => s.startTime === slot.startTime && s.endTime === slot.endTime,
												),
										)
										.map((slot, index) => {
											const { endTime, startTime } = slot;
											const isTime =
												selectedAppointmentSlot?.timeSlot?.endTime === endTime &&
												selectedAppointmentSlot?.timeSlot?.startTime === startTime;
											return (
												<div
													onClick={() =>
														setSelectedAppointmentSlot({
															...selectedAvailability,
															timeSlot: slot,
														})
													}
													key={index}
													className={classNames(
														"select-none rounded border inline-flex justify-center gap-2 items-center p-2 min-w-28 w-full max-w-28 overflow-hidden cursor-pointer duration-300 text-sm",
														isTime
															? "bg-[#FFB100] border-[#FFB100] text-[#06310B]"
															: "hover:bg-[#FFB100]/10 border-[#06310B]",
													)}>
													<TimeOutline
														color={isTime ? "#06310B" : "#000"}
														width={"16px"}
														height="16px"
													/>
													<span>{startTime}</span>
												</div>
											);
										})
								) : (
									<>
										<p className="text-sm">No available slots</p>
									</>
								)}
							</div>
							<PrimaryButton
								// title="Continue"
								onClick={handleSubmit}
								icon={loading ? <ActivityIndicator /> : <></>}
								title={loading ? "" : "Book a free trial"}
								disabled={btnDisabled}
								className="my-5 p-2.5 text-sm rounded px-5 flex justify-center items-center animate__animated animate__fadeIn animate__fast"
							/>
						</div>
					)}
				</div>
			</div>
			<br />
			<p className="max-w-sm text-[15px]">
				Schedules are inconvenient for you?
				<br />
				<span className="text-[#70C5A1] cursor-pointer hover:underline font-medium">
					Schedule a private appointment
				</span>
			</p>
		</>
	);
};

export type SelectedSlot = { date: string; time: TimeSlot };

export type CreateAppointmentInput = {
	date: Date;
	time: string;
};

export default NewAppointment;

// {selectedSlot?.date && selectedSlot?.time && (
// 				<div className="flex flex-col w-full mt-2">
// 					<p className="text-sm my-2">
// 						You will be redirected to make a payment of{" "}
// 						<span className="font-medium">
// 							{selectedCurrency.symbol}
// 							{Number(amount.toFixed()).toLocaleString()}
// 						</span>
// 						/hr for this session;
// 					</p>
// 					<div className="grid mb-2 gap-2 sm:w-1/2 h-16">
// 						<p className="font-medium text-sm">Select Currency</p>
// 						{loading ? (
// 							<ActivityIndicator className="border-[#06310B] border-r-transparent" />
// 						) : (
// 							<div className="flex items-center justify-between w-full relative border border-[#094B10]">
// 								<select
// 									// readOnly
// 									disabled={loading}
// 									onChange={({ target: { value } }) => {
// 										const currency = JSON.parse(value);
// 										handleCurrencyExchange(currency);
// 									}}
// 									className="appearance-none w-full px-4 p-2 outline-none focus:ring-0">
// 									{supportedCurrencies.map((currency, i) => {
// 										return (
// 											<option key={i} value={JSON.stringify(currency)} className="">
// 												{currency.name}
// 											</option>
// 										);
// 									})}
// 								</select>
// 								<ChevronDown cssClasses="absolute right-3 top-3" />
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			)}
