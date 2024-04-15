/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useId, useMemo, useState } from "react";
import CountrySelectorComp from "../../inputs/CountrySelector";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, updateUserProfile } from "../../../../../redux/reducers/auth/authSlice";
import { ICourse, ISOCurrency, IWorkshop } from "../../../../../interfaces";
import { PrimaryButton } from "../../buttons";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE_TO_COURSE } from "../../../../../services/graphql/mutations/courses";
import { Subscription } from "../../../../../interfaces/user.interface";
import { useRouter } from "next/router";
import { PAYMENT_MODAL_CONTAINER_CLASS, supportedCurrencies, ToastDefaultOptions } from "../../../../../constants";
import { toast } from "react-toastify";
import ResponseMessages from "../../../../../constants/response-codes";
import { formatGqlError } from "../../../../../utils/auth";
import { InitializePaymentInput, INITIATE_PAYMENT } from "../../../../../services/graphql/mutations/payment";
import { calculateTax, slugify } from "../../../../../utils";
import axios from "axios";
import CartSummary from "../../cards/purchase/CartSummary";
import { processExchangeRate } from "../../../../../services/api";
import { SubscriptionType } from "../../../../../services/enums";
import { useModal } from "../../../../../context/modal.context";
import PaymentModal from "../../modals/payment-modal";
import { SUBSCRIBE_TO_WORKSHOP } from "../../../../../services/graphql/mutations/workshop";
import { ChevronDown } from "react-ionicons";

