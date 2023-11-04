/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IUserPaymentCard } from "../../../../../interfaces/user.interface";

const PaymentCard = (card: IUserPaymentCard) => {
	return (
		<>
			{/* <div className="overflow-hidden relative p-[2px] group"> */}
			{/* <div className="bg-gradient-to-r from-[#70C5A18A] to-[#70C5A1] p-[1px]  group-hover:animate-[wiggle_3s_linear_infinite] duration-300 absolute top-0 left-0 w-[200%] h-full -z-10" /> */}
			<div className="flex flex-col gap-5 bg-white shadow hover:shadow-lg h-[165px] duration-300 animate__animated animate__fadeInUp">
				<div className="h-12 bg-[#70C5A1] w-full text-white flex items-center justify-between p-3">
					<div className="flex items-center justify-start gap-3">
						<div className="cursor-pointer">Edit</div>
						<div className="cursor-pointer text-black hover:text-rose-500 duration-300">
							Delete
						</div>
					</div>
					<div className="border border-white p-2.5 cursor-pointer"></div>
				</div>
				<div className="grid gap-1 px-5">
					<p className="font-medium text-lg">{card.card_number}</p>
					<div className="flex items-center justify-between">
						<div className="">
							<p className="text-sm text-[#B1B1B1]">
								{card.card_name}
							</p>
							<p className="text-xs text-[#B1B1B1]">
								{card.bank.name}
							</p>
						</div>
						<div className="">
							<svg
								width="23"
								height="14"
								viewBox="0 0 23 14"
								fill="none">
								<circle cx="7" cy="7" r="7" fill="#F15E63" />
								<circle cx="16" cy="7" r="7" fill="#FFB100" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M11.5 12.3619C13.0284 11.0778 14 9.15225 14 6.99979C14 4.84732 13.0284 2.92175 11.5 1.6377C9.97156 2.92175 9 4.84732 9 6.99979C9 9.15225 9.97156 11.0778 11.5 12.3619Z"
									fill="#FF7A00"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};

export default PaymentCard;
