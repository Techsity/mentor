import { ToastOptions } from "react-toastify";

interface ToastId {
	// pass all toast id here
	forgot_password_pop: string;
	signup_form_pop: string;
}

export const ToastDefaultOptions = ({
	id,
}: {
	id: keyof ToastId;
}): ToastOptions => {
	return {
		autoClose: 5000,
		closeOnClick: true,
		draggable: true,
		position: "top-right",
		hideProgressBar: true,
		theme: "colored",
		toastId: id,
	};
};
