import React, { HtmlHTMLAttributes } from "react";
import classNames from "classnames";

interface IActivityIndicator extends HtmlHTMLAttributes<HTMLDivElement> {
	color?: string;
	size?: string | number;
}

const ActivityIndicator = (props: IActivityIndicator) => {
	const { color, size, className, ...rest } = props;
	return (
		<div
			{...rest}
			className={classNames(
				"inline-block animate-spin rounded-full border-4 border-solid align-[-0.125em] motion-reduce:animate-[spin_2s_linear_infinite]",
				className,
				color
					? `border-[${color}] border-r-transparent`
					: `border-current border-r-transparent`,
				!size ? `h-6 w-6` : ``,
			)}
			style={{ height: size, width: size }}
			role="status"
		/>
	);
};

export default ActivityIndicator;
