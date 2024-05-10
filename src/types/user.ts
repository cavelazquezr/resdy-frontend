export type UserOutput = {
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

export type UserRecord = Omit<UserOutput, 'password'>;
export type UserProps = Partial<UserOutput>;
export type UserCreateInput = Pick<UserOutput, 'email' | 'firstname' | 'lastname' | 'password' | 'is_owner'>;
export type UserUpdateInput = Partial<
	Pick<UserOutput, 'email' | 'firstname' | 'lastname' | 'password' | 'is_owner' | 'phone'>
>;
export type UserInfo = Pick<UserOutput, 'firstname' | 'lastname' | 'avatar_url'>;

export interface UserCredentials {
	email: string;
	password: string;
	remember?: boolean;
}
