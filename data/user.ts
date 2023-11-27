import { IUser } from "../interfaces/user.interface";
import countries from "./countries";

export const testUser = (role: "mentee" | "mentor"): IUser | null => {
	// return role === "mentee"
	// 	? {
	// 			email: "mentee@email.io",
	// 			name: "Test Mentee User",
	// 			country: countries[0].label,

	// 	  }
	// 	: role === "mentor"
	// 	? {
	// 			email: "mentor@email.io",
	// 			name: "Test Mentor User",
	// 	  }
	// 	: null;
	return null;
};

export default testUser;
