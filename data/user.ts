import { IUser } from "../interfaces/user.interface";

export const testUser = (role: "mentee" | "mentor"): IUser | null => {
	return role === "mentee"
		? {
				email: "mentee@email.io",
				fullName: "Test Mentee User",
				role: role,
		  }
		: role === "mentor"
		? {
				email: "mentor@email.io",
				fullName: "Test Mentor User",
				role: role,
		  }
		: null;
};
