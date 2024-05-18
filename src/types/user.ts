/*
 * Notes:
 * 1. Types with suffix 'Output' represents the data structure of database schema
 * 2. Types with suffix 'Output' are never used in the front-end, This represents how Prisma builds the types
 * 3. Everytime that schemas are updated in the ´´schema.prisma´´ file, the 'Output' types must be updated in the front-end
 */

type UserOutput = {
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
export type UserUpdateInput = Partial<Pick<UserOutput, 'email' | 'firstname' | 'lastname' | 'password' | 'phone'>>;
export type UserInfo = Pick<UserOutput, 'firstname' | 'lastname' | 'avatar_url'>;

export interface UserCredentials {
	email: string;
	password: string;
	remember?: boolean;
}
