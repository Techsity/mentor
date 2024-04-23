import React, { HtmlHTMLAttributes } from "react";
import classNames from "classnames";

interface IActivityIndicator extends HtmlHTMLAttributes<HTMLDivElement> {
	color?: string;
	size?: string | number;
	forButton?: boolean;
}

const ActivityIndicator = (props: IActivityIndicator) => {
	const { color, size, style, className, forButton, ...rest } = props;

	// const arr = Array.from({ length: 4 });
	// Todo: implement simple dots loader 
	// forButton
	return (
		<div
			{...rest}
			className={classNames(
				"inline-block rounded-full border-4 border-solid align-[-0.125em] animate-[spin_2s_linear_infinite]",
				className,
				color ? `border-[${color}] border-r-transparent` : `border-current border-r-transparent`,
				!size ? `h-6 w-6` : ``,
			)}
			style={{ height: size, width: size, ...style }}
			role="status"
		/>
	);
};

export default ActivityIndicator;
