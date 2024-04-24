import React, { ChangeEvent, FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../../../interfaces/user.interface";
import CountrySelectorComp from "../../../atom/inputs/CountrySelector";
import { PrimaryButton } from "../../../atom/buttons";
import * as FlagIcons from "react-country-flags-select";
import countries from "../../../../../data/countries";
import ActivityIndicator from "../../../atom/loader/ActivityIndicator";
import { toast } from "react-toastify";
import { currentUser, updateUserProfile } from "../../../../../redux/reducers/auth/authSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../../../../../services/graphql/mutations/user";
import { activeProfile } from "../../../../../redux/reducers/userSlice";
import MentorProfileSettings from "./MentorProfileSettings";
import { CameraOutline } from "react-ionicons";

const phoneRegex = /^[0-9]{11}$/;

const ProfileSettings = () => {
	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	// const [state, setState] = useState<Partial<IUser>>({ ...user, phone: `+${user?.phone}` });
	const [state, setState] = useState<Partial<IUser>>({ ...user });
	const profile = useSelector(activeProfile);
	const toastId = useId();
	const [updateProfile, { loading }] = useMutation<
		{ updateUserProfile: IUser },
		{ userUpdateInput: Partial<Pick<IUser, "name" | "country" | "phone" | "avatar">> }
	>(UPDATE_USER_PROFILE);

	const imageRef = useRef<HTMLInputElement>(null);

	const stateChanged = useMemo(
		() =>
			state?.avatar?.trim() !== user?.avatar?.trim() ||
			state?.name?.trim() !== user?.name?.trim() ||
			state?.phone?.trim() !== user?.phone?.trim() ||
			state?.country?.trim() !== user?.country?.trim(),
		[state],
	);

	const stateNotEmpty = useMemo(
		() =>
			Boolean(
				state?.avatar?.trim() !== user?.avatar?.trim() ||
					state?.name?.trim() !== user?.name?.trim() ||
					state?.phone?.trim() !== user?.phone?.trim() ||
					state?.country?.trim() !== user?.country?.trim() ||
					state?.name?.trim() !== "",
			),
		[state],
	);

	const handleChange = (field: keyof IUser) => (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		// setLoading(false);
		setState({ ...state, [field]: value });
	};

	const handleUserProfileUpdate = async (e: FormEvent) => {
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
		if (state?.name?.trim().length == 0) {
			toast("Full name cannot be empty", { type: "error", toastId, theme: "light" });
			return;
		}
		if (state.country?.trim() !== user?.country.trim()) {
			if (!countries.some((c) => c.label.toLowerCase() === String(state?.country).toLowerCase()))
				return toast("Invalid country provided", { type: "error", toastId, theme: "light" });
		}
		if (stateNotEmpty) {
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
					dispatch(updateUserProfile({ ...data.updateUserProfile }));
					setState({ ...data.updateUserProfile });
					toast("Profile updated successfully", { type: "success", toastId, theme: "light" });
				}
			} catch (error) {
				console.error({ error });
				toast("An error occured. Please ty again", { type: "error", toastId });
			}
		}
	};

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

	const handleImageUpdate = (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target || {};
		if (files && files.length >= 1) {
			const image = files[0];
			if (imageRef.current) {
				const imageUrl = URL.createObjectURL(image);
				imageRef.current.src = imageUrl;
				setState((p) => {
					return { ...p, avatar: imageUrl };
				});
			}
		}
	};

	return (
		<div className="min-h-screen">
			<>
				<h1 className="capitalize mb-4 font-semibold">Basic Information</h1>
				<div
					className="text-sm rounded-full w-32 h-32 cursor-pointer overflow-hidden relative group my-3"
					onClick={() => imageRef.current?.click()}>
					<div className="duration-300 hidden group-hover:bg-black/50 absolute top-0 left-0 w-full h-full animate__animated animate__fadeIn animate__faster group-hover:flex justify-center items-center">
						<CameraOutline color="#fff" />
					</div>
					<img
						src={state.avatar || "/assets/images/avatar.png"}
						alt="avatar"
						className="h-full w-full object-cover"
					/>
					<input
						type="file"
						multiple={false}
						max={1}
						accept="image/*"
						hidden
						ref={imageRef}
						onChange={handleImageUpdate}
					/>
				</div>
				<form onSubmit={handleUserProfileUpdate} className="grid gap-6 2xl:max-w-xl text-sm">
					<div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 2xl:gap-3">
						<div className="flex flex-col gap-1">
							<label className="w-full text-[#BEBEBE] text-sm" htmlFor="fullName">
								Full Name
							</label>
							<CustomTextInput
								value={state?.name}
								onChange={handleChange("name")}
								name=""
								className="p-2 border"
								placeholder=""
								containerprops={{
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
								containerprops={{
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
									if (country?.label) setState({ ...state, country: country.label });
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
								disabled
								name="phone"
								type="number"
								value={(state.phone && state.phone.trim()) || ""}
								onChange={handleChange("phone")}
								inputMode="numeric"
								required={true}
								title="Please enter a valid phone number"
								className="p-2 border"
								containerprops={{ className: "border-[#094B10] border" }}
							/>
						</div>
					</div>
					<div className="flex justify-start items-start flex-col gap-3">
						<PrimaryButton
							type="submit"
							title={loading ? "" : "Update"}
							icon={loading ? <ActivityIndicator /> : null}
							disabled={loading || !stateChanged}
							className="p-3 flex justify-center px-12 w-full"
						/>
					</div>
				</form>{" "}
			</>
			{user?.is_mentor && profile === "mentor" && (
				<div className="mt-4 -scroll-mt-20" id="mentor">
					<MentorProfileSettings />
				</div>
			)}
		</div>
	);
};

export default ProfileSettings;
