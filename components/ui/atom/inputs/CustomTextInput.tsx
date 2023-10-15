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
	children?: ReactNode;
}

const CustomTextInput = forwardRef(function CustomTextInput(
	props: ICustomTextInputProps,
	ref?: ForwardedRef<HTMLInputElement>,
) {
	const { containerProps, rightIcon, children, ...inputProps } = props;

	return (
		<div
			className={classNames("relative", containerProps?.className)}
			{...containerProps}>
			<input
				ref={ref}
				{...inputProps}
				type={inputProps?.type}
				required={inputProps?.required}
				className={classNames(
					"w-full p-4 h-full focus:ring-0 outline-none",
					inputProps?.className,
				)}
			/>
			{rightIcon ? (
				<div className="absolute top-[30%] right-5">{rightIcon}</div>
			) : null}
			{children ? <div>{children}</div> : null}
		</div>
	);
});

export default CustomTextInput;
