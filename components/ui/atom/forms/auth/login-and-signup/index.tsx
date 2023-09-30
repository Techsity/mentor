import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./signup";
import { MentorLogoDark } from "../../../icons/svgs";
import LoginAndSignupFormHeader from "../../../../organisms/auth/LoginAndSignupFormHeader";

const LoginAndSignupForm = ({ pageKey }: { pageKey: "login" | "signup" }) => {
	const [currentForm, setCurrentForm] = useState<"login" | "signup">(pageKey);

	useEffect(() => {
		setCurrentForm(pageKey);
		return () => setCurrentForm(pageKey);
	}, [pageKey]);

	return (
		<div className="sm:p-0 p-5 w-full max-w-lg pb-20">
			<LoginAndSignupFormHeader
				currentForm={currentForm}
				setCurrentForm={setCurrentForm}
			/>
			<div className="mt-6 w-full">
				<div className={currentForm === "login" ? "" : "hidden"}>
					<LoginForm />
				</div>
				<div className={currentForm === "signup" ? "" : "hidden"}>
					<SignUpForm
						onSubmit={(state) => {
							console.log(state);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginAndSignupForm;
