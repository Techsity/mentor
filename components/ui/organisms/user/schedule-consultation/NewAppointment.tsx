import { useMutation } from "@apollo/client";
import classNames from "classnames";
import React, { useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { daysOfTheWeek, supportedCurrencies, ToastDefaultOptions } from "../../../../../constants";
import { IAppointment, IMentor, TimeSlot } from "../../../../../interfaces/mentor.interface";
import { updateUserProfile, currentUser } from "../../../../../redux/reducers/auth/authSlice";
import { BOOK_MENTOR } from "../../../../../services/graphql/mutations/user";
import { formatGqlError } from "../../../../../utils/auth";
import { PrimaryButton } from "../../../atom/buttons";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { ISOCurrency } from "../../../../../interfaces";
import { INITIALIZE_PAYMENT } from "../../../../../services/graphql/mutations/payment";
import { SubscriptionType } from "../../../../../services/enums";
import { processExchangeRate } from "../../../../../services/api";
import { useRouter } from "next/router";
import { fetchUserProfile } from "../../../../../redux/reducers/auth/apiAuthSlice";

const NewAppointment = (mentor: IMentor) => {
	const router = useRouter();
	const toastId = useId();
	const [selectedSlot, setSelectedSlot] = useState<Partial<SelectedSlot>>({});
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [selectedCurrency, setSelectedCurrency] = useState<(typeof supportedCurrencies)[0]>(supportedCurrencies[0]);
	const [amount, setAmount] = useState<number>(mentor.hourly_rate);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();

	const [initializePayment, { loading: initializePaymentLoading }] = useMutation<
		{ initiatePayment: any },
		{ amount: number; resourceType: string; resourceId: string; currency: ISOCurrency }
	>(INITIALIZE_PAYMENT);

	const [createAppointment, { loading: appointmentLoading }] = useMutation<
		{ createAppointment: IAppointment },
		{ createAppointmentInput: CreateAppointmentInput; mentor: string }
	>(BOOK_MENTOR);

	const currentDate = new Date();
	const selectedDayIndex = daysOfTheWeek.findIndex((day) => day.toLowerCase() === selectedDay.toLowerCase());

	const handleCurrencyExchange = async (currency: (typeof supportedCurrencies)[0]) => {
		if (currency.name !== selectedCurrency.name && !initializePaymentLoading && !appointmentLoading) {
			try {
				setLoading(true);
				const rate = await processExchangeRate(currency.name);
				if (rate) {
					setSelectedCurrency(currency);
					setAmount(mentor.hourly_rate * rate);
				}
			} catch (error) {
				console.error("error while processing exchange: ", { error: JSON.stringify(error) });
				toast.error("Something went wrong. Please try again", { ...ToastDefaultOptions(), toastId });
			} finally {
				setLoading(false);
			}
		}
	};

	const processPayment = async (resourceId: string) => {
		try {
			const { data } = await initializePayment({
				variables: {
					amount,
					resourceId,
					resourceType: SubscriptionType.MENTORSHIP_APPOINTMENT,
					currency: selectedCurrency.name,
				},
			});
			if (data?.initiatePayment.authorization_url) {
				const authorizationUrl = data?.initiatePayment?.authorization_url;
				router.replace(authorizationUrl).then((done) => {
					if (done) dispatch(fetchUserProfile() as any);
				});
			}
		} catch (error) {
			console.error({ error });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong. Please try again.", {
				...ToastDefaultOptions(),
				toastId,
			});
		}
	};

	const date = useMemo(() => {
		const currentDayOfTheWeek = currentDate.getDay();
		const isAM = selectedSlot?.time?.startTime.slice(-2).toUpperCase() === "AM";
		let hour = parseInt(String(selectedSlot?.time?.startTime.split(":")[0]));
		hour = isAM ? hour : hour === 12 ? 12 : hour + 12;
		const minutes = parseInt(String(selectedSlot?.time?.startTime.split(":")[1]));
		const currentHour = currentDate.getHours();

		const daysToAdd =
			currentDayOfTheWeek === selectedDayIndex && currentHour >= hour
				? 7
				: currentDayOfTheWeek >= selectedDayIndex
				? selectedDayIndex - currentDayOfTheWeek + 7
				: currentDayOfTheWeek === selectedDayIndex && currentHour < hour
				? 0
				: selectedDayIndex - currentDayOfTheWeek;

		const scheduledDate = new Date(currentDate);
		scheduledDate.setDate(scheduledDate.getDate() + daysToAdd);
		scheduledDate.setHours(hour, minutes, 0);
		return scheduledDate;
	}, [selectedSlot, selectedDay]);

	const handleSubmit = async () => {
		if (selectedDayIndex === -1) {
			console.error("Invalid selected day");
			return;
		}
		const time = date.getTime().toString();

		try {
			await createAppointment({
				variables: { createAppointmentInput: { date, time }, mentor: String(mentor?.id) },
			})
				.then(async (data) => {
					if (data.data) await processPayment(data.data.createAppointment.id);
				})
				.catch((err) => {
					throw err;
				});
		} catch (error) {
			console.error({ error: JSON.stringify(error) });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong. Please try again", { toastId, ...ToastDefaultOptions() });
		}
	};

	return (
		<>
			<>
				{!selectedSlot.date && !selectedSlot.time && (
					<span className="text-sm text-[#9A9898]">
						Select a suitable {!selectedSlot.date ? "day" : "time"} to schedule a virtual meeting with this
						mentor;
					</span>
				)}
				{selectedSlot.date && selectedSlot.time && (
					<div className="flex sm:flex-row flex-col items-center justify-between gap-2 animate__animated animate__fadeIn text-[#094B10] ">
						<div
							className="text-sm border border-[#70C5A1] p-3 w-full text-center capitalize"
							style={{ fontFamily: "Days One" }}>
							{date.toDateString()}
						</div>
						<div
							className="text-sm flex items-center justify-center border border-[#70C5A1] p-3 w-full text-center"
							style={{ fontFamily: "Days One" }}>
							{selectedSlot.time.startTime} - {selectedSlot.time.endTime}
						</div>
					</div>
				)}
				{!selectedSlot?.date && (
					<div className="animate__animated animate__fadeIn">
						<div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-3 text-sm">
							{mentor?.availability.map((slot, index) => {
								return (
									<span
										onClick={() => setSelectedDay(slot.day)}
										className={classNames("flex items-center gap-2 cursor-pointer")}
										key={index}>
										<input readOnly type="radio" checked={selectedDay == slot.day} />
										{slot.day}
									</span>
								);
							})}
						</div>
					</div>
				)}
				{/* selectedSlot.date !== "" && */}
				{selectedSlot.date && selectedSlot.date !== "" && !selectedSlot.time && (
					<div className="flex flex-col gap-2 mt-3 animate__animated animate__fadeIn">
						{mentor?.availability
							.find((d) => d.day == selectedSlot.date)
							?.timeSlots.map((slot, i) => {
								const hour = parseInt(slot.startTime.split(":")[0]);
								const endMinutes = parseInt(slot.startTime.split(":")[1]);
								const isAM = slot.startTime.slice(-2).toUpperCase() === "AM";
								const startTime = new Date();

								if (isAM && hour === 12) {
									startTime.setDate(currentDate.getDate() + 1);
									startTime.setHours(0, 0, 0);
								} else startTime.setHours(isAM ? hour : hour + 12, endMinutes, 0);

								// const slotExpired = isToday && currentDate >= startTime;
								const isBooked = !slot.isOpen;

								return (
									<span
										className={classNames(
											isBooked ? "cursor-disabled text-gray-300" : "",
											"flex items-center gap-2 cursor-pointer select-none",
										)}
										key={i}
										onClick={() => {
											if (!isBooked)
												setSelectedSlot((p) => {
													return { ...p, time: slot };
												});
										}}>
										<input
											readOnly
											disabled={isBooked}
											type="radio"
											checked={selectedSlot?.time == slot}
										/>
										{slot.startTime} - {slot.endTime}
										{isBooked && (
											<span className="text-sm italic text-[#F6937B] grayscale-0">
												session booked
											</span>
										)}
									</span>
								);
							})}
					</div>
				)}
			</>

			{selectedSlot?.date && selectedSlot?.time && (
				<div className="flex flex-col w-full mt-2">
					<p className="text-sm my-2">
						You will be redirected to make a payment of{" "}
						<span className="font-medium">
							{selectedCurrency.symbol}
							{Number(amount.toFixed()).toLocaleString()}
						</span>
						/hr for this session;
					</p>
					<div className="grid mb-2 gap-2 sm:w-1/2 h-16">
						<p className="font-medium text-sm">Select Currency</p>
						{loading ? (
							<ActivityIndicator className="border-[#06310B] border-r-transparent" />
						) : (
							<select
								// readOnly
								disabled={initializePaymentLoading || appointmentLoading || loading}
								value={selectedCurrency.name}
								id=""
								className="px-4 p-2">
								{supportedCurrencies.map((currency, i) => {
									return (
										<option
											key={i}
											onClick={() => handleCurrencyExchange(currency)}
											value={currency.name}
											className="">
											{currency.name}
										</option>
									);
								})}
							</select>
						)}
					</div>
				</div>
			)}

			<div className="flex gap-2 items-center justify-between sm:justify-start">
				{selectedSlot.date && (
					<PrimaryButton
						onClick={() => {
							if (selectedSlot.date && selectedSlot.time)
								setSelectedSlot((p) => {
									return { ...p, date: p.date, time: undefined };
								});
							else if (selectedSlot.date && !selectedSlot.time) {
								setSelectedSlot({});
							}
						}}
						title={"Back"}
						className="text-sm mt-4 p-2 px-8 rounded bg-[#FFB100] text-[#06310B]"
					/>
				)}

				{!selectedSlot.date && (
					<PrimaryButton
						disabled={
							!selectedDay || selectedDay == ""
							// ||
							// (selectedDay && !selectedSlot.time ? true : false)
						}
						onClick={() => {
							if (selectedDay && selectedDay !== "") setSelectedSlot({ date: selectedDay });
						}}
						title={"Continue"}
						className="text-sm mt-4 p-2 px-8 rounded"
					/>
				)}

				{selectedSlot && selectedSlot?.date && selectedSlot?.time && (
					<div className="mt-4">
						<PrimaryButton
							onClick={handleSubmit}
							disabled={loading || appointmentLoading || !selectedCurrency || initializePaymentLoading}
							title={appointmentLoading || initializePaymentLoading ? "" : "Continue"}
							icon={appointmentLoading || initializePaymentLoading ? <ActivityIndicator /> : <></>}
							className="text-sm p-2 px-8 animate__animated animate__fadeIn rounded"
						/>
					</div>
				)}
			</div>
			<span className="text-[15px] mt-6">
				Schedules are inconvenient for you?
				<span className="text-[#06310B] cursor-pointer hover:underline font-medium">
					{" "}
					Schedule a private appointment
				</span>
			</span>
		</>
	);
};

export type SelectedSlot = { date: string; time: TimeSlot };

export type CreateAppointmentInput = {
	date: Date;
	time: string;
};

export default NewAppointment;
