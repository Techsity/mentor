import React, {
	ChangeEvent,
	MouseEvent,
	MouseEventHandler,
	memo,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import countries from "../../../../data/countries";
import { ICountrySelectorProps, SelectedCountry } from "../../../../interfaces/country-selector.interface";
import classNames from "classnames";
import CustomTextInput from "./CustomTextInput";

const CountrySelector = ({
	onSelect,
	selected = null,
	classes,
	styles,
	selectPlaceholder,
	disabled = false,
	id,
	required,
	customIcon,
	onInvalidInput,
}: ICountrySelectorProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filteredOptions, setFilteredOptions] = useState<SelectedCountry[]>([]);
	const selectRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (selected) {
			if (typeof selected === "string") {
				setSearchTerm(selected);
			} else {
				setSearchTerm(selected.label);
			}
		}
	}, [selected]);

	// Close Options Modal when A Use Clicks Outside The Input Area
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false);
			}
			if (isOpen && selected) {
				if (typeof selected === "string") setSearchTerm(selected);
				else {
					setSearchTerm(selected.label);
				}
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectRef, selected, isOpen, searchTerm]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		if (value.trim().length > 0) {
			setIsOpen(true);
			setFilteredOptions(
				countries.filter((country) => country.label.trim().toLowerCase().includes(value.toLowerCase().trim())),
			);
		} else {
			setIsOpen(false);
			setFilteredOptions([]);
		}
	};

	const handleOptionClick = (option: SelectedCountry) => {
		setFilteredOptions([]);
		setIsOpen(false);
		setSearchTerm(option.label);
		onSelect(option);
	};

	const handleToggleSelect = () => {
		if (disabled) return;
		setFilteredOptions(countries);
		setIsOpen(!isOpen);
	};

	const selectButtonPlaceholder = selectPlaceholder ? selectPlaceholder : "Select a country";

	return (
		<div
			ref={selectRef}
			className={classNames(
				classes?.container,
				"border border-[#094B10] bg-transparent duration-300 min-h-[45px] relative",
			)}
			style={{
				...styles?.container,
			}}
			id={id}>
			<CustomTextInput
				ref={inputRef}
				disabled={disabled}
				required={required}
				className={classNames(
					"bg-[#F6F9F8] border-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
					classes?.input,
				)}
				containerProps={{ className: "border-transparent" }}
				placeholder={selectButtonPlaceholder}
				type="text"
				value={searchTerm}
				onChange={handleChange}
				onInvalid={onInvalidInput}
				rightIcon={
					<div onClick={handleToggleSelect} className="cursor-pointer">
						{customIcon !== null ? (
							customIcon
						) : (
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
								<path
									d="M9 0C4.029 0 0 4.029 0 9C0 13.971 4.029 18 9 18C13.971 18 18 13.971 18 9C18 4.029 13.971 0 9 0ZM11 2C11 3 10.5 4 9.5 4C8.5 4 8 5 8 6V9C8 9 9 9 9 6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9C10.8022 9 10.6089 9.05865 10.4444 9.16853C10.28 9.27841 10.1518 9.43459 10.0761 9.61732C10.0004 9.80004 9.98063 10.0011 10.0192 10.1951C10.0578 10.3891 10.153 10.5673 10.2929 10.7071C10.4327 10.847 10.6109 10.9422 10.8049 10.9808C10.9989 11.0194 11.2 10.9996 11.3827 10.9239C11.5654 10.8482 11.7216 10.72 11.8315 10.5556C11.9414 10.3911 12 10.1978 12 10H13V8L14 9L13 10C13 13 13 13 11 14C11 13 10 13 8 13V11L6 9V7C5 7 5 8 5 8L4.439 7.439L2.049 5.049C2.159 4.857 2.274 4.667 2.399 4.485L2.922 3.807C3.67121 2.92667 4.6028 2.21969 5.65227 1.73501C6.70174 1.25033 7.84402 0.999542 9 1C9.67501 1.00313 10.347 1.09116 11 1.262V2Z"
									fill="#BEBEBE"
								/>
							</svg>
						)}
					</div>
				}>
				{isOpen && (
					<ul
						className={classNames(
							"absolute max-h-[300px] animate__animated animate__fadeIn z-40 top-14 grid gap-2 overflow-hidden overflow-y-auto bg-white divide-y divide-[#094B10] border border-[#094B10] w-full text-left",
							classes?.optionsWrapper,
						)}
						style={{
							...styles?.optionsWrapper,
						}}>
						{
							filteredOptions.length > 0 &&
								filteredOptions.map((country, index) => (
									<CountryListItem
										key={index}
										classes={""}
										country={country}
										handleSelect={handleOptionClick}
										// handleSelectWithKeyboard={handleSelectWithKeyboard}
									/>
								))
							// : !selected && (
							// 		<li
							// 			className={classNames("p-5", classes?.option)}
							// 			style={{
							// 				fontSize: optionSize ? `${optionSize}px` : "1rem",
							// 				...styles?.option,
							// 			}}
							// 		>
							// 			No options found
							// 		</li>
							//   )
						}
					</ul>
				)}
			</CustomTextInput>
		</div>
	);
};

interface ICountryListItemProps {
	classes?: string;
	country: SelectedCountry;
	handleSelect: (country: SelectedCountry) => void;
}

const CountryListItem = ({ country, handleSelect }: ICountryListItemProps) => {
	return (
		<li onClick={() => handleSelect(country)} className="hover:bg-zinc-300 cursor-pointer p-3 text-sm">
			{country.label}
		</li>
	);
};

const CountrySelectorComp = memo(CountrySelector);
export default CountrySelectorComp;
