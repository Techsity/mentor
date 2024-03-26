import React, { CSSProperties, Dispatch, ForwardedRef, RefObject, SetStateAction } from "react";

export interface OTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	autoFocus?: boolean;
	isNumberInput?: boolean;
	disabled?: boolean;
	value: string;
	style?: CSSProperties;
	className?: string;
	inputStyle?: CSSProperties;
}

export interface OTPFormProps {
	length?: number;
	isNumberOTP?: boolean;
	disableInputs?: boolean;
	inputClassName?: string;
	otp: string;
	setOtp: Dispatch<SetStateAction<string>>;
}
