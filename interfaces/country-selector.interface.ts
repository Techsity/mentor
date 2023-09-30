import { CSSProperties, ChangeEvent } from "react";

export interface SelectedCountry {
	countryCode: string;
	label: string;
}

export interface ICountrySelectorProps {
	onSelect: (country: SelectedCountry | null) => void;
	selected: SelectedCountry | null;
	searchable?: boolean;
	classes?: {
		container?: string;
		selectWrapper?: string;
		optionsWrapper?: string;
		option?: string;
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
