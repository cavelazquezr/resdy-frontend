export interface UserOutput {
	id: string;
	email: string;
	avatar_url: string;
	firstname: string;
	lastname: string;
	password: string;
	created_at: Date;
	is_active: boolean;
	is_owner: boolean;
}

export interface CreateUserInput {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	is_owner: boolean;
}

export interface UpdateUserInput {
	id: string;
	email?: string;
	firstname?: string;
	lastname?: string;
	password?: string;
}

export interface UserCredentials {
	email: string;
	password: string;
	remember?: boolean;
}
