import React, { FormEvent, useState } from "react";
import { PrimaryButton } from "../../../ui/atom/buttons";
import CustomTextInput from "../../../ui/atom/inputs";
import ForgotPasswordForm from "../../../ui/atom/forms/auth/ForgotPasswordForm";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { isEmail } from "../../../../utils";
import { IForgotPasswordState } from "../../../../interfaces/auth.interface";

const ForgotPasswordTemplate = () => {
	const router = useRouter();

	const [state, setState] = useState<IForgotPasswordState>({
		email: "",
		error: "",
		loading: false,
	});

	const { email } = state;

	const handleSubmit = async (e?: FormEvent) => {
		e?.preventDefault();
		setState({ ...state, error: "", loading: true });
		// toast.dismiss("forgot_password_pop");
		if (email) {
			if (isEmail(email)) {
				const hashedToken = "toendjsdhjkjckenwd"; // auth token gotten from the server
				// store the token in cookies
				// cookies.store(hashedToken)
				// redirect to verification page
				setTimeout(function () {
					router.push(`/auth/verification/${hashedToken}/reset-password`);
				}, 2000);
			} else {
				setState({ ...state, loading: false });
				setState({ ...state, error: "Please enter a valid email" });
				toast.error("Please enter a valid email", {
					autoClose: 5000,
					closeOnClick: true,
					draggable: true,
					position: "top-right",
					hideProgressBar: true,
					theme: "colored",
					toastId: "forgot_password_pop",
				});
			}
		} else {
			setState({ ...state, loading: false });
			setState({ ...state, error: "Please enter a valid email" });
			toast.error("Please enter a valid email", {
				autoClose: 5000,
				closeOnClick: true,
				draggable: true,
				position: "top-right",
				hideProgressBar: true,
				theme: "colored",
				toastId: "forgot_password_pop",
			});
		}
	};
	return (
		<div className="min-h-[80vh] flex justify-center pt-20 sm:mt-24 relative px-5 md:px-24">
			<ForgotPasswordForm
				state={state}
				handleSubmit={handleSubmit}
				setState={setState}
			/>
		</div>
	);
};

export default ForgotPasswordTemplate;
