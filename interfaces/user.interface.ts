export interface IUserPaymentCard {
	card_number: string;
	card_name: string;
	bank: { name: string; logo?: string };
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
	mentor: any;
	created_at: Date;
	updated_at: Date;
}

export interface IUserUpdate extends IUser {
	payment_cards?: IUserPaymentCard[];
}
