import { ICourse } from "./index";

export interface IUserPaymentCard {
	card_number: string;
	card_name: string;
	bank: { name: string; logo?: string };
}

export type Subscription = {
	id: string;
	course: ICourse;
	course_id: string;
	is_completed: boolean;
	created_at?: string;
	updated_at?: string;
};

export interface Notification {
	id: string;
	title: string;
	body: string;
	resourceId: string;
	resourceType: string;
	read: boolean;
	created_at: Date;
}

export interface IUser {
	id?: string;
	email: string;
	name: string;
	phone: string;
	avatar?: string;
	country: string;
	is_online: boolean;
	is_active: boolean;
	is_verified: boolean;
	is_admin: boolean;
	payment_cards?: IUserPaymentCard[];
	is_mentor: boolean;
	isPremium: boolean;
	created_at?: string;
	updated_at?: string;
	subscriptions: Subscription[];
	notifications: Notification[];
}

export type IUserOnboardingState = { fullName: string; phone: string; country: string; email: string };

export interface IUserUpdate extends IUser {
	payment_cards?: IUserPaymentCard[];
}
