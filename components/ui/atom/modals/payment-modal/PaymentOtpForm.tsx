import { useMutation } from "@apollo/client";
import classNames from "classnames";
import { useId, useRef, useMemo, useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { VERIFY_PAYMENT } from "../../../../../services/graphql/mutations/payment";
import { formatGqlError } from "../../../../../utils/auth";
import { PrimaryButton } from "../../buttons";
import ActivityIndicator from "../../loader/ActivityIndicator";

const PaymentModalOTPForm = ({ onInputComplete, reference }: { onInputComplete: () => void; reference: string }) => {
	const toastId = useId();
	const initialMessage = "To confirm that you own this account, kindly enter the OTP sent to your phone:";
	const otpInputRefs = useRef<HTMLInputElement[]>([]);
	const otpInputRefsCurrent = useMemo(() => otpInputRefs.current, [otpInputRefs.current]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [message, setMessage] = useState<string>(initialMessage || "");
	const [reset, setReset] = useState<boolean>(false);
	const arr = Array(6).fill("");

	const otp = otpInputRefsCurrent
		.map(({ value }) => value)
		.toString()
		.split(",")
		.join("");

	const [verifyOtp, { loading }] = useMutation<{ verifyPayment: { data: any; display_text?: string } }, any>(
		VERIFY_PAYMENT,
		{ variables: { reference, otp } },
	);

	const handleChange =
		(index: number) =>
		({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
			if (otpInputRefsCurrent) {
				if (value == "" && index - 1 >= 0) {
					otpInputRefsCurrent[currentIndex - 1].focus();
					setCurrentIndex(index - 1);
				} else {
					setCurrentIndex(index);
					otpInputRefsCurrent[index].value = value;
					if (index + 1 < 6 && otpInputRefsCurrent[index].value !== "")
						otpInputRefsCurrent[index + 1].focus();
				}
			}
		};

	const handleSubmit = async () => {
		if (otp.length !== arr.length) {
			toast.error("OTP must be 6-digits", { toastId, ...ToastDefaultOptions() });
			return;
		}
		try {
			const { data: res } = await verifyOtp();
			console.log({ res: res?.verifyPayment });
			if (res?.verifyPayment.data) {
				if (res?.verifyPayment.data.status !== "success") {
					if (res?.verifyPayment.display_text) setMessage(res?.verifyPayment.display_text);
					setCurrentIndex(0);
				}
				onInputComplete();
			}
		} catch (error) {
			console.error({ err: JSON.stringify(error) });
			const errMsg = formatGqlError(error);
			toast.error(errMsg || "Something went wrong", { toastId, ...ToastDefaultOptions() });
		}
	};

	let timeout: NodeJS.Timeout;

	useEffect(() => {
		if (message !== initialMessage) setReset(true);
		timeout = setTimeout(function () {
			setReset(false);
			clearTimeout(timeout);
		}, 100);
		return () => {
			clearTimeout(timeout);
			setReset(false);
		};
	}, [message]);

	return (
		<div className="h-full w-full animate__animated animate__fadeIn animate__fast">
			<h1 className="font-medium">Enter OTP</h1>
			<p className="text-sm">{message}</p>
			<div className="flex gap-2 sm:gap-4 items-center py-5 max-w-xl justify-center">
				{arr.map((_, index) => (
					<div
						key={index}
						className={classNames(
							"border-2 w-full flex focus-within:border-[#70C5A1] duration-300 items-center justify-center overflow-hidden",
							currentIndex + 1 >= index &&
								otpInputRefsCurrent[index] &&
								otpInputRefsCurrent[index].value !== ""
								? "border-[#70C5A1]"
								: "border-zinc-300",
						)}>
						<input
							ref={(node) => {
								if (node) {
									if (reset) node.value = "";
									if (otpInputRefsCurrent) otpInputRefsCurrent[index] = node;
									else delete otpInputRefsCurrent[index];
								}
							}}
							autoFocus={index === 0}
							type="text"
							className="sm:p-3 p-2 bg-transparent text-center border-none outline-none focus:ring-0 w-full h-full"
							onChange={handleChange(index)}
							size={1}
							max={1}
							maxLength={1}
						/>
					</div>
				))}
			</div>
			<PrimaryButton
				disabled={otp.length !== arr.length || loading}
				onClick={handleSubmit}
				title={loading ? "" : "Continue"}
				icon={loading ? <ActivityIndicator /> : <></>}
				className="mt-6 text-sm flex w-full rounded p-3 justify-center"
			/>
		</div>
	);
};

export default PaymentModalOTPForm;
