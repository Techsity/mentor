import { ToastOptions } from "react-toastify";

interface ToastId {
	// pass all toast id here
	forgot_password_pop: string;
	signup_form_pop: string;
	onboarding_interest_pop: string;
}
// interface ICustomToastProps extends ToastOptions<Omit<key = "">> {
interface ICustomToastProps extends ToastOptions {
	id: keyof ToastId;
}

export const ToastDefaultOptions = ({
	id,
	...rest
}: ICustomToastProps): ToastOptions => {
	return {
		autoClose: 5000,
		closeOnClick: true,
		draggable: true,
		position: "top-right",
		hideProgressBar: true,
		theme: "light",
		toastId: id,
		...rest,
	};
};
