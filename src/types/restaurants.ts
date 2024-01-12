export interface RestaurantOutput {
	name?: string;
	brand_name?: string;
	logo_url?: string;
	header_url?: string;
	phone?: string;
	address?: string;
	country?: string;
	city?: string;
	restaurant_type?: string;
	location?: Record<string, string>;
	price_average: number;
	rating?: number;
	rating_count?: number;
}

export interface RestaurantRatingsRecord {
	authorId: string; //id of the user
	authorRating: number; //from 1 to 5
	authorComment: string;
}
