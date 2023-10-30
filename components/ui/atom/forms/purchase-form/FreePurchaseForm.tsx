import React, { FormEvent, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { PrimaryButton } from "../../buttons";
import CountrySelectorComp from "../../inputs/CountrySelector";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";

interface IFormState {
	fullName: string;
	country: string;
}
const FreePurchaseForm = (props?: { reason: "course" | "workshop" }) => {
	const { reason } = props || {};
	const user = useSelector(currentUser);
	const initialState: IFormState = {
		fullName: "",
		country: "",
	};
	const [state, setState] = useState<IFormState>(initialState);
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-md grid gap-4">
			<div className="">
				<label htmlFor="name" className="text-xs">
					Name
				</label>
				<CustomTextInput
					id="name"
					placeholder="Name"
					className="text-sm"
					value={user?.name}
					containerProps={{ className: "border border-[#094B10]" }}
				/>
			</div>
			<div className="">
				<label htmlFor="country" className="text-xs">
					Country
				</label>
				<CountrySelectorComp
					id="country"
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
			</div>
			<div className="flex sm:flex-row flex-col justify-between gap-2 sm:gap-6 items-start sm:items-center max-w-sm">
				<PrimaryButton
					title="Proceed"
					className="p-4 px-8 sm:order-first order-last w-full justify-center flex"
				/>
				<span className="flex gap-3 items-center select-none">
					<p className="text-sm">
						Send me notifications for this {reason}
					</p>
					<span className="flex justify-center items-center border border-[#70C5A1] p-2 rounded-full cursor-pointer"></span>
				</span>
			</div>
		</form>
	);
};

export default FreePurchaseForm;
