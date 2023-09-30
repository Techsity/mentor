import React, { KeyboardEvent, memo, useEffect, useRef, useState } from "react";
import {
	OTPInputProps,
	OTPFormProps,
} from "../../../../../interfaces/otp-form-interface";
import OTPInput from "../../inputs/OTPInput";
import classNames from "classnames";
import { isValidNumber } from "../../../../../utils";

const OTPForm = (formProps: OTPFormProps) => {
	const {
		length = 6,
		isNumberOTP = true,
		inputClassName,
		otp,
		setOtp,
		disableInputs,
	} = formProps;
	const [error, setError] = useState<string>("");
	const inputProps: OTPInputProps = {
		className: inputClassName,
		value: otp,
	};

	const handleChange =
		(idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const targetValue: string = e.target.value;
			const nextElementSibling = document.getElementById(`input_${idx + 1}`);
			if (targetValue) {
				if (!isValidNumber(targetValue)) {
					e.preventDefault();
					return;
				}
				if (nextElementSibling) {
					nextElementSibling.focus();
				}
				if (otp.length !== 6) {
					setError("");
					setOtp((prev) => prev.trim().concat(targetValue.trim()));
				} else {
					setError("");
					setOtp(otp.replace(otp.charAt(idx), targetValue));
				}
			}
		};

	return (
		<div className="flex flex-col justify-start px-5">
			<div className="flex flex-row gap-1 items-center justify-between w-full max-w-lg">
				{Array.from({ length }).map((_, index) => (
					<div className="sm:w-16 sm:h-16 w-14 h-14" key={index}>
						<OTPInput
							id={"input_" + index}
							{...inputProps}
							disabled={disableInputs}
							className={classNames(
								"text-center",
								inputProps.className,
								"w-full h-full flex flex-col placeholder:font-[400] items-center justify-center text-center px-5 outline-none border border-[#094B10] bg-transparent duration-300 text-lg focus:bg-[#094B101A] focus:ring-0",
								// "bg-[#d311191A] focus:bg-[#d311191A]"
							)}
							placeholder="-"
							onChange={handleChange(index)}
							value={otp.charAt(index)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const OTPFormComponent = memo(OTPForm);

export default OTPFormComponent;
