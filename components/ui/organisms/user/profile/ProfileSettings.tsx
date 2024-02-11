import React, { ChangeEvent, FormEvent, useEffect, useId, useState } from "react";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../../../interfaces/user.interface";
import CountrySelectorComp from "../../../atom/inputs/CountrySelector";
import { PrimaryButton } from "../../../atom/buttons";
import * as FlagIcons from "react-country-flags-select";
import countries from "../../../../../data/countries";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { toast } from "react-toastify";
import { currentUser, updateUserProfile } from "../../../../../redux/reducers/authSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../../../../../services/graphql/mutations/user";

const phoneRegex = /^[0-9]{11}$/;

const ProfileSettings = () => {
	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	const [state, setState] = useState<Partial<IUser>>({ ...user });
	// const [loading, setLoading] = useState<boolean>(false);
	const toastId = useId();
	const [updateProfile, { loading }] = useMutation<
		{ updateUserProfile: IUser },
		{ userUpdateInput: Partial<Pick<IUser, "name" | "country" | "phone" | "avatar">> }
	>(UPDATE_USER_PROFILE);

	const handleChange = (field: keyof IUser) => (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		// setLoading(false);
		setState({ ...state, [field]: value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// setLoading(true);
		if (state.phone !== user?.phone) {
			if (!phoneRegex.test(String(state.phone))) {
				// Todo: send otp to confirm new phone number
				toast("Invalid phone number. Please enter your 11-digits phone number", {
					type: "error",
					toastId,
					theme: "light",
				});
				return;
			}
		}
		if (
			state?.avatar?.trim() !== user?.avatar?.trim() ||
			state?.name?.trim() !== user?.name?.trim() ||
			state?.phone?.trim() !== user?.phone?.trim() ||
			state?.country?.trim() !== user?.country?.trim()
		) {
			try {
				// update profile mutation
				const { data, errors } = await updateProfile({
					variables: {
						userUpdateInput: {
							avatar: state.avatar,
							country: state.country,
							name: state.name,
							phone: state.phone,
						},
					},
				});
				if (errors) {
					console.error("Error updating profile: ", errors);
					toast("Network Error. Please try again.", { type: "error", toastId });
				}
				if (data) {
					dispatch(
						updateUserProfile({
							...data.updateUserProfile,
						}),
					);
					setState({ ...data.updateUserProfile });
					toast("Profile updated successfully", { type: "success", toastId, theme: "light" });
				}
			} catch (error) {
				console.error({ error });
				toast("An error occured. Please ty again", { type: "error", toastId });
			}
		}
	};

	useEffect(() => {
		setState({ ...user });
	}, [user]);

	const country: string =
		state.country && state.country !== "null"
			? (countries.find((c) => c.label === state.country)?.countryCode as string)
			: "";

	interface IconType {
		[key: string]: React.ElementType;
	}
	const IconComponent: IconType = FlagIcons;
	const IconComp: any = country ? (
		IconComponent[country.charAt(0).toUpperCase() + country.charAt(1).toLowerCase()]
	) : (
		<></>
	);

	return (
		<div className="min-h-screen">
			<form onSubmit={handleSubmit} className="grid gap-6 2xl:max-w-xl">
				<div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 2xl:gap-3">
					<div className="flex flex-col gap-1">
						<label className="w-full text-[#BEBEBE] text-sm" htmlFor="fullName">
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
						<label className="w-full text-[#BEBEBE] text-sm" htmlFor="email">
							Email
						</label>
						<CustomTextInput
							value={state?.email}
							onChange={handleChange("email")}
							name="email"
							className="p-2 border"
							placeholder=""
							disabled
							readOnly
							containerProps={{
								className: "border-[#094B10] border",
							}}
						/>
					</div>
					<div className="">
						<label className="w-full text-[#BEBEBE] text-sm" htmlFor="country">
							Country
						</label>
						<CountrySelectorComp
							selected={state.country && state.country !== "null" ? state.country : null}
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
								state.country && state.country !== "null" ? (
									<IconComp width="25px" height="25px" />
								) : null
							}
						/>
					</div>
					<div className="flex flex-col gap-1 2xl:col-span-3">
						<label className="w-full text-[#BEBEBE] text-sm" htmlFor="phone">
							Phone Number
						</label>
						<CustomTextInput
							name="phone"
							type="number"
							value={(state.phone && state.phone.trim()) || ""}
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
					<div className="flex flex-col gap-2 sm:col-span-2 2xl:col-span-3 col-span-1">
						<label className="w-full text-[#BEBEBE] text-sm" htmlFor="oldPassword">
							Change Password
						</label>
						<div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center w-full">
							<CustomTextInput
								name="oldPassword"
								className="p-2 border placeholder:text-black placeholder:text-sm"
								placeholder="Old Password"
								type="password"
								readOnly
								disabled
								containerProps={{
									className: "border-[#094B10] border",
								}}
							/>
							<CustomTextInput
								name="newPassword"
								className="p-2 border placeholder:text-black placeholder:text-sm"
								placeholder="New Password"
								type="password"
								readOnly
								disabled
								containerProps={{
									className: "border-[#094B10] border",
								}}
							/>
							<CustomTextInput
								name="confirmPassword"
								className="p-2 border placeholder:text-black placeholder:text-sm"
								placeholder="Confirm New Password"
								type="password"
								readOnly
								disabled
								containerProps={{
									className: "border-[#094B10] border",
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-start items-start flex-col gap-3">
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
