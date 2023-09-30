export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
export const isEmail = (email: string): boolean =>
	/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

export const isValidNumber = (value: any): boolean => /^[0-9]$/.test(value);

export const isValidPhoneNumber = (phone: any): boolean =>
	/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone);
