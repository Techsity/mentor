import React, { ChangeEvent, memo, useEffect, useId, useMemo, useRef, useState } from "react";
import {
	InitializePaymentInput,
	INITIATE_PAYMENT,
	VERIFY_PAYMENT,
} from "../../../../../services/graphql/mutations/payment";
import { useMutation, useQuery } from "@apollo/client";
import { useModal } from "../../../../../context/modal.context";
import { supportedCurrencies, ToastDefaultOptions } from "../../../../../constants";
import { PrimaryButton } from "../../buttons";
import { Bank, FETCH_BANKS } from "../../../../../services/graphql/queries/payment";
import { toast } from "react-toastify";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { formatGqlError } from "../../../../../utils/auth";
import classNames from "classnames";
import PaymentModalOTPForm from "./PaymentOtpForm";
import { useRouter } from "next/router";

const PaymentModal = ({
	resourceId,
	resourceType,
	selectedCurrency,
	amount,
	next,
}: { selectedCurrency?: (typeof supportedCurrencies)[0]; next: () => void } & Pick<
	InitializePaymentInput,
	"resourceId" | "resourceType" | "amount"
>) => {
	const toastId = useId();
	const router = useRouter();
	const [submissionStage, setSubmissionStage] = useState<"details" | "first_otp" | "second_otp">("details");
	const { closeModal } = useModal();
	const [currency, setCurrency] = useState<(typeof supportedCurrencies)[0]>(
		selectedCurrency || supportedCurrencies[0],
	);
	const [reference, setReference] = useState<string>("");

	const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
	// const { data: banksData, loading: banksLoading } = useQuery<{ fetchBanks: Bank[] }, any>(FETCH_BANKS);
	// const banks = banksData?.fetchBanks;

	const [input, setInput] = useState<Partial<InitializePaymentInput>>({
		resourceId,
		resourceType: resourceType.toUpperCase(),
		accountNumber: "0000000000",
		birthday: "1998-04-14",
		bankCode: "057",
		currency: currency.name.toUpperCase(),
		amount: Number(amount.toFixed(2)),
	});
	const [initializePayment, { loading: initializePaymentLoading, reset }] = useMutation<
		{ initiatePayment: any },
		{ input: InitializePaymentInput }
	>(INITIATE_PAYMENT);

	const handleChange =
		(name: keyof InitializePaymentInput) =>
		({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
			setInput((p) => {
				return { ...p, [name]: value };
			});

	const handleSubmit = async () => {
		let timeout;
		try {
			const { data: res } = await initializePayment({ variables: { input: input as InitializePaymentInput } });
			let timeout = setTimeout(function () {
				reset();
				clearTimeout(timeout);
			}, 5000); // to avoid stalled requests
			if (res?.initiatePayment.status === "success") paymentSuccessful();
			if (res?.initiatePayment) {
				setReference(res.initiatePayment.reference);
				clearTimeout(timeout);
				// toast.success(res?.initiatePayment.display_text, { toastId, ...ToastDefaultOptions() });
				setSubmissionStage("first_otp");
			}
		} catch (error: any) {
			clearTimeout(timeout);
			reset();
			console.error({ err: JSON.stringify(error) });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong", { toastId, ...ToastDefaultOptions() });
		}
	};

	const paymentSuccessful = () => {
		// router.replace(callbackUrl);
		next();
		closeModal();
	};

	useEffect(() => {
		if (!resourceId || !resourceType) {
			closeModal();
			return;
		}
	}, [resourceId, resourceType]);

	const loading = initializePaymentLoading;

	return (
		<div className="bg-white h-auto w-[95vw] min-w-[50vw] xs:w-auto rounded p-6 pb-10 inline-grid gap-3 overflow-hidden">
			<>
				{submissionStage === "first_otp" ? (
					<PaymentModalOTPForm
						{...{
							onInputComplete: () => {
								setSubmissionStage("second_otp");
							},
							reference,
						}}
					/>
				) : submissionStage === "second_otp" ? (
					<PaymentModalOTPForm
						{...{
							onInputComplete: paymentSuccessful,
							reference,
						}}
					/>
				) : (
					<div className="flex justify-center items-center">
						<div className="h-auto bg-white relative">
							<p className="text-xl text-[#083619] font-semibold">Payment Details</p>
							<span className="text-sm text-gray-500 font-medium italic">
								Note: Closing this modal will invalidate payment. Also try not reload or refresh this
								page!
							</span>

							<div className="text-sm sm:flex justify-between items-center font-medium mt-5">
								<h1 className="text-sm text-gray-600">
									Payment for a {resourceType.toLowerCase().split("_").join(" ")}
								</h1>
								<div className="flex gap-2">
									<p>Total:</p>
									<p>
										{currency.symbol} {Number(amount.toFixed(2)).toLocaleString()}
									</p>
								</div>
							</div>
							<hr className="mt-5" />
							<p className="text-md font-semibold mt-5">Card Information</p>
							<div className="mt-3 space-y-2">
								<p className="text-sm px-1">Account Number</p>
								<input
									onChange={handleChange("accountNumber")}
									// Todo: remove disabled on prod
									disabled
									className="h-12 border w-full bg-[#eef0ef] rounded text-sm outline-none px-3"
									type="text"
									value={input.accountNumber}
									placeholder="Account Number"
								/>
							</div>
							<div className="xs:flex gap-5 w-full">
								<div className="mt-3 space-y-2 w-full">
									<p className="text-sm px-1">Bank</p>
									<select
										// Todo: remove disabled on prod
										disabled
										className="h-12 border w-full bg-[#eef0ef] rounded text-sm outline-none px-3">
										<option value="">Test Bank</option>
										{/*// Todo: uncomment on prod */}
										{/* {banks
									?.filter((b) => !b.name.toLowerCase().includes("kuda"))
									.map((b) => (
										<option
											value=""
											onClick={() => setSelectedBank(b)}
											key={b.id}
											selected={selectedBank?.id === b.id}>
											{b.name}
										</option>
									))} */}
									</select>
								</div>
								<div className="mt-3 space-y-2 w-full">
									<p className="text-sm px-1">Date of Birth</p>
									<input
										// Todo: remove disabled on prod
										disabled
										onChange={handleChange("birthday")}
										className="h-12 border w-full bg-[#eef0ef] rounded text-sm outline-none px-3"
										type="text"
										placeholder="000"
										size={3}
										value={input.birthday}
									/>
								</div>
							</div>
							<PrimaryButton
								disabled={loading}
								onClick={handleSubmit}
								title={loading ? "" : "Pay"}
								icon={loading ? <ActivityIndicator /> : <></>}
								className="mt-6 text-sm flex w-full rounded p-3 justify-center"
							/>
						</div>
					</div>
				)}
			</>
		</div>
	);
};

export default PaymentModal;
