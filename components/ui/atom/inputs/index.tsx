import React, { HTMLAttributes, InputHTMLAttributes } from "react";

const CustomTextInput = (props: {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
}) => {
	const { inputProps, containerProps } = props;
	const combinedInputClassName = `w-full p-4 h-full focus:ring-0 outline-none ${
		inputProps?.className || ""
	}`;
	const combinedContainerClassName = `${containerProps?.className || ""}`;

	return (
		<div className={combinedContainerClassName} {...containerProps}>
			<input {...inputProps} className={combinedInputClassName} />
		</div>
	);
};

export default CustomTextInput;
