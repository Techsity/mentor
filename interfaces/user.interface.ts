export interface IUser {
	id: string;
	email: string;
	name: string;
	phone: string;
	avatar?: string;
	country: string;
	is_online: boolean;
	is_active: boolean;
	is_verified: boolean;
	is_admin: boolean;
	mentor: any;
	created_at: Date;
	updated_at: Date;
}
