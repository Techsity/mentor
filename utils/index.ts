import { ICourseContent, IReview } from "../interfaces";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
export const isEmail = (email: string): boolean => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

export const isValidNumber = (value: string): boolean => /^[0-9]$/.test(value);

export const isValidPhoneNumber = (phone: string): boolean => /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone);

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

export const validatePassword = (password: string, rule: "8" | "number" | "capital"): boolean => {
	const regex = getRuleRegex(rule);
	return regex.test(password);
};

export const formatDateDifference = (startDate: Date | string, endDate: Date | string): number | string => {
	dayjs.extend(relativeTime);
	return dayjs(startDate).to(endDate, true);
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
	return (
		title
			?.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "")
			.replace(/-{2,}/g, "-") || ""
	);
}

export function parseDuration(minutes: string) {
	if (typeof minutes === "number") {
		minutes = String(minutes);
	}
	if (minutes.length === 3) {
		const hours = minutes[0];
		const minutesPart = minutes.slice(1);
		return `0${hours}:${minutesPart}`;
	} else if (minutes.length === 4) {
		const hours = minutes.slice(0, 2);
		const minutesPart = minutes.slice(2);
		return `${hours}:${minutesPart}`;
	} else {
		return `${minutes.slice(0, 2)}:${minutes.slice(2)}`;
	}
}
export function parseVideoDuration(duration: number): string {
	let seconds;
	if (duration < 1) {
		seconds = duration / 1000;
	} else {
		seconds = duration;
	}
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const accurateSeconds = Math.floor(seconds % 60);

	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = accurateSeconds.toString().padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const calculateTotalDuration = (content: ICourseContent): string => {
	// let totalHours = 0;
	// let totalMinutes = 0;
	// content.course_sections.forEach((item) => {
	// 	const [hours, minutes] = item.duration.split(":").map(Number);
	// 	if (!isNaN(hours) && !isNaN(minutes)) {
	// 		totalHours += hours;
	// 		totalMinutes += minutes;
	// 	}
	// });
	// const extraHours = Math.floor(totalMinutes / 60);
	// totalMinutes %= 60;
	// totalHours += extraHours;
	const totalDuration = `${String(100).padStart(2, "0")}:${String(2000).padStart(2, "0")}`;

	return totalDuration;
};

export const scrollUp = (height?: number) => {
	return height
		? window.scrollTo({
				top: document.body.clientTop + height,
				behavior: "smooth",
		  })
		: window.scrollTo({
				top: document.body.clientTop + 600,
				behavior: "smooth",
		  });
};

export const calculateTax = (price: number, taxRate: number) => {
	if (!price || !taxRate) {
		return null;
	}
	const taxAmount = ((price * taxRate) / 100.0).toFixed(2);
	return taxAmount;
};

export function capitalizeSentence(sentence: string) {
	if (sentence.length === 0) {
		return sentence;
	} else {
		const words = sentence.split(" ");
		const capitalizedWords = words.map((word) => {
			if (word.length === 0) {
				return word;
			} else {
				return word[0].toUpperCase() + word.slice(1);
			}
		});
		return capitalizedWords.join(" ");
	}
}

export const isValidUrl = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
};

/**
 * Format amount into a amount-string representation {i.e K for thousands, M for millions}.
 * @param { number } amount - The number to be formatted.
 * @param options: withFraction - for formattin to decimal places //Todo
 * @returns A formatted amount in string.
 */
export function formatAmount(amount: number, options?: { withFraction?: boolean }): string {
	const { withFraction = false } = options || {};
	if (amount)
		if (amount.toString().length <= 5) {
			// Format with 2 decimal places for amounts with up to 5 digits
			return amount.toLocaleString(undefined, {
				minimumFractionDigits: withFraction ? 2 : 0,
				maximumFractionDigits: withFraction ? 2 : 0,
			});
		} else if (amount < 1000000) {
			// Format in thousands
			const thousands = Math.floor(amount / 1000);
			// return `${thousands}K`;
			return amount.toLocaleString();
		} else if (amount < 1000000000) {
			// Format in millions
			const millions = (amount / 1000000).toFixed(withFraction ? 1 : 0);
			return `${millions}M`;
		} else if (amount < 1000000000000) {
			// Format in billions
			const billions = (amount / 1000000000).toFixed(withFraction ? 1 : 0);
			return `${billions}B`;
		} else if (amount < 1000000000000000) {
			// Format in trillions
			const trillions = (amount / 1000000000000).toFixed(withFraction ? 1 : 0);
			return `${trillions}T`;
		} else {
			// For amounts beyond trillions, you can continue the pattern
			// For example: quadrillions, quintillions, and so on
			return "Too large to display";
		}
	return "";
}

export const calculateRatingsInReviews = (reviews: IReview[]): string => {
	return formatFollowersCount(reviews.reduce((sum, review) => sum + review.ratings, 0) / reviews.length || 0);
};
