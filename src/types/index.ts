import { UserInfo } from './user';

export enum THUNK_STATE {
	IDLE = 'IDLE',
	FULFILLED = 'FULFILLED',
	PENDING = 'PENDING',
	REJECTED = 'REJECTED',
}

export type StatePropWithThunkState<T> = {
	thunkState: THUNK_STATE;
	data: T;
};

export type QueryFilter = {
	[key: string]: string | undefined;
};

export type WithIsUsed<T> = T & {
	is_used: boolean;
};

export type WithHide<T> = T & {
	hide?: boolean;
};

export type NonNullableProperties<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export type WithUserInfo<T> = T & {
	user: UserInfo;
};

export type ResultsSummary<T> = {
	count: number;
	options: Array<string>;
	results: Array<T>;
};

export interface IAttachedFile {
	id?: string;
	name: string;
	file?: File;
	type?: string;
}
