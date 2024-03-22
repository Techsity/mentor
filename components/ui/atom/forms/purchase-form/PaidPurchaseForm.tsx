/* eslint-disable @next/next/no-img-element */
import React, { useId, useState } from "react";
import CountrySelectorComp from "../../inputs/CountrySelector";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, updateUserProfile } from "../../../../../redux/reducers/authSlice";
import { ICourse, IWorkshop } from "../../../../../interfaces";
import { PrimaryButton } from "../../buttons";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE_TO_COURSE } from "../../../../../services/graphql/mutations/courses";
import { Subscription } from "../../../../../interfaces/user.interface";
import { useRouter } from "next/router";
import { ToastDefaultOptions } from "../../../../../constants";
import { toast } from "react-toastify";
import ResponseMessages from "../../../../../constants/response-codes";
import { formatGqlError } from "../../../../../utils/auth";
import { INITIALIZE_PAYMENT } from "../../../../../services/graphql/mutations/payment";
import { calculateTax, slugify } from "../../../../../utils";

const PaidPurchaseForm = (props: { reason: "course" | "workshop"; resource: ICourse | IWorkshop }) => {
	const user = useSelector(currentUser);
	const toastId = useId();
	const dispatch = useDispatch();
	const router = useRouter();
	const { reason = "course", resource } = props;
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(paymentMethods[0]);
	const [selectedCountry, setSelectedCountry] = useState<string | null>(user?.country || null);
	const [subscribeToCourse, { loading }] = useMutation<{ subscribeToCourse: Subscription }, { courseId: string }>(
		SUBSCRIBE_TO_COURSE,
	);
	const [initializePayment, { loading: initializePaymentLoading }] = useMutation<
		{ initiatePayment: any },
		{ amount: number; resourceType: string; resourceId: string }
	>(INITIALIZE_PAYMENT);

	const tax = resource.price !== 0 ? calculateTax(resource.price, 7.5) : 0;
	const amount = resource.price + Number(tax);

	const processFreeCourse = async () => {
		try {
			const { data } = await subscribeToCourse({ variables: { courseId: String(resource.id) } });
			if (data?.subscribeToCourse.id) {
				// toast.success("Subscription successful.", { ...ToastDefaultOptions(), toastId });
				dispatch(
					updateUserProfile({
						...user,
						subscriptions: user?.subscriptions.concat(data?.subscribeToCourse),
					}),
				);
				router.replace(`/courses/${resource.id}/learn`);
			} else {
				console.log({ error: data?.subscribeToCourse });
				toast.error("Subscription failed", { ...ToastDefaultOptions(), toastId });
			}
		} catch (error) {
			console.error({ error });
			const errMsg = formatGqlError(error);
			if (errMsg === ResponseMessages.ALREADY_SUBSCRIBED) {
				toast.info(errMsg, { ...ToastDefaultOptions(), toastId });
				if (reason === "course") router.replace(`/courses/${resource.id}/learn`);
			} else
				toast.error(errMsg || "Something went wrong. Please try again.", {
					...ToastDefaultOptions(),
					toastId,
				});
		}
	};

	const processPaidCourse = async () => {
		try {
			const { data } = await initializePayment({
				variables: { amount, resourceId: String(resource.id), resourceType: reason },
			});
			console.log({ res: data?.initiatePayment });
			if (data?.initiatePayment.authorization_url) {
				toast.success("Redirecting to payment page...", {
					...ToastDefaultOptions(),
					toastId,
				});
				router.replace(data?.initiatePayment.authorization_url);
			}
		} catch (error) {
			console.error({ error });
			const errMsg = formatGqlError(error);
			// if (errMsg === ResponseMessages.ALREADY_SUBSCRIBED) {
			// 	toast.info(errMsg, { ...ToastDefaultOptions(), toastId });
			// 	if (reason === "course") router.replace(`/courses/${resource.id}/learn`);
			// } else
			toast.error(errMsg || "Something went wrong. Please try again.", {
				...ToastDefaultOptions(),
				toastId,
			});
		}
	};

	const handleSubmit = async () => {
		if (reason === "course") {
			if (resource.price === 0) {
				await processFreeCourse();
			} else if (resource.price > 0) {
				await processPaidCourse();
			}
		}
	};

	return (
		<>
			<div className="flex items-center lg:px-28 sm:px-12 px-6 md:py-20 py-5">
				<div className="">
					<h1 className="text-[#00D569] font-thin text-3xl capitalize" style={{ fontFamily: "Days One" }}>
						{reason === "workshop" ? "Pay to Join" : "Buy this Course"}
					</h1>
					<div className="grid gap-3">
						<h1 className="font-medium mt-3">Billing Address</h1>
						<p className="max-w-md text-sm">
							Mentör is by law required to collect applicable transaction taxes for purchases made in
							certain tax jurisdictions.
						</p>
						<div className="">
							<CountrySelectorComp
								disabled={user?.country ? true : false}
								selected={selectedCountry}
								onSelect={(country) => {
									if (country?.label) setSelectedCountry(country?.label);
								}}
								classes={{
									input: "bg-transparent",
									container: "my-3",
								}}
							/>
							{resource.price > 0 && (
								<div className="grid gap-3">
									<p className="font-medium">Payment Method</p>
									<div className="grid gap-3">
										{paymentMethods.map((method, i) => (
											<span
												onClick={() => setSelectedMethod(method)}
												className="border border-[#70C5A1] p-3 overflow-hidden flex justify-between items-center cursor-pointer"
												key={i}>
												<span className="flex gap-4 items-center">
													{method.img && (
														<img
															src={method.img}
															alt=""
															className="w-auto max-w-[150px] h-6"
															loading="lazy"
														/>
													)}
													{method.icon && <span className="">{method.icon}</span>}
												</span>
												<span className="flex-grow ml-3">{method.name}</span>
												<>
													{selectedMethod &&
													slugify(String(selectedMethod.name)) ==
														slugify(String(method.name)) ? (
														<svg width="23" height="23" viewBox="0 0 23 23" fill="none">
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M1.896 17.5002C0.65979 15.6501 0 13.475 0 11.25C0 9.77261 0.291016 8.30972 0.856323 6.94479C1.42175 5.5799 2.25037 4.33969 3.29504 3.29504C4.33972 2.2504 5.57996 1.42172 6.94482 0.856354C8.30969 0.290985 9.77258 0 11.25 0C13.475 0 15.6501 0.65979 17.5001 1.89597C19.3502 3.13214 20.7921 4.88913 21.6437 6.94479C22.4951 9.00049 22.7179 11.2625 22.2838 13.4448C21.8497 15.627 20.7783 17.6316 19.205 19.205C17.6316 20.7783 15.6271 21.8497 13.4448 22.2838C11.2625 22.7179 9.00049 22.4951 6.94482 21.6436C4.88916 20.7921 3.13208 19.3502 1.896 17.5002ZM6 12.0039L9.61047 16L17 7.82111L15.3546 6L9.61047 12.3642L7.64539 10.1827L6 12.0039Z"
																fill="#70C5A1"
															/>
														</svg>
													) : (
														<svg width="23" height="23" viewBox="0 0 23 23" fill="none">
															<path
																d="M2.31173 17.2224L2.31174 17.2224C3.49287 18.9902 5.17186 20.368 7.13616 21.1817C9.10047 21.9953 11.2619 22.2082 13.3473 21.7935C15.4325 21.3786 17.348 20.3548 18.8514 18.8514C20.3548 17.348 21.3786 15.4325 21.7934 13.3472C22.2082 11.2619 21.9953 9.10046 21.1817 7.13612C20.368 5.17182 18.9902 3.49293 17.2223 2.3117L17.2223 2.31169C15.4546 1.13047 13.3761 0.5 11.25 0.5C9.83824 0.5 8.44037 0.778053 7.13617 1.31829C5.83196 1.85853 4.64684 2.65038 3.64859 3.6486C2.65037 4.6468 1.85858 5.83187 1.31827 7.13612L2.31173 17.2224ZM2.31173 17.2224C1.13047 15.4546 0.5 13.3761 0.5 11.25M2.31173 17.2224L0.5 11.25M0.5 11.25C0.5 9.83829 0.778075 8.44043 1.31825 7.13616L0.5 11.25Z"
																stroke="#70C5A1"
															/>
														</svg>
													)}
												</>
											</span>
										))}
									</div>
								</div>
							)}
							<div className="mt-4">
								<PrimaryButton
									onClick={handleSubmit}
									icon={loading || initializePaymentLoading ? <ActivityIndicator /> : null}
									title={loading || initializePaymentLoading ? "" : "Continue"}
									disabled={
										loading || initializePaymentLoading || (resource.price > 0 && !selectedMethod)
									}
									className={`flex p-4 w-full justify-center`}
								/>
							</div>
						</div>
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
