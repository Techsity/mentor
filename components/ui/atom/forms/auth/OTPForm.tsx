import React, { memo, useState } from "react";
import { OTPInputProps, OTPFormProps } from "../../../../../interfaces/otp-form-interface";
import OTPInput from "../../inputs/OTPInput";
import classNames from "classnames";
import { isValidNumber } from "../../../../../utils";

const OTPForm = ({ length = 6, inputClassName, otp, setOtp, disableInputs }: OTPFormProps) => {
	const [error, setError] = useState<string>("");
	const inputProps: OTPInputProps = {
		className: inputClassName,
		value: otp,
	};

	const handleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue: string = e.target.value;

		if (targetValue) {
			if (!isValidNumber(targetValue)) {
				e.preventDefault();
			} else if (otp.length !== 6) {
				setOtp((prev) => prev.trim().concat(targetValue.trim()));
			} else {
				setOtp(otp.replace(otp.charAt(idx), targetValue));
			}
			const nextInput = document.getElementById(`otp-input-${idx + 1}`) as HTMLInputElement;
			if (nextInput) nextInput.focus();
		} else {
			const prevIdx = idx - 1;
			const prevInput = document.getElementById(`otp-input-${prevIdx}`) as HTMLInputElement;
			setOtp((prev) => prev.substring(0, idx));
			if (prevIdx >= 0) prevInput.focus();
		}
	};

	return (
		<div className="flex flex-col justify-start px-5">
			<div className="flex flex-row gap-1 items-center justify-between w-full max-w-lg">
				{Array.from({ length }).map((_, index) => (
					<div className="sm:w-16 sm:h-16 w-14 h-14" key={index}>
						<OTPInput
							id={`otp-input-${index}`}
							{...inputProps}
							disabled={disableInputs}
							className={classNames(
								"text-center",
								inputProps.className,
								"w-full h-full flex flex-col placeholder:font-[400] items-center justify-center text-center px-5 outline-none border border-[#094B10] bg-transparent duration-300 text-lg focus:bg-[#094B101A] focus:ring-0",
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
