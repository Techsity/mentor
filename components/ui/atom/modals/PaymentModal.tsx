import React, { useEffect, useMemo, useState } from "react";
import { InitializePaymentInput, INITIATE_PAYMENT } from "../../../../services/graphql/mutations/payment";
import { useMutation, useQuery } from "@apollo/client";
import { useModal } from "../../../../context/modal.context";
import { supportedCurrencies } from "../../../../constants";
import { PrimaryButton } from "../buttons";
import { Bank, FETCH_BANKS } from "../../../../services/graphql/queries/payment";

const PaymentModal = ({
	resourceId,
	resourceType,
	selectedCurrency,
	amount,
}: { selectedCurrency?: (typeof supportedCurrencies)[0] } & Pick<
	InitializePaymentInput,
	"resourceId" | "resourceType" | "amount"
>) => {
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

	const handleSubmit = async () => {
		console.log({ input });
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

	return submissionStage === "first_otp" ? (
		<PaymentModalOTPForm {...{ onInputComplete: () => {} }} />
	) : submissionStage === "second_otp" ? (
		<PaymentModalOTPForm {...{ onInputComplete: () => {}, reset: true }} />
	) : (
		<div className="bg-white h-auto w-[95vw] xs:w-auto rounded p-6 pb-10 inline-grid gap-3">
			{/* <h1 className="font-medium">Process Payment</h1> */}
			<div className="flex justify-center items-center">
				<div className="h-auto bg-white relative">
					<p className="text-xl text-[#083619] font-semibold">Payment Details</p>
					<span className="text-sm text-gray-500 font-medium">
						Note: Closing this modal will invalidate payment. Also try not reload or refresh this page!
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
								<option value="">Zenith Bank</option>
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
								className="h-12 border w-full bg-[#eef0ef] rounded text-sm outline-none px-3"
								type="text"
								placeholder="000"
								size={3}
								value={input.birthday}
							/>
						</div>
					</div>
					<PrimaryButton
						// disabled={banksLoading}
						onClick={handleSubmit}
						title="Pay"
						className="mt-6 text-sm flex w-full rounded p-3 justify-center"
					/>
				</div>
			</div>
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
	useEffect(() => {
		if (reset) {
			// empty input
		}
	}, [reset]);
	return <div>OTP Stage</div>;
};

export default PaymentModal;
