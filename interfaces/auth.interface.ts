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
