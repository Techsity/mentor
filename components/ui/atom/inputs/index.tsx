import React, { HTMLAttributes, InputHTMLAttributes } from "react";

const CustomTextInput = (props: {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	rightIcon?: JSX.Element | null;
}) => {
	const { inputProps, containerProps, rightIcon } = props;
	const combinedContainerClassName = `${containerProps?.className || ""}`;
	const combinedInputClassName = `w-full p-4 h-full focus:ring-0 outline-none ${
		inputProps?.className || ""
	}`;

	return (
		<div className={"relative" + combinedContainerClassName} {...containerProps}>
			<input {...inputProps} className={combinedInputClassName} />
			{rightIcon ? (
				<div className="absolute top-[30%] right-5">{rightIcon}</div>
			) : null}
		</div>
	);
};

export default CustomTextInput;
