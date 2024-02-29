import classNames from "classnames";
import { OTPInputProps } from "../../../../interfaces/otp-form-interface";
import { ForwardedRef, forwardRef } from "react";

const OTPInput = forwardRef(function Input(props: OTPInputProps, ref?: ForwardedRef<HTMLInputElement>) {
	const { autoFocus, disabled, inputStyle, className, isNumberInput, style, maxLength, value, ...rest } = props;

	const defaultInputClass = "border text-black";
	const combinedClassName = classNames(defaultInputClass, className);
	return (
		<input
			{...rest}
			ref={ref}
			maxLength={1}
			type="text"
			disabled={disabled}
			inputMode="numeric"
			autoComplete="one-time-code"
			className={combinedClassName}
		/>
	);
});
export default OTPInput;
