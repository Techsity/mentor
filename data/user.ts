import { randomUUID } from "crypto";
import { IMentor } from "../interfaces/mentor.interface";
import { IUser } from "../interfaces/user.interface";
import countries from "./countries";
import mentors from "./mentors";

export const dummyUsers = [
	{
		email: "user@mail.offline",
		name: "Test User Offline",
		country: countries[0].label,
		created_at: new Date().toDateString(),
		is_active: true,
		is_admin: false,
		is_online: false,
		is_verified: true,
		avatar: "/assets/images/avatar.png",
		mentor: null,
		phone: "123-456-3390",
		isPremium: false,
	},
	{
		email: "user@mail.io",
		name: "Test User",
		country: countries[0].label,
		created_at: new Date().toDateString(),
		is_active: true,
		is_admin: false,
		is_online: true,
		is_verified: true,
		avatar: "/assets/images/avatar.png",
		mentor: null,
		phone: "123-456-7890",
		isPremium: false,
	},
	{
		id: "user-1",
		email: "user@example.com",
		name: "Alice",
		phone: "123-456-7890",
		avatar: "/assets/images/avatar.png",
		country: "US",
		is_online: true,
		is_active: true,
		is_verified: true,
		is_admin: false,
		payment_cards: [],
		mentor: null,
		isPremium: true,
		created_at: new Date().toDateString(),
		updated_at: new Date().toDateString(),
	},
	{
		id: "user-2",
		email: "user2@example.com",
		name: "Jonah",
		phone: "123-456-7890",
		avatar: "/assets/images/avatar.png",
		country: "NG",
		is_online: true,
		is_active: true,
		is_verified: true,
		is_admin: false,
		payment_cards: [],
		mentor: null,
		isPremium: true,
		created_at: new Date().toDateString(),
		updated_at: new Date().toDateString(),
	},
];

export const testUser = (role?: "mentee" | "mentor"): IUser | IMentor => {
	const dummyMentor: IMentor = mentors[0];
	return role === "mentor" ? dummyMentor : dummyUsers[0];
};

export default testUser;
