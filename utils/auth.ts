import ResponseMessages from "../constants/response-codes";

export const checkAuth = () => {
	return !true;
};
export const currentUserRole = (): "mentee" | "mentor" => {
	return "mentee";
};
export const formatGqlError = (error: any): string => {
	const resCode: keyof typeof ResponseMessages = error.message.split(" -")[0];
	return ResponseMessages[resCode];
};