const PaidPurchaseForm = (props: { reason: "course" | "workshop"; resource: ICourse | IWorkshop }) => {
	const user = useSelector(currentUser);
	const toastId = useId();
	const dispatch = useDispatch();
	const router = useRouter();
	const { reason = "course", resource } = props;
	const [selectedCurrency, setSelectedCurrency] = useState<(typeof supportedCurrencies)[0]>(supportedCurrencies[0]);
	const [price, setPrice] = useState<number>(resource.price);
	const [priceLoading, setPriceLoading] = useState<boolean>(false);
	const { closeModal, openModal } = useModal();
	const [toConfirmPayment, setToConfirmPayment] = useState<boolean>(false);

	const [subscribeToCourse, { loading: courseLoading }] = useMutation<
		{ subscribeToCourse: Subscription },
		{ courseId: string }
	>(SUBSCRIBE_TO_COURSE, { variables: { courseId: String(resource.id) } });

	const [subscribeToWorkshop, { loading: workshopLoading }] = useMutation<
		{ subscribeToWorkshop: Subscription },
		{ workshopId: string }
	>(SUBSCRIBE_TO_WORKSHOP, { variables: { workshopId: String(resource.id) } });

	const loading = priceLoading || courseLoading || workshopLoading;

	const handleCurrencyExchange = async (currency: (typeof supportedCurrencies)[0]) => {
		try {
			setPriceLoading(true);
			const rate = await processExchangeRate(currency.name);
			if (rate) {
				setSelectedCurrency(currency);
				setPrice(resource.price * rate);
			}
		} catch (error) {
			console.error("error while processing exchange: ", { error: JSON.stringify(error) });
			toast.error("Something went wrong. Please try again", { ...ToastDefaultOptions(), toastId });
		} finally {
			setPriceLoading(false);
		}
	};

	// const tax = useMemo(() => (price !== 0 ? calculateTax(price, 0.0825) : 0), [price]);
	const tax = useMemo(() => calculateTax(price, 0.0825), [price]);
	const amount = useMemo(() => price + Number(tax), [price]);

	const handleSubscription = async () => {
		try {
			let data;
			let error;
			if (reason === "course") {
				const { data: res, errors } = await subscribeToCourse();
				data = res?.subscribeToCourse;
				error = errors;
			} else if (reason === "workshop") {
				const { data: res, errors } = await subscribeToWorkshop();
				data = res?.subscribeToWorkshop;
				error = errors;
			}
			if (data?.id) {
				dispatch(updateUserProfile({ ...user, subscriptions: user?.subscriptions.concat(data) }));
				router.replace(`/success/${reason}/${resource.id}`);
			} else {
				setToConfirmPayment(true);
				console.log({ error, data });
				toast.error("Subscription failed", { ...ToastDefaultOptions(), toastId });
			}
		} catch (error) {
			console.error({ error });
			const errMsg = formatGqlError(error);
			if (errMsg === ResponseMessages.ALREADY_SUBSCRIBED) {
				toast.info(errMsg, { ...ToastDefaultOptions(), toastId });
				if (reason === "course") router.replace(`/courses/${resource.id}/learn`);
				else if (reason === "workshop") router.replace("/profile/my-workshop");
			} else {
				setToConfirmPayment(true);
				toast.error(errMsg || "Something went wrong. Please try again.", { ...ToastDefaultOptions(), toastId });
			}
		}
	};

	const processPayment = async () => {
		try {
			openModal(
				<PaymentModal
					amount={amount}
					next={() => {
						handleSubscription();
						closeModal();
					}}
					selectedCurrency={selectedCurrency || supportedCurrencies[0]}
					resourceId={String(resource.id)}
					resourceType={reason.toUpperCase()}
				/>,
				{
					animate: true,
					closeOnBackgroundClick: false,
					containerClassName: PAYMENT_MODAL_CONTAINER_CLASS,
				},
			);
		} catch (error) {
			console.error({ error });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong. Please try again.", {
				...ToastDefaultOptions(),
				toastId,
			});
		}
	};

	const handleSubmit = async () => {
		if (reason === "course") {
			if (price === 0) await handleSubscription();
			else if (price > 0) await processPayment();
		} else if (reason === "workshop") {
			if (price > 0) await processPayment();
		}
	};

	const handleVerifyPayment = async () => {
		//Todo
		console.log("handleVerifyPayment");
	};

	return (
		<>
			<div className="min-w-[50%]">
				<div className="flex flex-col md:flex-row justify-between item-start w-full h-full">
					<div className="flex items-center lg:px-28 sm:px-12 px-6 md:py-20 py-5">
						<div className="">
							<h1
								className="text-[#00D569] font-thin text-xl md:text-2xl capitalize"
								style={{ fontFamily: "Days One" }}>
								{reason === "workshop" ? "Pay to Join" : "Buy this Course"}
							</h1>
							<div className="grid gap-3">
								<h1 className="font-medium mt-3">Billing Address</h1>
								<p className="max-w-md text-sm">
									Mentör is by law required to collect applicable transaction taxes for purchases made
									in certain tax jurisdictions.
								</p>
								<div className="">
									<CountrySelectorComp
										disabled
										selected={String(user?.country)}
										onSelect={() => {}}
										classes={{
											input: "bg-transparent",
											container: "my-3",
										}}
									/>

									{price > 0 && (
										<div className="grid gap-3">
											<div className="grid mb-2 gap-2">
												<p className="font-medium">Select Currency</p>
												<div className="flex items-center justify-between relative w-full border border-[#094B10]">
													<select
														disabled={priceLoading}
														onChange={({ target: { value } }) => {
															const currency = JSON.parse(value);
															handleCurrencyExchange(currency);
														}}
														className="appearance-none w-full px-4 p-2">
														{supportedCurrencies.map((currency, i) => {
															return (
																<option
																	key={i}
																	value={JSON.stringify(currency)}
																	className="">
																	{currency.name}
																</option>
															);
														})}
													</select>
													<ChevronDown cssClasses="absolute right-3 top-3" />
												</div>
											</div>
										</div>
									)}
									<div className="mt-4">
										<PrimaryButton
											onClick={handleSubmit}
											icon={loading ? <ActivityIndicator /> : null}
											title={loading ? "" : "Continue"}
											disabled={loading}
											className={`flex p-4 w-full justify-center`}
										/>
									</div>
									{toConfirmPayment && (
										<div className="mt-4">
											<PrimaryButton
												onClick={handleVerifyPayment}
												icon={loading ? <ActivityIndicator /> : null}
												title={loading ? "" : "Verify Payment"}
												disabled={loading}
												className={`flex p-4 w-full justify-center bg-[#FFB100] text-[#094B10]`}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex-grow md:sticky md:h-[75dvh] top-20 bg-[#F6F9F8] md:order-last order-first">
						<CartSummary
							{...{
								price,
								tax: Number(tax),
								reason,
								currrency: selectedCurrency.symbol,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

interface PaymentMethod {
	name?: string;
	img?: string;
	icon?: JSX.Element;
}
const paymentMethods: PaymentMethod[] = [
	{
		name: "Paystack",
		img: "/assets/images/paystack-icon.png",
	},
	// { img: "/assets/images/flutterwave-icon.png" },
];

export default PaidPurchaseForm;
