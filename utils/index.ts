import { ICourseContent } from "../interfaces";

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

export const formatDateDifference = (
	startDate: Date,
	endDate: Date,
): string => {
	const MS_PER_DAY = 24 * 60 * 60 * 1000;
	const daysDifference = Math.round(
		(endDate.getTime() - startDate.getTime()) / MS_PER_DAY,
	);

	if (daysDifference < 7) {
		return `${daysDifference} days`;
	} else if (daysDifference < 30) {
		const weeks = Math.floor(daysDifference / 7);
		return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
	} else if (daysDifference < 365) {
		const months = Math.floor(daysDifference / 30);
		return `${months} ${months === 1 ? "month" : "months"}`;
	} else {
		const years = Math.floor(daysDifference / 365);
		return `${years} ${years === 1 ? "year" : "years"}`;
	}
};

export function formatFollowersCount(number: number) {
	if (number < 1000) {
		return number.toString();
	} else if (number < 1000000) {
		const thousands = Math.floor(number / 1000);
		return `${thousands}k`;
	} else {
		const millions = (number / 1000000).toFixed(1);
		return `${millions}m`;
	}
}

export function slugify(title: string): string {
	return title
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/-{2,}/g, "-");
}

export function parseDuration(minutes: string) {
	if (typeof minutes !== "string") {
		minutes = String(minutes);
	}
	if (minutes.length === 4) {
		return `${minutes.slice(0, 2)}:${minutes.slice(2)}`;
	} else {
		return "Invalid input";
	}
}

export const calculateTotalDuration = (content: ICourseContent): string => {
	let totalHours = 0;
	let totalMinutes = 0;
	content.list.forEach((item) => {
		const [hours, minutes] = item.duration.split(":").map(Number);
		if (!isNaN(hours) && !isNaN(minutes)) {
			totalHours += hours;
			totalMinutes += minutes;
		}
	});
	const extraHours = Math.floor(totalMinutes / 60);
	totalMinutes %= 60;
	totalHours += extraHours;
	const totalDuration = `${String(totalHours).padStart(2, "0")}:${String(
		totalMinutes,
	).padStart(2, "0")}`;

	return totalDuration;
};
