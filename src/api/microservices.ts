import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { IAttachedFile } from '../types';

export const uploadAvatar: CustomAxiosRequest<FormData, void> = (args) => {
	const url = `${envConfig.API_URL}/microservices/avatar`;
	const token = localStorage.getItem('accessToken');

	const config: AxiosRequestConfig<FormData> = {
		method: 'POST',
		url,
		headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
		data: args,
	};
	return axios(config);
};

const getUploadSignedUrls = async (files: IAttachedFile[]) => {
	return await axios
		.post<{ [key: string]: string }>(
			`${envConfig.API_URL}/microservices/putSignedUrls`,
			files.map((it) => ({
				key: it.id,
				fileName: it.name,
				contentType: encodeURI(it.file !== undefined ? it.file.type : ''),
			})),
		)
		.then((res) => res.data);
};

export const uploadFiles = async (files: IAttachedFile[]) => {
	const signedUrls = await getUploadSignedUrls(files);

	console.log('signedUrls: ', signedUrls);
	return Promise.all(
		files.map((it) => {
			if (it.id !== undefined && it.file !== undefined) {
				return axios.put(`${signedUrls[it.id]}`, it.file, {
					headers: {
						'Content-Type': it.file.type,
					},
				});
			}
		}),
	);
};
