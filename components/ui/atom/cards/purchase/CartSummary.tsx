import React from "react";
import { calculateTax } from "../../../../../utils";
import { ICourse } from "../../../../../interfaces";

const CartSummary = ({
	price,
	reason = "course",
	tax,
	currrency,
}: {
	price: ICourse["price"];
	reason?: "workshop" | "course";
	tax: number;
	currrency: string;
}) => {
	// const tax = price !== 0 ? calculateTax(price, 7.5) : 0;
	return (
		<div className="lg:px-20 sm:px-12 p-4 h-full py-10 md:py-20 w-full text-sm">
			<div className="flex items-start flex-col w-full">
				<h1 className="text-black font-thin text-xl md:text-2xl" style={{ fontFamily: "Days One" }}>
					Cart Summary
				</h1>
				<div className="grid gap-5 w-full mt-3 max-w-sm capitalize">
					<span className="capitalize flex items-center justify-between">
						{reason} fee{" "}
						{price !== 0 ? (
							<span className="">
								{currrency || "$"}
								{Number(price.toFixed(2)).toLocaleString()}
							</span>
						) : (
							<span>{currrency || "$"}0</span>
						)}
					</span>
					<span className="flex items-center justify-between">
						Payable Tax (VAT)
						{price !== 0 ? (
							<span className="">
								{currrency || "$"}
								{tax ? Number(tax.toFixed(2)).toLocaleString() : null}
							</span>
						) : (
							<span>{currrency || "$"}0</span>
						)}
					</span>
					<span className="flex items-center justify-between pt-5 border-t-2 border-[#ccc]">
						Total
						{price !== 0 ? (
							<span className="">
								{currrency || "$"}
								{tax ? Number((price + tax).toFixed(2)).toLocaleString() : null}
							</span>
						) : (
							<span>{currrency || "$"}0</span>
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartSummary;
