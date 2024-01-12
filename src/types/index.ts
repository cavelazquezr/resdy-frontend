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
