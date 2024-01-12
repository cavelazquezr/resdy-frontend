import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from './index';
import { envConfig } from '../config/env';
import { CreateUserInput, UserCredentials, UserOutput } from '../types/user';

export const getCurrentUser: CustomAxiosRequest<string, UserOutput> = (token: string) => {
	const url = `${envConfig.API_URL}/authentication/current_user`;
	const config: AxiosRequestConfig<UserOutput> = {
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

export const postNewUser: CustomAxiosRequest<CreateUserInput, UserOutput> = (args) => {
	const url = `${envConfig.API_URL}/authentication/create_user`;

	const config: AxiosRequestConfig<CreateUserInput> = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		data: args,
	};
	return axios(config);
};
