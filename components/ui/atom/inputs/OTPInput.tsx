import classNames from "classnames";
import { OTPInputProps } from "../../../../interfaces/otp-form-interface";
import { useMemo } from "react";

const OTPInput = (props: OTPInputProps) => {
	const {
		autoFocus,
		disabled,
		inputStyle,
		className,
		isNumberInput,
		style,
		maxLength,
		value,
		...rest
	} = props;

	const defaultInputClass = "border text-black";
	const combinedClassName = classNames(defaultInputClass, className);
	return (
		<input
			{...rest}
			maxLength={1}
			type="text"
			disabled={disabled}
			inputMode="numeric"
			autoComplete="one-time-code"
			className={combinedClassName}
		/>
	);
};
export default OTPInput;
