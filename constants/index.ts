import { ToastOptions } from "react-toastify";
import { ISOCurrency } from "../interfaces";

interface ToastId {
	// pass all toast id here
	forgot_password_pop: string;
	auth_form_pop: string;
	onboarding_interest_pop: string;
	consultation_time_error: string;
	success: string;
	error: string;
	info: string;
	warning: string;
}
// interface ICustomToastProps extends ToastOptions<Omit<key = "">> {
interface ICustomToastProps extends ToastOptions {
	id: keyof ToastId | "";
}
export const ToastDefaultOptions = (props?: ICustomToastProps): ToastOptions => {
	const { id, ...rest } = props || {};
	return {
		autoClose: 5000,
		closeOnClick: true,
		draggable: true,
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

export const AUTH_TOKEN_KEY = "authToken";
export const networkLabels: { [key: number]: { message: string; color: string } } = {
	0: { message: "Unknown", color: "#d31119" },
	1: { message: "Excellent", color: "#00AD74" },
	2: { message: "Good", color: "#00AD74" },
	3: { message: "Poor", color: "orange" },
	4: { message: "Bad", color: "#d311195A" },
	5: { message: "Very Bad", color: "#d31119" },
	6: { message: "No Connection", color: "#d31119" },
};

export const daysOfTheWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const supportedCurrencies: { name: ISOCurrency; symbol: string }[] = [
	{ name: "USD", symbol: "$" },
	{ name: "NGN", symbol: "₦" },
	{ name: "GHS", symbol: "₵" },
	{ name: "ZAR", symbol: "R" },
	{ name: "KES", symbol: "KSh" },
];
