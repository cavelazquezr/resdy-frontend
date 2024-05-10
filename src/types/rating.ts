export interface RatingStatsOutput {
	rating: number;
	rating_count: number;
	stats?: Record<number, number>;
}

export interface UserRatingOutput {
	firstname: string;
	lastname: string;
	avatar_url?: string;
}

export interface RatingOutput {
	rating?: number;
	title?: string;
	comment?: string;
	created_at: Date;
	user_info?: UserRatingOutput;
	replied_at?: Date;
	answer?: string;
}

export interface MyRatingInfoOutput {
	status: string;
	created_at: Date;
	title?: string;
	comment?: string;
	rating?: number;
	replied_at?: Date;
	answer?: string;
}

export interface GetMyRatingQueryParams {
	status?: string;
	city?: string;
	search?: string;
}

export interface MyRatingOutput {
	id: string;
	name: string;
	city?: string;
	address?: string;
	rating_info?: MyRatingInfoOutput;
	header_url?: string;
	brand_name?: string;
	restaurant_type?: string;
}

export interface UpdateRatingRecord {
	ratingId?: string;
	title: string;
	comment: string;
	rating: number;
}
