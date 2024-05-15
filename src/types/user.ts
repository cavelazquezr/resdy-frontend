type User = {
	id: string;
	email: string;
	firstname: string;
	lastname: string | null;
	avatar_url: string | null;
	password: string;
	phone: string | null;
	created_at: Date;
	is_active: boolean;
	is_owner: boolean;
};

export type UserRecord = Omit<User, 'password'>;
export type UserProps = Partial<User>;
export type UserCreateInput = Pick<User, 'email' | 'firstname' | 'lastname' | 'password' | 'is_owner'>;
export type UserUpdateInput = Partial<
	Pick<User, 'email' | 'firstname' | 'lastname' | 'password' | 'is_owner' | 'phone'>
>;
export type UserInfo = Pick<User, 'firstname' | 'lastname' | 'avatar_url'>;

export interface UserCredentials {
	email: string;
	password: string;
	remember?: boolean;
}
