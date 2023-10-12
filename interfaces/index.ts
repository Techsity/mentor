export interface ICourse {
	// id: string;
	title: string;
	description: string;
	level: "All Level" | "Inermediate" | "Beinner" | "Adanced";
	duration: number;
	limit: number;
	rating: number;
	price: number | "free";
	mentor: { name: string; username: string; avatar: string };
	available: boolean;
	imgUrl?: string;
}

export interface ICourseCategory {
	title: string;
	availableCourses: ICourse[];
}

type CountryCode =
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

export interface IExperience {
	position: string;
	company: { name: string; logo?: string };
	topSkils: string[];
	roles: string[];
	startDate: string;
	endDate: string;
	country?: CountryCode;
}
export interface IMentor {
	name: string;
	username: string;
	jobTitle: string;
	experience?: IExperience[];
	projects?: {
		title: string;
		link: string;
		type: "Freelance" | "Contract" | "Official";
	}[];
	sessions: number;
	rating: number;
	avatar: string;
	skills: string[];
	daysOpen: string[];
	online: boolean;
	verified: boolean;
	ratePerHour: number;
	about: string;
	country: CountryCode;
	languages: string[];
	followers: number;
	courses: ICourse[];
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

export interface IWorkshop {
	title: string;
	category: "Live" | "Upcoming" | "Recordings";
	description: string;
	startDate: Date;
	endDate: Date;
	hoursPerDay: number;
	enrolledStudents: number;
	price: number | "free";
	mentor: { name: string; avatar: string };
	available: boolean;
	imgUrl?: string;
}
