import React, { ChangeEvent, FormEvent, useState } from "react";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/features/authSlice";
import { IUser } from "../../../../../interfaces/user.interface";
import CountrySelectorComp from "../../../atom/inputs/CountrySelector";
import { PrimaryButton } from "../../../atom/buttons";
import * as FlagIcons from "react-country-flags-select";
import countries from "../../../../../data/countries";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";

const ProfileSettings = () => {
	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	const [state, setState] = useState<IUser>(user as IUser);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange =
		(field: keyof IUser) => (e: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setLoading(false);
			setState({ ...state, [field]: value });
		};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	const country: string = countries.find((c) => c.label === state.country)
		?.countryCode as string;

	interface IconType {
		[key: string]: React.ElementType;
	}
	const IconComponent: IconType = FlagIcons;
	const IconComp: any = country ? (
		IconComponent[
			country.charAt(0).toUpperCase() + country.charAt(1).toLowerCase()
		]
	) : (
		<></>
	);

	return (
		<div className="min-h-screen">
			<form onSubmit={handleSubmit} className="grid gap-6 2xl:max-w-md">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="flex flex-col gap-1">
						<label
							className="w-full text-[#BEBEBE] text-sm"
							htmlFor="fullName">
							FullName
						</label>
						<CustomTextInput
							value={state?.name}
							onChange={handleChange("name")}
							name=""
							className="p-2 border"
							placeholder=""
							containerProps={{
								className: "border-[#094B10] border",
							}}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							className="w-full text-[#BEBEBE] text-sm"
							htmlFor="email">
							Email
						</label>
						<CustomTextInput
							value={state?.email}
							onChange={handleChange("email")}
							name="email"
							className="p-2 border"
							placeholder=""
							containerProps={{
								className: "border-[#094B10] border",
							}}
						/>
					</div>
					<div className="">
						<label
							className="w-full text-[#BEBEBE] text-sm"
							htmlFor="country">
							Country
						</label>
						<CountrySelectorComp
							selected={state.country}
							onSelect={(country) => {
								if (country?.label)
									setState({
										...state,
										country: country.label,
									});
							}}
							classes={{
								input: "bg-transparent border border-[#094B10] p-3",
								container: "border border-[#094B10] p-[2px]",
							}}
							customIcon={
								IconComp ? (
									<IconComp width="25px" height="25px" />
								) : null
							}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							className="w-full text-[#BEBEBE] text-sm"
							htmlFor="phone">
							Phone Number
						</label>
						<CustomTextInput
							name="phone"
							type="tel"
							pattern="/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/"
							value={"+234 " + state.phone.trim()}
							onChange={handleChange("phone")}
							inputMode="numeric"
							required={true}
							title="Please enter a valid phone number"
							className="p-2 border"
							containerProps={{
								className: "border-[#094B10] border",
							}}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className="w-full text-[#BEBEBE] text-sm"
							htmlFor="oldPassword">
							Change Password
						</label>
						<div className="space-y-2">
							<CustomTextInput
								// value={}
								// onChange={handleChange("email")}
								name="oldPassword"
								className="p-2 border placeholder:text-black placeholder:text-sm"
								placeholder="Old Password"
								type="password"
								containerProps={{
									className: "border-[#094B10] border",
								}}
							/>
							<CustomTextInput
								// value={}
								// onChange={handleChange("email")}
								name="newPassword"
								className="p-2 border placeholder:text-black placeholder:text-sm"
								placeholder="New Password"
								type="password"
								containerProps={{
									className: "border-[#094B10] border",
								}}
							/>
							<CustomTextInput
								// value={}
								// onChange={handleChange("email")}
								name="confirmPassword"
								className="p-2 border placeholder:text-black placeholder:text-sm"
								placeholder="Confirm Password"
								type="password"
								containerProps={{
									className: "border-[#094B10] border",
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-start items-start">
					<PrimaryButton
						type="submit"
						title={loading ? "" : "Update"}
						icon={loading ? <ActivityIndicator /> : null}
						disabled={loading}
						className="p-4 flex justify-center px-12 w-full text-lg"
					/>
				</div>
			</form>
		</div>
	);
};

export default ProfileSettings;
