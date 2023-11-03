import Link from "next/link";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import classNames from "classnames";
interface IPrimaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	link?: string;
	disabled?: boolean;
	className?: string;
	icon?: JSX.Element | null;
}
export const PrimaryButton = (props: IPrimaryButton) => {
	const { title, className, icon, link, onClick, disabled, ...rest } = props;
	return props.link ? (
		<Link href={link ? link : "#"}>
			<button
				disabled={disabled}
				onClick={onClick}
				className={classNames(
					`bg-[#094B10] text-white hover:opacity-90 duration-300 select-none text-center flex gap-2 cursor-pointer select-none`,
					className,
					disabled
						? "cursor-not-allowed bg-zinc-500 opacity-80"
						: "cursor-pointer",
				)}
				{...rest}>
				{title}
				{icon ? icon : null}
			</button>
		</Link>
	) : (
		<button
			disabled={disabled}
			onClick={onClick}
			className={classNames(
				`bg-[#094B10] text-white hover:opacity-90 duration-300 select-none text-center flex gap-2 cursor-pointer select-none`,
				className,
				disabled ? "cursor-not-allowed bg-zinc-500 opacity-80" : "cursor-pointer",
			)}
			{...rest}>
			{title}
			{icon ? icon : null}
		</button>
	);
};
