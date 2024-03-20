import React, { ChangeEvent, FormEvent, useCallback, useId, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { PrimaryButton } from "../../buttons";
import CountrySelectorComp from "../../inputs/CountrySelector";
import { useSelector } from "react-redux";
import { currentUser, updateUserProfile } from "../../../../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE_TO_FREE_WORKSHOP } from "../../../../../services/graphql/mutations/workshop";
import { Subscription } from "../../../../../interfaces/user.interface";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { formatGqlError } from "../../../../../utils/auth";
import ResponseMessages from "../../../../../constants/response-codes";
import { useRouter } from "next/router";

interface IFormState {
	fullName: string;
	country: string;
	sendEmailNotififications: boolean;
}
const FreePurchaseForm = (props: { reason: "course" | "workshop"; resourceId: string }) => {
	const router = useRouter();
	const toastId = useId();
	const { reason, resourceId } = props;
	const user = useSelector(currentUser);
	const dispatch = useDispatch();
	const [subscribeToFreeWorkshop, { loading }] = useMutation<
		{ subscribeToWorkshop: Subscription },
		{ workshopId: string }
	>(SUBSCRIBE_TO_FREE_WORKSHOP);

	const initialState: IFormState = {
		fullName: String(user?.name),
		country: String(user?.country),
		sendEmailNotififications: false,
	};

	const [state, setState] = useState<IFormState>(initialState);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (reason === "workshop") {
				// console.log({ state });
				const { data } = await subscribeToFreeWorkshop({ variables: { workshopId: resourceId } });
				if (data?.subscribeToWorkshop) {
					toast.success("Subscription successful.", { ...ToastDefaultOptions(), toastId });
					dispatch(
						updateUserProfile({
							...user,
							subscriptions: user?.subscriptions.concat(data?.subscribeToWorkshop),
						}),
					);
					router.replace(
						`/workshops/${resourceId}/register/success`,
						// `/workshops/${resourceId}/register/congrats`,
					);
				}
			}
		} catch (error) {
			console.error({ error });
			const errMsg = formatGqlError(error);
			if (errMsg === ResponseMessages.ALREADY_SUBSCRIBED) {
				toast.info(errMsg, { ...ToastDefaultOptions(), toastId });
				if (reason === "workshop") router.replace(`/profile/my-workshop`);
			} else
				toast.error(errMsg || "Something went wrong. Please try again.", { ...ToastDefaultOptions(), toastId });
		}
	};

	const { sendEmailNotififications } = state;

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
					value={state?.fullName}
					containerprops={{ className: "border border-[#094B10]" }}
				/>
			</div>
			<div className="">
				<label htmlFor="country" className="text-xs">
					Country
				</label>
				<CountrySelectorComp
					id="country"
					onSelect={(country) => {
						if (country?.label) setState({ ...state, country: country?.label });
					}}
					classes={{
						container: "border border-[#094B10] bg-transparent",
						input: "bg-transparent border-transparent",
					}}
					selected={state.country}
					disabled={Boolean(state.country)}
				/>
			</div>
			<div className="flex flex-col justify-between gap-2 sm:gap-6 items-start max-w-m">
				<PrimaryButton
					type="submit"
					title={!loading ? "Proceed" : ""}
					icon={loading ? <ActivityIndicator /> : <></>}
					disabled={loading}
					className="p-4 px-8 order-last w-full justify-center flex"
				/>
				<span
					onClick={() =>
						setState({
							...state,
							sendEmailNotififications: !sendEmailNotififications,
						})
					}
					className="flex gap-3 items-center select-none cursor-pointer">
					<p className="text-sm">Send me notifications for this {reason}</p>
					{/* <span className="flex justify-center items-center border border-[#70C5A1] p-2 rounded-full cursor-pointer"></span> */}
					<svg
						width="23"
						height="23"
						viewBox="0 0 23 23"
						fill="none"
						className="animate__animated animate__bounceIn">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d={
								sendEmailNotififications
									? "M1.896 17.5002C0.65979 15.6501 0 13.475 0 11.25C0 9.77261 0.291016 8.30972 0.856323 6.94479C1.42175 5.5799 2.25037 4.33969 3.29504 3.29504C4.33972 2.2504 5.57996 1.42172 6.94482 0.856354C8.30969 0.290985 9.77258 0 11.25 0C13.475 0 15.6501 0.65979 17.5001 1.89597C19.3502 3.13214 20.7921 4.88913 21.6437 6.94479C22.4951 9.00049 22.7179 11.2625 22.2838 13.4448C21.8497 15.627 20.7783 17.6316 19.205 19.205C17.6316 20.7783 15.6271 21.8497 13.4448 22.2838C11.2625 22.7179 9.00049 22.4951 6.94482 21.6436C4.88916 20.7921 3.13208 19.3502 1.896 17.5002ZM6 12.0039L9.61047 16L17 7.82111L15.3546 6L9.61047 12.3642L7.64539 10.1827L6 12.0039Z"
									: "M2.31173 17.2224L2.31174 17.2224C3.49287 18.9902 5.17186 20.368 7.13616 21.1817C9.10047 21.9953 11.2619 22.2082 13.3473 21.7935C15.4325 21.3786 17.348 20.3548 18.8514 18.8514C20.3548 17.348 21.3786 15.4325 21.7934 13.3472C22.2082 11.2619 21.9953 9.10046 21.1817 7.13612C20.368 5.17182 18.9902 3.49293 17.2223 2.3117L17.2223 2.31169C15.4546 1.13047 13.3761 0.5 11.25 0.5C9.83824 0.5 8.44037 0.778053 7.13617 1.31829C5.83196 1.85853 4.64684 2.65038 3.64859 3.6486C2.65037 4.6468 1.85858 5.83187 1.31827 7.13612L2.31173 17.2224ZM2.31173 17.2224C1.13047 15.4546 0.5 13.3761 0.5 11.25M2.31173 17.2224L0.5 11.25M0.5 11.25C0.5 9.83829 0.778075 8.44043 1.31825 7.13616L0.5 11.25Z"
							}
							stroke={sendEmailNotififications ? "none" : "#70C5A1"}
							fill={sendEmailNotififications ? "#70C5A1" : "none"}
						/>
					</svg>
				</span>
			</div>
		</form>
	);
};

export default FreePurchaseForm;
