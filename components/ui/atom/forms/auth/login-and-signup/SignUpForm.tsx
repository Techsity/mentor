import React, { useEffect, useRef } from "react";
import ReactCountryFlagsSelect from "react-country-flags-select";
import { Country } from "react-country-flags-select/dist/types";
import CustomTextInput from "../../../inputs";
import CountrySelector from "../../../inputs/CountrySelector";

const SignUpForm = () => {
	const [selected, setSelected] = React.useState<Country | null>(null);

	const defaultContainerProps = {
		className: "border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
	};
	const defaultInputProps = {
		required: true,
		className:
			"bg-[#F6F9F8] placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
	};

	return (
		<div className="animate__animated animate__bounceIn grid gap-3">
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Full name",
					type: "text",
				}}
				containerProps={defaultContainerProps}
			/>
			<CustomTextInput
				inputProps={{ ...defaultInputProps, placeholder: "Email", type: "email" }}
				containerProps={defaultContainerProps}
			/>
			<CountrySelector selected={selected} onSelect={(country) => setSelected(country)} />
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Phone Number",
					type: "text",
				}}
				containerProps={defaultContainerProps}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Create Password",
					type: "password",
				}}
				containerProps={defaultContainerProps}
			/>
			<CustomTextInput
				inputProps={{
					...defaultInputProps,
					placeholder: "Confirm Password",
					type: "password",
				}}
				containerProps={defaultContainerProps}
			/>
		</div>
	);
};

export default SignUpForm;
