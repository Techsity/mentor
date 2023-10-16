import { ToastOptions } from "react-toastify";

interface ToastId {
	// pass all toast id here
	forgot_password_pop: string;
	auth_form_pop: string;
	onboarding_interest_pop: string;
	consultation_time_error: string;
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

// toast(
// 	<div className="grid gap-6 select-none items-center">
// 		Invalid email
// 		<div className="flex gap-5">
// 			<span
// 				style={{ cursor: "pointer" }}
// 				onClick={() => toast.dismiss("message_pop")}>
// 				Close
// 			</span>
// 			<span style={{ cursor: "pointer" }}>Done</span>
// 		</div>
// 	</div>,
// 	{
// 		autoClose: false,
// 		closeOnClick: false,
// 		hideProgressBar: true,
// 		draggable: false,
// 		// closeButton: false,
// 		toastId: "message_pop",
// 	},
// );
