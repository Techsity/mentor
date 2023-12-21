import { AUTH_TOKEN_KEY } from "../constants";
import ResponseMessages from "../constants/response-codes";
import { logOut } from "../redux/reducers/features/authSlice";
import { store } from "../redux/store";
import Cookies from "js-cookie";

export const currentUserRole = (): "mentee" | "mentor" => {
	return "mentee";
};
export const formatGqlError = (error: any): string => {
	const resCode: keyof typeof ResponseMessages = error.message.split(" -")[0];
	const errorMessage = ResponseMessages[resCode];
	if (errorMessage) return errorMessage;
	else if (!errorMessage && error.message) return error.message;
	return "An error occured. Please try again later.";
};

export const setCookie = (key: string, value: string) => {
	if (process.browser) {
		Cookies.set(key, value, {
			expires: 1 / 24,
			// sameSite: "strict",
			// path: "/auth?login",
		});
	}
};

export const removeCookie = (key: string) => {
	if (process.browser) {
		Cookies.remove(key);
	}
};

export const getCookie = (name: string) => {
	const cookies = document.cookie.split("; ");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split("=");
		if (cookie[0] === name) {
			const cookieValue = decodeURIComponent(cookie[1]);
			return cookieValue;
		}
	}
	return null;
};

export const setLocalStorage = (key: string, value: string) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const removeLocalStorage = (key: string) => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};

export const checkAuth = () => {
	if (process.browser) {
		const token = getCookie(AUTH_TOKEN_KEY);
		if (token) {
			return token;
		} else {
			return null;
		}
	}
	return null;
};

export const checkAuthServerSide = (req: any) => {
	if (req.headers.cookie) {
		const cookies = req.headers.cookie.split("; ");
		const tokenCookie = cookies.find((cookie: string) => cookie.startsWith(AUTH_TOKEN_KEY));
		if (tokenCookie) {
			const token = tokenCookie.split("=")[1];
			return token;
		}
	}
	return null;
};

export const logoutUser = (next?: Function) => {
	store.dispatch(logOut());
	removeCookie(AUTH_TOKEN_KEY);
	removeLocalStorage(AUTH_TOKEN_KEY);
	next && next();
};

export const authenticate = async (accessToken: string, next?: Function) => {
	setCookie(AUTH_TOKEN_KEY, accessToken);
	setLocalStorage(AUTH_TOKEN_KEY, accessToken);
	next && next();
};
