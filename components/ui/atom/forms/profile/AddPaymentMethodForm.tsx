import React, { ChangeEvent, FormEvent, useState } from "react";
import CustomTextInput from "../../inputs/CustomTextInput";
import { PrimaryButton } from "../../buttons";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { currentUser, updateUser } from "../../../../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IUserPaymentCard } from "../../../../../interfaces/user.interface";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../../constants";
import { Select } from "../../inputs/Select";

interface NewCardState extends IUserPaymentCard {
	cvv: string;
	cardPin: string;
	expiry: string;
	bankName: string;
}
const AddPaymentMethodForm = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const user = useSelector(currentUser);
	const initialState: NewCardState = {
		bank: { name: "" },
		card_name: "",
		card_number: "",
		bankName: "",
		cardPin: "",
		cvv: "",
		expiry: "",
	};
	const [newPaymentCard, setNewPaymentCard] = useState<NewCardState>(initialState);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setNewPaymentCard({
			...newPaymentCard,
			[name]: value,
		});
	};

	const addCard = (e: FormEvent) => {
		e.preventDefault();
		if (newPaymentCard) {
			if (user && user?.payment_cards) {
				if (user?.payment_cards?.length < 3) {
					const updatedUser = {
						...user,
						payment_cards: [...(user.payment_cards || []), newPaymentCard],
					};
					dispatch(updateUser(updatedUser));
				} else {
					toast.error("Cards Limit reached!", ToastDefaultOptions({ id: "error", theme: "dark" }));
				}
			}
		}
	};
	const formatCardNumber = (value: string) => {
		const numericValue = value.replace(/\D/g, "");
		const formattedValue = numericValue.replace(/(\d{4})/g, "$1-").trim();
		return formattedValue;
	};
	const banks = ["Bank A", "Bank B", "Bank C", "Bank D", "Bank E"];
	return (
		<form onSubmit={addCard} className="bg-white shadow rounded-3xl w-full grid gap-3 p-8">
			<h1 className="font-[300] text-sm">Enter Card Info</h1>
			<Select<string>
				newClassName="relative border-[#70C5A1] border flex items-center w-full bg-white p-4 appearance-none"
				data={banks}
				label={newPaymentCard.bank.name || ""}
				handleSelected={(val) => {
					setNewPaymentCard({
						...newPaymentCard,
						bank: { name: val },
					});
				}}
			/>
			<div className="">
				<CustomTextInput
					type="text"
					className="text-sm placeholder:font-[300]"
					disabled={loading}
					required
					value={formatCardNumber(newPaymentCard.card_number)}
					onChange={handleChange}
					name="card_number"
					placeholder="Card Number"
					min={15}
					// max={15}
					title="Please enter a valid card number"
				/>
			</div>
			<div className="">
				<CustomTextInput
					className="text-sm placeholder:font-[300]"
					disabled={loading}
					required
					type="text"
					value={newPaymentCard.card_name}
					onChange={handleChange}
					name="card_name"
					placeholder="Card Name"
				/>
			</div>
			<div className="flex justify-between gap-3 items-center">
				<CustomTextInput
					type="date"
					className="text-sm placeholder:font-[300]"
					value={newPaymentCard.expiry}
					onChange={handleChange}
					name="expiry"
					disabled={loading}
					required
					title="Please enter a valid card expiry (MM/YY)"
					min={`${new Date().toDateString()}`}
				/>
				<CustomTextInput
					className="text-sm placeholder:font-[300]"
					disabled={loading}
					required
					placeholder="CVV"
					value={newPaymentCard.cvv}
					onChange={handleChange}
					name="cvv"
					type="password"
					inputMode="numeric"
					max={3}
					maxLength={3}
				/>
			</div>
			<div className="">
				<CustomTextInput
					className="text-sm placeholder:font-[300]"
					disabled={loading}
					required
					placeholder="Card Pin"
					value={newPaymentCard.cardPin}
					onChange={handleChange}
					name="cardPin"
					max={4}
					maxLength={4}
					inputMode="numeric"
					type="password"
				/>
			</div>
			<div className="flex items-start">
				<PrimaryButton
					type="submit"
					title={loading ? "" : "Continue"}
					icon={loading ? <ActivityIndicator /> : null}
					className="flex w-full p-4 justify-center"
					disabled={loading}
				/>
			</div>
		</form>
	);
};

export default AddPaymentMethodForm;
