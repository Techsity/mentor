import React, { FormEvent, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { PrimaryButton } from "../../buttons";
import CountrySelectorComp from "../../inputs/CountrySelector";

interface IFormState {
	fullName: string;
	country: string;
}
const FreePurchaseForm = (props?: { reason: "course" | "workshop" }) => {
	const { reason } = props || {};
	const initialState: IFormState = {
		fullName: "",
		country: "",
	};
	const [state, setState] = useState<IFormState>(initialState);
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-md grid gap-5">
			<CustomTextInput
				placeholder="Name"
				className=""
				containerProps={{ className: "border border-[#094B10]" }}
			/>
			<CountrySelectorComp
				onSelect={(country) => {
					if (country?.label)
						setState({ ...state, country: country?.label });
				}}
				classes={{
					container: "border border-[#094B10] bg-transparent",
					input: "bg-transparent border-transparent",
				}}
				selected={null}
			/>
			<div className="flex sm:flex-row flex-col justify-between gap-2 sm:gap-6 items-start sm:items-center max-w-sm">
				<PrimaryButton
					title="Proceed"
					className="p-4 px-8 sm:order-first order-last"
				/>
				<span className="flex gap-3 items-center">
					<p className="text-sm">
						Send me notifications for this {reason}
					</p>
					<span className="flex justify-center items-center"></span>
				</span>
			</div>
		</form>
	);
};

export default FreePurchaseForm;
