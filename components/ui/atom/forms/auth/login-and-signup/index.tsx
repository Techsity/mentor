import React, { lazy, useEffect, useState } from "react";
// import LoginForm from "./login/LoginForm";
// import SignUpForm from "./signup/SignUpForm";
import LoginAndSignupFormHeader from "../../../../organisms/auth/LoginAndSignupFormHeader";
import Link from "next/link";
import { GoogleIconSvg } from "../../../icons/svgs";
import { useRouter } from "next/router";

const SignUpForm = lazy(() => import("./signup/SignUpForm"));
const LoginForm = lazy(() => import("./login/LoginForm"));

const LoginAndSignupForm = () => {
	const router = useRouter();
	const pageKey = Object.keys(router.query)[0] as "login" | "signup";
	const [currentForm, setCurrentForm] = useState<"login" | "signup">(pageKey);

	useEffect(() => {
		if (pageKey === "signup") setCurrentForm("signup");
		else if (pageKey === "login") setCurrentForm("login");
		else {
			setCurrentForm("login");
		}
		return () => setCurrentForm("login");
	}, [pageKey]);

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
					<SignUpForm />
				</div>
				<div className="mt-6 items-center animate__animated animate__fadeInUp flex md:flex-row flex-col gap-5">
					<h1 className="">
						-or sign {currentForm === "signup" ? "up" : "in"} with-
					</h1>
					<Link
						href={
							currentForm === "login"
								? "#google_auth_login"
								: "#google_auth_signup"
						}>
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
