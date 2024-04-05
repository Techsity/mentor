import { NextRouter } from "next/router";
import { AUTH_TOKEN_KEY } from "../constants";
import ResponseMessages from "../constants/response-codes";
import { logOut } from "../redux/reducers/auth/authSlice";
import { persistor, store } from "../redux/store";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { setNewCourse } from "../redux/reducers/coursesSlice";
import { setCurrentProfile } from "../redux/reducers/userSlice";

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
			// expires: 1 / 24,
			expires: 1,
			// sameSite: "strict",
			// path: "/auth?login",
		});
	}
};

export const removeCookie = (key: string) => {
	if (process.browser) Cookies.remove(key);
};
export const getCookie = (name: string) => {
	const cookieValue = document.cookie
		.split("; ")
		.find((row) => row.startsWith(name))
		?.split("=")[1];
	return cookieValue ? decodeURIComponent(cookieValue) : null;
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
		const token = getCookie(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
		if (!token) return null;
		const decodedToken: any = jwt.decode(token);
		if (!decodedToken) {
			console.error("Error decoding auth token");
			return null;
		}
		if (decodedToken.exp < parseInt((Date.now() / 1000).toFixed(0))) {
			console.log("Auth Token has expired");
			return null;
		}
		return token;
	}
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
	store.dispatch(setCurrentProfile("mentee"));
	removeCookie(AUTH_TOKEN_KEY);
	removeLocalStorage(AUTH_TOKEN_KEY);
	// sessionStorage.clear();
	sessionStorage.removeItem("persist:auth");
	persistor.persist();
	// removeLocalStorage("persist:root");
	next && next();
};

export const authenticate = async (accessToken: string, next?: Function) => {
	setCookie(AUTH_TOKEN_KEY, accessToken);
	// setLocalStorage(AUTH_TOKEN_KEY, accessToken);
	next && (await next());
};

export const navigateToAuthPage = (router: NextRouter, link: string) => {
	if (!store.getState().auth.isLoggedIn || !store.getState().auth.user)
		router.push(`/auth?login&next=${encodeURIComponent(link)}`);
	else router.push(link);
};
