import { RatingStatsOutput } from './rating';

export interface MyReservationsQueryParams {
	status?: string;
	city?: string;
	search?: string;
	start_date?: string;
	end_date?: string;
}

export interface MyReservationOutput {
	name: string;
	price_average: number;
	date_of_reservation: Date;
	city?: string;
	address?: string;
	status: string;
	number_of_person: number;
	rating_info?: RatingStatsOutput;
	header_url?: string;
	brand_name?: string;
	restaurant_type?: string;
}
