import React, { memo, useEffect, useState } from "react";
import {
	OTPInputProps,
	OTPFormProps,
} from "../../../../../interfaces/otp-form-interface";
import OTPInput from "../../inputs/OTPInput";
import classNames from "classnames";
import { toast } from "react-toastify";

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
		<div className="flex flex-col justify-start px-5">
			<div className="flex flex-row gap-1 items-center justify-between w-full max-w-lg">
				{Array.from({ length }).map((_, index) => (
					<div className="sm:w-16 sm:h-16 w-14 h-14" key={index}>
						<OTPInput
							{...inputProps}
							inputMode={isNumberOTP ? "numeric" : "text"}
							type="tel"
							pattern="\d{1}"
							className={classNames(
								" text-center",
								inputProps.className,
								"w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none border border-[#094B10] text-lg bg-white focus:bg-[#094B101A] focus:ring-0",
							)}
							placeholder="-"
							onChange={handleChange(index)}
							maxLength={5}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const OTPFormComponent = memo(OTPForm);

export default OTPFormComponent;
