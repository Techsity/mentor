import React, {
	ForwardedRef,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
	TextareaHTMLAttributes,
	forwardRef,
} from "react";
import classNames from "classnames";

interface ICustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	containerProps?: HTMLAttributes<HTMLDivElement>;
	rightIcon?: JSX.Element | null;
	rightButton?: JSX.Element | null;
	children?: ReactNode;
}

const CustomTextArea = forwardRef(function CustomTextArea(
	props: ICustomTextAreaProps,
	ref?: ForwardedRef<HTMLTextAreaElement>,
) {
	const { rightIcon, rightButton, children, className, ...inputProps } = props;
	const { className: containerPropsClassName, ...rest } = props?.containerProps || {};
	return (
		<div
			className={classNames(
				"relative border-[#70C5A1] border overflow-hidden flex items-center w-full",
				containerPropsClassName,
			)}
			{...rest}>
			<textarea
				ref={ref}
				{...inputProps}
				disabled={inputProps.disabled}
				required={inputProps?.required}
				className={classNames(
					"p-3 h-full focus:ring-0 outline-none resize-none min-h-[80px]",
					rightIcon ? "w-[93%]" : "w-full flex-grow",
					className,
				)}></textarea>
			{rightButton ? rightButton : null}
			{rightIcon ? <div className="absolute top-[30%] right-5">{rightIcon}</div> : null}
			{children ? <div>{children}</div> : null}
		</div>
	);
});

export default CustomTextArea;
