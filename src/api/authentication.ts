import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from './index';
import { envConfig } from '../config/env';
import { UserCreateInput, UserCredentials, UserOutput, UserRecord, UserUpdateInput } from '../types/user';

export const getCurrentUser: CustomAxiosRequest<undefined, UserRecord> = () => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/authentication/current_user`;
	const config: AxiosRequestConfig<UserRecord> = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return axios(config);
};

export const getAccessToken: CustomAxiosRequest<UserCredentials, { token: string }> = (args) => {
	const url = `${envConfig.API_URL}/authentication/login`;

	const config: AxiosRequestConfig<UserCredentials> = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		data: args,
	};
	return axios(config);
};

export const postNewUser: CustomAxiosRequest<UserCreateInput, UserOutput> = (args) => {
	const url = `${envConfig.API_URL}/authentication/create_user`;

	const config: AxiosRequestConfig<UserCreateInput> = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		data: args,
	};
	return axios(config);
};

export const updateUser: CustomAxiosRequest<UserUpdateInput, UserOutput> = (args) => {
	const url = `${envConfig.API_URL}/authentication`;
	const token = localStorage.getItem('accessToken');

	const config: AxiosRequestConfig<UserUpdateInput> = {
		method: 'PUT',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: args,
	};
	return axios(config);
};
