import ResponseMessages from "../constants/response-codes";

export const checkAuth = () => {
	return !true;
};
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
