/* eslint-disable @typescript-eslint/no-explicit-any */
import { Point } from 'geojson';

import { RestaurantSummary } from './restaurants';

export interface RestaurantCardOutput<T> {
	id: string;
	name: string;
	status: string;
	brand_name: string;
	address: string;
	city: string;
	header_url: string | null;
	restaurant_type: string;
	location: Point;
	summary: RestaurantSummary;
	detail: T;
}
