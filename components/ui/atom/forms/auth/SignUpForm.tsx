import React from "react";
import { MentorLogoDark } from "../../icons/svgs";
import CustomTextInput from "../../inputs";

const SignUpForm = () => {
	return (
		<div className="animate__animated animate__bounceIn grid gap-3">
			<CustomTextInput
				inputProps={{
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
					placeholder: "Email",
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
				containerProps={{
					className:
						"border border-[#094B10] bg-transparent duration-300 min-h-[45px]",
				}}
				inputProps={{
					placeholder: "Country",
					type: "text",
					className:
						"bg-transparent placeholder:font-[300] placeholder:text-[#A3A6A7] text-sm",
				}}
			/>
			<CustomTextInput
				inputProps={{
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
