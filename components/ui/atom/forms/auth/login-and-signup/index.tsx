import React, { FormEvent, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./signup";
import LoginAndSignupFormHeader from "../../../../organisms/auth/LoginAndSignupFormHeader";
import Link from "next/link";
import { GoogleIconSvg } from "../../../icons/svgs";
import { ISignUpState } from "../../../../../../interfaces/auth.interface";
import { useRouter } from "next/router";

const LoginAndSignupForm = ({ pageKey }: { pageKey: "login" | "signup" }) => {
	const router = useRouter();
	const [currentForm, setCurrentForm] = useState<"login" | "signup">(pageKey);

	useEffect(() => {
		setCurrentForm(pageKey);
		return () => setCurrentForm("signup");
	}, [pageKey]);

	const handleSignUpFormSubmit = (state: ISignUpState) => {
		console.log(state);
		setTimeout(function () {
			router.push(`/auth/verification/${"jwt_token"}/signup`);
		}, 2000);
	};

	return (
		<div className="w-full max-w-lg pt-3">
			<LoginAndSignupFormHeader
				currentForm={currentForm}
				setCurrentForm={setCurrentForm}
			/>
			<div className="mt-6 w-full">
				<div className={currentForm === "login" ? "" : "hidden"}>
					<LoginForm />
				</div>
				<div className={currentForm === "signup" ? "" : "hidden"}>
					<SignUpForm onSubmit={handleSignUpFormSubmit} />
				</div>
				<div className="mt-6 items-center animate__animated animate__fadeInUp flex md:flex-row flex-col gap-5">
					<h1 className="">
						-or sign {currentForm === "signup" ? "up" : "in"} with-
					</h1>
					<Link
						href={
							currentForm === "login" ? "#google_auth_login" : "#google_auth_signup"
						}
					>
						<div className="cursor-pointer">
							<GoogleIconSvg />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginAndSignupForm;
