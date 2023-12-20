import { IMentor, RefrencedMentorType } from "./mentor.interface";
import { IUser } from "./user.interface";

export type CountryCode =
	| "AF"
	| "AL"
	| "DZ"
	| "AS"
	| "AD"
	| "AO"
	| "AI"
	| "AG"
	| "AR"
	| "AM"
	| "AW"
	| "AU"
	| "AT"
	| "AZ"
	| "BS"
	| "BH"
	| "BD"
	| "BB"
	| "BY"
	| "BE"
	| "BZ"
	| "BJ"
	| "BM"
	| "BT"
	| "BO"
	| "BA"
	| "BW"
	| "BR"
	| "IO"
	| "BN"
	| "BG"
	| "BF"
	| "BI"
	| "KH"
	| "CM"
	| "CA"
	| "CV"
	| "KY"
	| "CF"
	| "TD"
	| "CL"
	| "CN"
	| "CO"
	| "KM"
	| "CG"
	| "CD"
	| "CK"
	| "CR"
	| "CI"
	| "HR"
	| "CU"
	| "CW"
	| "CY"
	| "CZ"
	| "DK"
	| "DJ"
	| "DM"
	| "DO"
	| "EC"
	| "EG"
	| "SV"
	| "SZ"
	| "GQ"
	| "ER"
	| "EE"
	| "TL"
	| "ET"
	| "FK"
	| "FO"
	| "FJ"
	| "FI"
	| "FR"
	| "PF"
	| "GA"
	| "GM"
	| "GE"
	| "DE"
	| "GH"
	| "GI"
	| "GR"
	| "GL"
	| "GD"
	| "GU"
	| "GT"
	| "GP"
	| "GG"
	| "GN"
	| "GW"
	| "GY"
	| "HT"
	| "VA"
	| "HN"
	| "HK"
	| "HU"
	| "IS"
	| "IN"
	| "ID"
	| "IR"
	| "IQ"
	| "IE"
	| "IM"
	| "IL"
	| "IT"
	| "JM"
	| "JP"
	| "JE"
	| "JO"
	| "KZ"
	| "KE"
	| "KI"
	| "KP"
	| "KR"
	| "KW"
	| "KG"
	| "LA"
	| "LV"
	| "LB"
	| "LS"
	| "LR"
	| "LY"
	| "LI"
	| "LT"
	| "LU"
	| "MO"
	| "MK"
	| "MG"
	| "MW"
	| "MY"
	| "MV"
	| "ML"
	| "MT"
	| "MH"
	| "MQ"
	| "MR"
	| "MU"
	| "MX"
	| "FM"
	| "MD"
	| "MC"
	| "MN"
	| "ME"
	| "MS"
	| "MA"
	| "MZ"
	| "MM"
	| "NA"
	| "NR"
	| "NP"
	| "NL"
	| "NZ"
	| "NI"
	| "NE"
	| "NG"
	| "NU"
	| "NF"
	| "MP"
	| "NO"
	| "OM"
	| "PK"
	| "PW"
	| "PS"
	| "PA"
	| "PG"
	| "PY"
	| "PE"
	| "PH"
	| "PN"
	| "PL"
	| "PT"
	| "PR"
	| "QA"
	| "RO"
	| "RU"
	| "RW"
	| "KN"
	| "LC"
	| "VC"
	| "WS"
	| "SM"
	| "ST"
	| "SA"
	| "SN"
	| "RS"
	| "SC"
	| "SL"
	| "SG"
	| "SX"
	| "SK"
	| "SI"
	| "SB"
	| "SO"
	| "ZA"
	| "SS"
	| "ES"
	| "LK"
	| "SD"
	| "SR"
	| "SE"
	| "CH"
	| "SY"
	| "TW"
	| "TJ"
	| "TZ"
	| "TH"
	| "TG"
	| "TK"
	| "TO"
	| "TT"
	| "TN"
	| "TR"
	| "TM"
	| "TC"
	| "TV"
	| "UG"
	| "UA"
	| "AE"
	| "GB"
	| "US"
	| "UY"
	| "UZ"
	| "VU"
	| "VE"
	| "VN"
	| "VI"
	| "YE"
	| "ZM"
	| "ZW";

// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================

export type CourseSection = { notes: string; section_name: string; video_url: string };

export interface ICourseContent {
	title: string;
	course_sections: CourseSection[];
}

export interface ICourseCategory {
	title: string;
	description: string;
	category_type: {
		description: string;
		type: string;
	};
	created_at: string;
	updated_at: string;
}

export interface ICourse {
	id?: string;
	title: string;
	description: string;
	course_images: string;
	// course_level: "ALL_LEVELS" | "BEGINNER" | "INTERMMEDIATE" | "ADVANCED";
	course_level: "ALL_LEVELS" | "BEGINNER" | "INTERMMEDIATE" | "SENIOR";
	duration: number;
	limit: number;
	rating: number;
	price: number;
	mentor: IMentor;
	available: boolean;
	imgUrl?: string;
	requirements: string[];
	course_contents: ICourseContent[];
	category: ICourseCategory;
	reviews: IReview[];
	what_to_learn: string[];
}
export interface IAboutHeroCarouselData {
	title: string;
	paragraph: string;
	video?: string;
}

export interface IBlogPost {
	title: string;
	category: string;
	slug: string;
	createdAt: string;
	postedBy: { avatar: string; name: string };
	caption: string;
	thumbnail?: string;
	content: string;
}
export interface IWorkshopContent {
	title: string;
	date: string;
}
export interface IWorkshop {
	id?: string;
	title: string;
	tag: "Live" | "Upcoming" | "Recordings";
	description: string;
	startDate: string;
	endDate: string;
	duration: number;
	participants: number;
	price: number;
	mentor: IMentor;
	available: boolean;
	imgUrl?: string;
	what_to_learn: string[];
	requirements: string[];
	contents: IWorkshopContent[];
	reviews: IReview[];
}

export type ProfileTabLinkType =
	| "overview"
	| "courses"
	| "my-courses"
	| "workshop"
	| "my-workshop"
	| "mentorship"
	| "wishlists"
	| "payment-methods"
	| "payments"
	| "profile-settings"
	| "edit-course";

export type CourseType = "technical" | "vocational" | "educational";

export type IReview = { content: string; ratings: number; reviewed_by: IUser; type: string };
