import React from "react";
import { MentorLogoDark } from "../../icons/svgs";
import CustomTextInput from "../../inputs";
import ReactCountryFlagsSelect from "react-country-flags-select";
import { Country } from "react-country-flags-select/dist/types";

const SignUpForm = () => {
	const [selected, setSelected] = React.useState<Country | null>(null);

	return (
		<div className="animate__animated animate__bounceIn grid gap-3">
			<CustomTextInput
				inputProps={{
					required: true,
					placeholder: "Full name",
					type: "text",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<CustomTextInput
				inputProps={{
					required: true,
					placeholder: "Email",
					type: "email",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			{/* <CustomTextInput
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px] relative",
				}}
				inputProps={{
					required: true,
					placeholder: "Country",
					type: "text",
					className:
						"bg-transparent w-[90%] placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				rightIcon={
					<svg
						className="cursor-pointer"
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
					>
						<path
							d="M9 0C4.029 0 0 4.029 0 9C0 13.971 4.029 18 9 18C13.971 18 18 13.971 18 9C18 4.029 13.971 0 9 0ZM11 2C11 3 10.5 4 9.5 4C8.5 4 8 5 8 6V9C8 9 9 9 9 6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9C10.8022 9 10.6089 9.05865 10.4444 9.16853C10.28 9.27841 10.1518 9.43459 10.0761 9.61732C10.0004 9.80004 9.98063 10.0011 10.0192 10.1951C10.0578 10.3891 10.153 10.5673 10.2929 10.7071C10.4327 10.847 10.6109 10.9422 10.8049 10.9808C10.9989 11.0194 11.2 10.9996 11.3827 10.9239C11.5654 10.8482 11.7216 10.72 11.8315 10.5556C11.9414 10.3911 12 10.1978 12 10H13V8L14 9L13 10C13 13 13 13 11 14C11 13 10 13 8 13V11L6 9V7C5 7 5 8 5 8L4.439 7.439L2.049 5.049C2.159 4.857 2.274 4.667 2.399 4.485L2.922 3.807C3.67121 2.92667 4.6028 2.21969 5.65227 1.73501C6.70174 1.25033 7.84402 0.999542 9 1C9.67501 1.00313 10.347 1.09116 11 1.262V2Z"
							fill="#BEBEBE"
						/>
					</svg>
				}
			/> */}

			<ReactCountryFlagsSelect
				selected={selected}
				onSelect={(country) => {
					setSelected(country);
				}}
				fullWidth
				searchable
				classes={{
					container: "text-sm mb-5",
					searchSelect: "bg-transparent duration-300 min-h-[50px] text-sm",
					selectWrapper:
						"border border-[#094B10] bg-transparent duration-300 min-h-[50px] text-sm",
				}}
				searchPlaceholder="Country"
				optionsListMaxHeight={200}
			/>
			<CustomTextInput
				inputProps={{
					required: true,
					placeholder: "Phone Number",
					type: "text",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<CustomTextInput
				inputProps={{
					required: true,
					placeholder: "Create Password",
					type: "text",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
			<CustomTextInput
				inputProps={{
					required: true,
					placeholder: "Confirm Password",
					type: "text",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
			/>
		</div>
	);
};

export default SignUpForm;
