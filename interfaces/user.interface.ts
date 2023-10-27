export interface IUser {
	name: string;
	email: string;
	avatar?: string;
	role: "mentee" | "mentor";
}
