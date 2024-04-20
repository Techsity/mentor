import Link from "next/link";
import React, { FormEvent, memo, useState } from "react";
import { toast } from "react-toastify";

const NewsLetterForm = ({ handleSubmit }: { handleSubmit: (email: string) => void }) => {
	const [email, setEmail] = useState<string>("");
	const next = (e: FormEvent) => {
		e.preventDefault();
		if (email) {
			handleSubmit(email);
			setEmail("");
			toast.success("We'll send you an email shortly to confirm your subscription");
			// Todo: api implementation
		}
	};
	return (
		<form
			onSubmit={next}
			className="flex relative mx-auto min-w-[40vw] justify-between items-center border border-[#FFB100] p-2">
			<input
				type="email"
				required
				name="waitlist-input-email"
				id="waitlist-input-email"
				className="h-full w-full bg-transparent p-3 flex-grow focus:ring-0 outline-none border-none placeholder:italic placeholder:font-[300] text-[#2D3D43] placeholder:text-[#2D3D43]"
				placeholder="Your email..."
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div
				onClick={() => (email ? handleSubmit(email) : null)}
				className="bg-[#094B10] select-none p-3 px-6 cursor-pointer text-white duration-300 hover:bg-[#052909]">
				Subscribe
			</div>
		</form>
	);
};

export default memo(NewsLetterForm);
