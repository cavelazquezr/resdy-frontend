import { RatingStatsOutput } from './rating';

export interface GetMyReservationQueryParams {
	status?: string;
	city?: string;
	search?: string;
}

export interface MyReservationOutput {
	name: string;
	price_average: number;
	status: string;
	date_of_reservation: Date;
	city?: string;
	address?: string;
	rating_info?: RatingStatsOutput;
	header_url?: string;
	brand_name?: string;
	restaurant_type?: string;
}
