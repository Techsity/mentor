import { IUser } from "./user.interface";

export interface IAuthState {
	isLoggedIn: boolean;
	user: IUser | null;
}

export interface IForgotPasswordState {
	email: string;
	error: string;
	loading: boolean;
}
export interface IResetPasswordState {
	newPassword: string;
	confirmNewPassword: string;
}
export interface ISignUpState {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
	country: string;
}

export interface ILoginState {
	email: string;
	password: string;
}
