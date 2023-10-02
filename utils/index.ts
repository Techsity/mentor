export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
export const isEmail = (email: string): boolean =>
	/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

export const isValidNumber = (value: string): boolean => /^[0-9]$/.test(value);

export const isValidPhoneNumber = (phone: string): boolean =>
	/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone);

export const getRuleRegex = (rule: "8" | "number" | "capital"): RegExp => {
	switch (rule) {
		case "8":
			return /^.{8,}$/;
		case "number":
			return /\d/;
		case "capital":
			return /[A-Z]/;
		default:
			return /.*/;
	}
};

export const validatePassword = (
	password: string,
	rule: "8" | "number" | "capital",
): boolean => {
	const regex = getRuleRegex(rule);
	return regex.test(password);
};
