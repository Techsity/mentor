import React, { useState } from "react";
import { PrimaryButton } from "../../buttons";
import ActivityIndicator from "../../loader/ActivityIndicator";
import { calculateTax } from "../../../../../utils";
import { ICourse } from "../../../../../interfaces";

const CartSummary = ({ price }: { price: ICourse["price"] }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const tax = price !== "free" ? calculateTax(price, 7.5) : price;
	return (
		<div className="lg:px-20 sm:px-12 p-4 h-full py-10 md:py-20 w-full">
			<div className="flex items-start flex-col w-full">
				<h1
					className="text-black font-thin text-2xl"
					style={{ fontFamily: "Days One" }}>
					Cart Summary
				</h1>
				<div className="grid gap-5 w-full mt-3 max-w-sm capitalize">
					<span className="flex items-center justify-between">
						Course Price
						{price !== "free" ? (
							<span className="">₦{price.toLocaleString()}</span>
						) : (
							price
						)}
					</span>
					<span className="flex items-center justify-between">
						Payable Tax (VAT)
						{price !== "free" ? (
							<span className="">
								₦{tax ? tax.toLocaleString() : null}
							</span>
						) : (
							price
						)}
					</span>
					<span className="flex items-center justify-between pt-5 border-t-2 border-[#ccc]">
						Total
						{price !== "free" ? (
							<span className="">
								₦
								{tax
									? (price + parseInt(tax)).toLocaleString()
									: null}
							</span>
						) : (
							price
						)}
					</span>

					<div className="mt-4">
						<PrimaryButton
							onClick={() => setLoading(true)}
							icon={loading ? <ActivityIndicator /> : null}
							title={loading ? "" : "Continue"}
							disabled={loading}
							className={`flex p-4 w-full justify-center`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartSummary;
