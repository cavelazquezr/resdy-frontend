import axios from 'axios';
import { Point } from 'geojson';

import { envConfig } from '../config/env';

type GetCoordinatesArgs = {
	city: string;
	address: string;
	country: string;
	postal_code?: string;
};

export const getCoordinates = async (args: GetCoordinatesArgs): Promise<Point | null> => {
	const { city, address, country, postal_code } = args;
	const query = `${address}, ${postal_code}, ${city}, ${country}`;
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${
		envConfig.MAPBOX_ACCESS_KEY
	}`;

	try {
		const response = await axios.get(url);

		const features = response.data.features;
		if (!features.length) {
			return null;
		}

		const mainFeature = features[0];
		const geoJsonPoint: Point = {
			type: 'Point',
			coordinates: mainFeature.center,
		};

		return geoJsonPoint;
	} catch (error) {
		console.error('Error fetching data from Mapbox API:', error);
		return null;
	}
};

export const getAddressOptions = async (
	args: GetCoordinatesArgs,
): Promise<Array<{ label: string; value: string }> | null> => {
	const { city, address, country, postal_code } = args;
	const query = `${address}, ${postal_code}, ${city}, ${country}`;

	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		query,
	)}.json?types=address&access_token=${envConfig.MAPBOX_ACCESS_KEY}`;

	try {
		const response = await axios.get(url);
		const features = response.data.features;
		if (!features.length) {
			return null;
		}

		return features.map((feature) => ({
			label: feature.place_name,
			value: feature.place_name,
		}));
	} catch (error) {
		console.error('Error fetching data from Mapbox API:', error);
		return null;
	}
};
