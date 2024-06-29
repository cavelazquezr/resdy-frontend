import { localConfig } from './local';

export type EnvConfigurationType = {
	ENV_NAME: 'production' | 'development' | 'local';
	API_URL: string;
	MAPBOX_ACCESS_KEY?: string;
};

const location = window.location.host;

const runConfig = () => {
	if (location === 'localhost:3000') {
		return localConfig;
	} else {
		return localConfig;
	}
};

export const envConfig = runConfig();
