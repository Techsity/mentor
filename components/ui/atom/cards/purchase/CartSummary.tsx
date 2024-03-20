import React, { useState } from "react";
import { PrimaryButton } from "../../buttons";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { calculateTax } from "../../../../../utils";
import { ICourse } from "../../../../../interfaces";

const CartSummary = ({ price, reason = "course" }: { price: ICourse["price"]; reason?: "workshop" | "course" }) => {
	const [loading, setLoading] = useState<boolean>(false);
	// Todo: calculate accurate tax
	const tax = price !== 0 ? calculateTax(price, 7.5) : 0;
	return (
		<div className="lg:px-20 sm:px-12 p-4 h-full py-10 md:py-20 w-full text-sm">
			<div className="flex items-start flex-col w-full">
				<h1 className="text-black font-thin text-2xl" style={{ fontFamily: "Days One" }}>
					Cart Summary
				</h1>
				<div className="grid gap-5 w-full mt-3 max-w-sm capitalize">
					<span className="capitalize flex items-center justify-between">
						{reason} fee{" "}
						{price !== 0 ? <span className="">${price.toLocaleString()}</span> : <span>$0</span>}
					</span>
					<span className="flex items-center justify-between">
						Payable Tax (VAT)
						{price !== 0 ? <span className="">${tax ? tax.toLocaleString() : null}</span> : <span>$0</span>}
					</span>
					<span className="flex items-center justify-between pt-5 border-t-2 border-[#ccc]">
						Total
						{price !== 0 ? (
							<span className="">${tax ? (price + parseInt(tax)).toLocaleString() : null}</span>
						) : (
							<span>$0</span>
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartSummary;
