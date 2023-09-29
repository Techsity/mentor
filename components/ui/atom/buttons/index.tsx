import Link from "next/link";
import { MouseEventHandler } from "react";

interface IPrimaryButton {
	title: string;
	link?: string;
	disabled?: boolean;
	className?: string;
	icon?: JSX.Element | null;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}
export const PrimaryButton = (props: IPrimaryButton) => {
	const { title, className, icon, link, onClick, disabled } = props;
	return props.link ? (
		<Link href={link ? link : "#"}>
			<button
				disabled={disabled}
				onClick={onClick}
				className={`flex bg-[#094B10] text-white cursor-pointer select-none text-center items-center ${className}`}
			>
				{title}
				{icon ? icon : null}
			</button>
		</Link>
	) : (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`bg-[#094B10] text-white cursor-pointer select-none text-center items-center ${className}`}
		>
			{title}
			{icon ? icon : null}
		</button>
	);
};
