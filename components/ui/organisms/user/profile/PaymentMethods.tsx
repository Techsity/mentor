import React, { useState } from "react";
import PaymentCard from "../../../atom/common/user/PaymentCard";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/auth/authSlice";
import AddPaymentMethodForm from "../../../atom/forms/profile/AddPaymentMethodForm";

const PaymentMethods = () => {
	const user = useSelector(currentUser);

	return (
		<div className="">
			{user?.mentor ? (
				<MentorPayments />
			) : (
				<div className="flex flex-col md:flex-row gap-6 2xl:gap-10 justify-between items-start animate__animated animate__fadeInUp overflow-hidden pb-20">
					<div className="xl:w-[35%] w-full">
						<h1 className="text-[#A3A6A7] font-medium mb-5">My Payment Method</h1>
						<div className="grid gap-4">
							{user?.payment_cards?.map((card, idx) => <PaymentCard key={idx} {...card} />).slice(0, 3)}
						</div>
					</div>
					<div className="flex-grow xl:max-w-[60%] w-full">
						<div className="flex items-start gap-1 flex-col">
							<div className="text-[#A3A6A7] font-medium mb-5 cursor-default">+ Add Payment Method</div>
							<div className="w-full">
								<AddPaymentMethodForm />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const MentorPayments = () => {
	type Tab = "payment-methods" | "my-payments";
	const user = useSelector(currentUser);
	const tabs: Tab[] = ["payment-methods", "my-payments"];

	const [activetab, setActivetab] = useState<Tab>(tabs[0]);
	return (
		<div className="flex flex-col xl:flex-row gap-6 2xl:gap-10 justify-between items-start animate__animated animate__fadeInUp overflow-hidden pb-20">
			<div className="xl:max-w-[45%] w-full">
				<div className="flex tracking-tight items-center select-none gap-2 max-w-lg">
					{tabs?.map((tab, i) => {
						return (
							<div
								key={i}
								className={`capitalize text-xs sm:text-sm duration-300 border border-[#094B10] text-[#094B10] px-5 sm:px-8 p-3 cursor-pointer w-full ${
									activetab === tab
										? "bg-[#094B10] text-white"
										: "hover:text-[#fff] hover:bg-[#094B10]"
								}`}
								style={{ fontFamily: "Days One" }}
								onClick={() => setActivetab(tab)}>
								{tab.split("-").join(" ")}
							</div>
						);
					})}
				</div>
				<div className="grid xl:grid-cols-1 md:grid-cols-2 gap-4 mt-5">
					{user?.payment_cards?.map((card, idx) => <PaymentCard key={idx} {...card} />).slice(0, 3)}
				</div>
			</div>
			<div className="flex-grow xl:max-w-[60%] w-full">
				<div className="flex items-start gap-1 flex-col">
					<div className="text-[#A3A6A7] font-medium mb-5 cursor-default">+ Add Payment Method</div>
					<div className="w-full">
						<AddPaymentMethodForm />
					</div>
				</div>
			</div>
		</div>
	);
};
export default PaymentMethods;
