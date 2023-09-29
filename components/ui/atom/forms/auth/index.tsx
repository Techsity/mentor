import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { MentorLogoDark } from "../../icons/svgs";
import AuthFormHeader from "../../../organisms/auth/AuthFormHeader";

const AuthForm = ({ pageKey }: { pageKey: "login" | "signup" }) => {
	const [currentForm, setCurrentForm] = useState<"login" | "signup">(pageKey);
	useEffect(() => {
		setCurrentForm(pageKey);
		return () => setCurrentForm(pageKey);
	}, [pageKey]);

	return (
		<div className="md:p-10 lg:p-8 w-full max-w-lg">
			<AuthFormHeader currentForm={currentForm} setCurrentForm={setCurrentForm} />
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
