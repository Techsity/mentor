import React from "react";
import PaymentCard from "../../../atom/common/user/PaymentCard";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../../redux/reducers/authSlice";
import AddPaymentMethodForm from "../../../atom/forms/profile/AddPaymentMethodForm";

const PaymentMethods = () => {
	const user = useSelector(currentUser);

	return (
		<div className="flex flex-col md:flex-row gap-6 2xl:gap-10 justify-between items-start animate__animated animate__fadeInUp overflow-hidden pb-20">
			<div className="xl:w-[35%] w-full md:max-w-[40%]">
				<h1 className="text-[#A3A6A7] font-medium mb-5">
					My Payment Method
				</h1>
				<div className="grid gap-4">
					{user?.payment_cards
						?.map((card, idx) => (
							<PaymentCard key={idx} {...card} />
						))
						.slice(0, 3)}
				</div>
			</div>
			<div className="flex-grow xl:max-w-[60%] w-full">
				<div className="flex items-start gap-1 flex-col">
					<div className="text-[#A3A6A7] font-medium mb-5 cursor-default">
						+ Add Payment Method
					</div>
					<div className="w-full">
						<AddPaymentMethodForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethods;
