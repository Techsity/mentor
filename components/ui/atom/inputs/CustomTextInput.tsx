import React, {
	ForwardedRef,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
	forwardRef,
} from "react";
import classNames from "classnames";
interface ICustomTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	rightIcon?: JSX.Element | null;
	rightButton?: JSX.Element | null;
	children?: ReactNode;
}

const CustomTextInput = forwardRef(function CustomTextInput(
	props: ICustomTextInputProps,
	ref?: ForwardedRef<HTMLInputElement>,
) {
	const { containerProps, rightIcon, rightButton, children, ...inputProps } =
		props;

	return (
		<div
			className={classNames(
				"relative border-[#70C5A1] border overflow-hidden flex items-center w-full",
				containerProps?.className,
			)}
			{...containerProps}>
			<input
				ref={ref}
				{...inputProps}
				disabled={inputProps.disabled}
				type={inputProps?.type}
				required={inputProps?.required}
				className={classNames(
					"p-4 h-full focus:ring-0 outline-none",
					rightIcon ? "w-[93%]" : "w-full flex-grow",
					inputProps?.className,
				)}
			/>
			{rightButton ? rightButton : null}
			{rightIcon ? (
				<div className="absolute top-[30%] right-5">{rightIcon}</div>
			) : null}
			{children ? <div>{children}</div> : null}
		</div>
	);
});

export default CustomTextInput;
