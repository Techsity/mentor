import React, { CSSProperties } from "react";

export interface OTPInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
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
	inputClassName?: string;
}
