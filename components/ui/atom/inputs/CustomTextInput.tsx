import React, {
	ForwardedRef,
	HTMLAttributes,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	ReactNode,
	forwardRef,
} from "react";
import classNames from "classnames";
interface ICustomTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	leftIcon?: JSX.Element | null;
	rightIcon?: JSX.Element | null;
	leftIconClass?: string;
	rightIconClass?: string;
	rightButton?: JSX.Element | null;
	children?: ReactNode;
	type?: HTMLInputTypeAttribute;
}

const CustomTextInput = forwardRef(function CustomTextInput(
	props: ICustomTextInputProps,
	ref?: ForwardedRef<HTMLInputElement>,
) {
	const {
		containerProps,
		rightIcon,
		leftIcon,
		rightButton,
		children,
		leftIconClass,
		rightIconClass,
		type,
		...inputProps
	} = props;

	return (
		<div
			className={classNames(
				"relative border-[#70C5A1] border overflow-hidden flex items-center w-full gap-4 flex-row",
				containerProps?.className,
			)}
			{...containerProps}>
			{leftIcon ? (
				<div className={classNames(leftIconClass ? leftIconClass : "absolute top-[30%] left-5")}>
					{leftIcon}
				</div>
			) : null}
			<input
				ref={ref}
				{...inputProps}
				disabled={inputProps.disabled}
				type={type}
				required={inputProps?.required}
				className={classNames(
					"p-4 h-full focus:ring-0 outline-none",
					type === "number" &&
						"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
					rightIcon ? "w-[93%]" : leftIcon ? "w-[93%]" : "w-full flex-grow",
					inputProps?.className,
				)}
			/>
			{rightButton ? rightButton : null}
			{leftIcon ? (
				<div className={classNames(rightIconClass ? rightIconClass : "absolute top-[30%] right-5")}>
					{rightIcon}
				</div>
			) : null}
			{children ? <div>{children}</div> : null}
		</div>
	);
});

export default CustomTextInput;
