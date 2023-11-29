import { IMentor } from "../interfaces/mentor.interface";
import { IUser } from "../interfaces/user.interface";
import countries from "./countries";

export const testUser = (role: "mentee" | "mentor"): IUser | IMentor => {
	return {
		email: "mentee@email.io",
		username: "John Doe",
		name: "Test Mentee User",
		about: "",
		country: countries[0].label,
		courses: [],
		created_at: new Date(),
		daysOpen: ["Mon", "Wed"],
		followers: 20000,
		is_active: role === "mentor",
		is_admin: role === "mentor",
		is_online: true,
		is_verified: role === "mentor",
		jobTitle: "",
		languages: [],
		mentees: [],
		avatar: "",
		mentor: role === "mentor",
		phone: "12938428910",
		ratePerHour: 20320,
		rating: 4.5,
		sessions: 42,
		skills: [],
		subscribers: 2323233,
		verified: role === "mentor",
	};
};

export default testUser;
