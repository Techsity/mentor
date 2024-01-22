import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-ionicons";

interface SelectProps<T> {
	title?: string;
	data: { [key: string]: any }[] | any[] | T[];
	className?: string;
	newClassName?: string;
	handleSelected?: (val: any) => void;
	selected?: string;
	displayProperty?: keyof T;
	showIcon?: boolean;
	label: string;
}

export function Select<T>({
	data,
	title,
	className,
	handleSelected,
	selected,
	displayProperty,
	showIcon = true,
	label,
	newClassName,
}: SelectProps<T>) {
	const [isOpen, setIsOpen] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	const toggleSelectDropdown = () => {
		setIsOpen(!isOpen);
	};
	const closeSelectComponent = (event: any) => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", closeSelectComponent);
		return () => {
			document.removeEventListener("click", closeSelectComponent);
		};
	}, []);

	return (
		<div ref={selectRef} className={newClassName ? newClassName : `inline-block text-left w-full ${className}`}>
			<div
				onClick={toggleSelectDropdown}
				className="cursor-pointer capitalize text-[#70C5A1] font-normal text-xs w-full flex justify-between items-center">
				<div className="grid gap-2">
					<p className="">{label}</p>
					<p className="text-xs text-black">{title}</p>
				</div>
				<span className="" onClick={toggleSelectDropdown}>
					{isOpen ? (
						<ChevronUp color={"#70C5A1"} onClick={toggleSelectDropdown} />
					) : (
						<ChevronDown onClick={toggleSelectDropdown} color={"#70C5A1"} />
					)}
				</span>
			</div>
			{isOpen && (
				<div className="origin-top-right absolute left-0 mt-2 top-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-full z-20 animate__animated animate__fadeIn animate__faster max-h-[50dvh] overflow-hidden overflow-y-scroll">
					<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						{data.map((item, index) => (
							<div
								key={index}
								onClick={() => {
									if (handleSelected) handleSelected(item);
									toggleSelectDropdown();
								}}
								className="capitalize cursor-pointer block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
								{item[displayProperty] || item}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
