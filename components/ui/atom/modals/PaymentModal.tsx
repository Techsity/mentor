import React, { ChangeEvent, memo, useEffect, useId, useMemo, useRef, useState } from "react";
import { InitializePaymentInput, INITIATE_PAYMENT } from "../../../../services/graphql/mutations/payment";
import { useMutation, useQuery } from "@apollo/client";
import { useModal } from "../../../../context/modal.context";
import { supportedCurrencies, ToastDefaultOptions } from "../../../../constants";
import { PrimaryButton } from "../buttons";
import { Bank, FETCH_BANKS } from "../../../../services/graphql/queries/payment";
import { toast } from "react-toastify";
import ActivityIndicator from "../loader/ActivityIndicator";
import { formatGqlError } from "../../../../utils/auth";
import classNames from "classnames";

const PaymentModal = ({
	resourceId,
	resourceType,
	selectedCurrency,
	amount,
}: { selectedCurrency?: (typeof supportedCurrencies)[0] } & Pick<
	InitializePaymentInput,
	"resourceId" | "resourceType" | "amount"
>) => {
	const toastId = useId();
	const [submissionStage, setSubmissionStage] = useState<"details" | "first_otp" | "second_otp">("details");
	const { closeModal } = useModal();
	const [currency, setCurrency] = useState<(typeof supportedCurrencies)[0]>(
		selectedCurrency || supportedCurrencies[0],
	);
	const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
	// const { data: banksData, loading: banksLoading } = useQuery<{ fetchBanks: Bank[] }, any>(FETCH_BANKS);
	// const banks = banksData?.fetchBanks;

	const [input, setInput] = useState<Partial<InitializePaymentInput>>({
		resourceId,
		resourceType,
		accountNumber: "0000000000",
		birthday: "1998-04-14",
		bankCode: "057",
		currency: currency.name.toUpperCase(),
		amount: Number(amount.toFixed(2)),
	});
	const [initializePayment, { loading: initializePaymentLoading }] = useMutation<
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
		try {
			const { data: res } = await initializePayment({ variables: { input: input as InitializePaymentInput } });
			if (res?.initiatePayment) {
				toast.success(res?.initiatePayment.display_text, { toastId, ...ToastDefaultOptions() });
				setSubmissionStage("first_otp");
			}
		} catch (error: any) {
			console.error({ err: JSON.stringify(error) });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong", { toastId, ...ToastDefaultOptions() });
		}
	};

	useEffect(() => {
		if (!resourceId || !resourceType) {
			closeModal();
			return;
		}
	}, [resourceId, resourceType]);

	// useEffect(() => {
	// 	console.log({ selectedBank });
	// }, [selectedBank]);

	const loading = initializePaymentLoading;

	return (
		<div className="bg-white h-auto w-[95vw] min-w-[50vw] xs:w-auto rounded p-6 pb-10 inline-grid gap-3 overflow-hidden">
			<>
				{submissionStage === "first_otp" ? (
					<PaymentModalOTPForm {...{ onInputComplete: () => {} }} />
				) : submissionStage === "second_otp" ? (
					<PaymentModalOTPForm {...{ onInputComplete: () => {}, reset: true }} />
				) : (
					<div className="flex justify-center items-center">
						<div className="h-auto bg-white relative">
							<p className="text-xl text-[#083619] font-semibold">Payment Details</p>
							<span className="text-sm text-gray-500 font-medium">
								Note: Closing this modal will invalidate payment. Also try not reload or refresh this
								page!
							</span>
							<div className="text-sm flex justify-between mt-5 font-medium">
								<p>Total</p>
								<p>
									{currency.symbol} {Number(amount.toFixed(2)).toLocaleString()}
								</p>
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

const PaymentModalOTPForm = ({
	onInputComplete,
	reset = false,
}: {
	onInputComplete: (otp: string) => void;
	reset?: boolean;
}) => {
	const otpInputRefs = useRef<HTMLInputElement[]>([]);
	const otpInputRefsCurrent = otpInputRefs.current;

	useEffect(() => {
		if (reset) {
			// empty input
		}
	}, [reset]);

	const handleChange =
		(index: number) =>
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			if (otpInputRefsCurrent) {
				otpInputRefsCurrent[index].value = value;
				if (index + 1 < 6 && index !== 0) otpInputRefsCurrent[index + 1].focus();
				if (otpInputRefsCurrent[index].value == "" && index - 1 >= 0) {
					otpInputRefsCurrent[index - 1].focus();
					otpInputRefsCurrent[index].value = "";
				}
			}
		};

	const handleSubmit = async () => {};

	const arr = Array(6).fill("");

	return (
		<div className="h-full w-full animate__animated animate__fadeIn animate__fast">
			<h1 className="font-medium">Enter OTP</h1>
			<div className="flex gap-2 sm:gap-4 items-center py-5 max-w-xl justify-center">
				{arr.map((_, index) => (
					<div
						key={index}
						className={classNames(
							"border-2 w-full flex focus-within:border-[#70C5A1] duration-300 items-center justify-center overflow-hidden",
							!true ? "border-[#70C5A1]" : "border-zinc-300",
						)}>
						<input
							ref={(node) => {
								if (otpInputRefsCurrent)
									if (node) otpInputRefsCurrent[index] = node;
									else delete otpInputRefsCurrent[index];
							}}
							autoFocus={index === 0}
							type="text"
							className="sm:p-3 p-2 bg-transparent text-center border-none outline-none focus:ring-0 w-full h-full"
							// value={otpInput[index]}
							onChange={handleChange(index)}
							size={1}
							max={1}
							maxLength={1}
						/>
					</div>
				))}
			</div>
			<PrimaryButton
				// disabled={loading}
				onClick={handleSubmit}
				title="Continue"
				// title={loading ? "" : "Pay"}
				// icon={loading ? <ActivityIndicator /> : <></>}
				className="mt-6 text-sm flex w-full rounded p-3 justify-center"
			/>
		</div>
	);
};

export default memo(PaymentModal);
