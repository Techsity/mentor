import React, { memo, useEffect, useState } from "react";
import {
	OTPInputProps,
	OTPFormProps,
} from "../../../../../interfaces/otp-form-interface";
import OTPInput from "../../inputs/OTPInput";
import classNames from "classnames";
import { toast } from "react-toastify";

export const RE_DIGIT = new RegExp(/^\d+$/);

const OTPForm = (formProps: OTPFormProps) => {
	const { length = 6, isNumberOTP = true, inputClassName } = formProps;
	const [otp, setOtp] = useState<string>("");
	const inputProps: OTPInputProps = {
		className: inputClassName,
		value: otp,
	};
	useEffect(() => {
		console.log("otp", otp);
	}, [otp]);

	const handleChange =
		(idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const targetValue: string = e.target.value;
			const nextElementSibling = e.target
				.nextElementSibling as HTMLInputElement | null;
			if (targetValue) {
				// if (typeof targetValue !== "number") {
				// 	toast.error("Invalid Otp", {
				// 		autoClose: 5000,
				// 		closeOnClick: true,
				// 		draggable: true,
				// 		position: "top-right",
				// 		hideProgressBar: true,
				// 		theme: "colored",
				// 		toastId: "otp_pop",
				// 	});
				// 	return;
				// }
				if (nextElementSibling) {
					if (idx < length) nextElementSibling.focus();
				}
				if (otp.length !== 6) {
					setOtp((prev) => prev.trim().concat(e.target.value));
				} else {
					setOtp(otp.replace(otp.charAt(idx), targetValue));
					console.log();
				}
			}
		};
	return (
		<div className="flexgap-5 items-center">
			{Array.from({ length }).map((_, index) => (
				<OTPInput
					key={index}
					{...inputProps}
					// inputMode={isNumberOTP ? "numeric" : "text"}
					type="tel"
					pattern="\d{1}"
					className={classNames("py-5 text-center", inputProps.className)}
					placeholder="-"
					onChange={handleChange(index)}
					maxLength={5}
				/>
			))}
		</div>
	);
};

const OTPFormComponent = memo(OTPForm);

export default OTPFormComponent;
