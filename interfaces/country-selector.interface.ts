import { CSSProperties, ChangeEvent, FormEvent } from "react";

export interface SelectedCountry {
	countryCode: string;
	label: string;
}

export interface ICountrySelectorProps {
	onSelect: (country: SelectedCountry | null) => void;
	selected: SelectedCountry | string | null;
	searchable?: boolean;
	required?: boolean;
	onInvalidInput?: (e: FormEvent<HTMLInputElement>) => void;
	classes?: {
		container?: string;
		optionsWrapper?: string;
		input?: string;
	};
	styles?: {
		container?: CSSProperties;
		selectWrapper?: CSSProperties;
		optionsWrapper?: CSSProperties;
		option?: CSSProperties;
	};
	customLabelOptions?: Object;
	labelWithCountryCode?: false;
	labelOnlyCountryCode?: false;
	searchPlaceholder?: string;
	selectPlaceholder?: string;
	CustomOpenIcon?: Object;
	CustomCloseIcon?: Object;
	clearIcon?: boolean;
	selectWidth?: number;
	selectHeight?: number;
	optionSize?: number;
	selectedSize?: number;
	fullWidth?: boolean;
	optionsListMaxHeight?: number;
	disabled?: boolean;
	id?: string;
}
