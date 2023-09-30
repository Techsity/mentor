import React, { Dispatch, SetStateAction } from "react";
import { MentorLogoDark } from "../../atom/icons/svgs";

const LoginAndSignupFormHeader = ({
	currentForm,
	setCurrentForm,
}: {
	currentForm: "login" | "signup";
	setCurrentForm: Dispatch<SetStateAction<"login" | "signup">>;
}) => {
	return (
		<>
			{currentForm === "login" ? (
				<div className="animate__animated animate__bounceIn z-30 relative">
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
				<div className="animate__animated animate__bounceIn flex items-center gap-2">
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
			<div className="flex select-none items-center md:gap-[1px] mt-5 animate__animated animate__slideIn z-30 relative">
				<div
					onClick={() => setCurrentForm("signup")}
					className={`border-[#A3A6A7] border md:border-r-transparent duration-300 px-10 p-3 cursor-pointer ${
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
					className={` border-[#A3A6A7] border md:border-l-transparent duration-300 px-10 p-3 cursor-pointer ${
						currentForm === "login"
							? "bg-[#A3A6A7] text-white"
							: "hover:bg-[#A3A6A7] hover:text-white text-[#A3A6A7]"
					}`}
					style={{ fontFamily: "Days One" }}
				>
					Login
				</div>
			</div>
		</>
	);
};

export default LoginAndSignupFormHeader;
