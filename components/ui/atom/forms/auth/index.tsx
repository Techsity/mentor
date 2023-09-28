import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { MentorLogoDark } from "../../icons/svgs";

const AuthForm = ({ pageKey }: { pageKey: "login" | "signup" }) => {
	const [currentForm, setCurrentForm] = useState<"login" | "signup">(pageKey);

	useEffect(() => {
		setCurrentForm(pageKey);
		return () => setCurrentForm(pageKey);
	}, [pageKey]);

	return (
		<div className="md:p-10 lg:p-8 w-full max-w-lg">
			{currentForm === "login" ? (
				<div className="animate__animated animate__bounceIn">
					<h1
						style={{ fontFamily: "Days One" }}
						className="text-2xl md:text-3xl text-[#00D569]"
					>
						Welcome Back
					</h1>
					<p className="font-[300] my-3">
						Continue your journey to endless illumination
					</p>
				</div>
			) : (
				<div className="animate__animated animate__bounceIn">
					<h1
						style={{ fontFamily: "Days One" }}
						className="text-2xl md:text-3xl text-[#00D569]"
					>
						Join
					</h1>
					<p className="font-[300] my-3">
						<MentorLogoDark height="50px" width="130px" />
					</p>
				</div>
			)}
			<div className="flex select-none items-center md:gap-[1px] mt-5">
				<div
					onClick={() => setCurrentForm("signup")}
					className={`animate__animated animate__slideInLeft border-[#A3A6A7] border md:border-r-transparent duration-300 px-10 p-3 cursor-pointer ${
						currentForm === "signup"
							? "bg-[#A3A6A7] text-white"
							: "hover:bg-[#A3A6A7] hover:text-white text-[#A3A6A7]"
					}`}
					style={{ fontFamily: "Days One" }}
				>
					SignUp
				</div>
				<div
					onClick={() => setCurrentForm("login")}
					className={`animate__animated animate__slideInRight border-[#A3A6A7] border md:border-l-transparent duration-300 px-10 p-3 cursor-pointer ${
						currentForm === "login"
							? "bg-[#A3A6A7] text-white"
							: "hover:bg-[#A3A6A7] hover:text-white text-[#A3A6A7]"
					}`}
					style={{ fontFamily: "Days One" }}
				>
					Login
				</div>
			</div>
			<div className="mt-10 w-full">
				<div className={currentForm === "login" ? "" : "hidden"}>
					<LoginForm />
				</div>
				<div className={currentForm === "signup" ? "" : "hidden"}>
					<SignUpForm />
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
