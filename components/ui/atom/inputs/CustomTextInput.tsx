import React, {
	ForwardedRef,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
	forwardRef,
} from "react";

const CustomTextInput = forwardRef(function CustomTextInput(
	props: {
		containerProps?: HTMLAttributes<HTMLDivElement>;
		inputProps?: InputHTMLAttributes<HTMLInputElement>;
		rightIcon?: JSX.Element | null;
		children?: ReactNode;
	},
	ref?: ForwardedRef<HTMLInputElement>,
) {
	const { inputProps, containerProps, rightIcon, children } = props;
	const combinedContainerClassName = `${containerProps?.className || ""}`;
	const combinedInputClassName = `w-full p-4 h-full focus:ring-0 outline-none ${
		inputProps?.className || ""
	}`;

	return (
		<div className={"relative" + combinedContainerClassName} {...containerProps}>
			<input
				ref={ref}
				{...inputProps}
				type={inputProps?.type}
				required={inputProps?.required}
				className={combinedInputClassName}
			/>
			{rightIcon ? (
				<div className="absolute top-[30%] right-5">{rightIcon}</div>
			) : null}

			{children ? <div>{children}</div> : null}
		</div>
	);
});

export default CustomTextInput;
