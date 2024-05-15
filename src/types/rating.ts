/*
 * Notes:
 * 1. Types with suffix 'Output' represents the data structure of database schema
 * 2. Types with suffix 'Output' are never used in the front-end, This represents how Prisma builds the types
 * 3. Everytime that schemas are updated in the ´´schema.prisma´´ file, the 'Output' types must be updated in the front-end
 */

type RatingsOutput = {
	id: string;
	rating: number | null;
	title: string | null;
	comment: string | null;
	status: string;
	answer: string | null;
	created_at: Date;
	updated_at: Date | null;
	user_id: string;
	restaurant_id: string;
};

export type RatingRecord = Omit<RatingsOutput, 'user_id' | 'updated_at' | 'restaurant_id'> & {
	user_info: UserRatingOutput;
	replied_at: RatingsOutput['updated_at'];
};
export type MyRatingInfoRecord = Omit<RatingRecord, 'user_info' | 'restaurant_id' | 'id' | 'status'>;
export type RatingUpdateRecord = Pick<RatingRecord, 'id' | 'title' | 'comment' | 'rating'>;
export type RatingDetailOutput = Pick<
	RatingRecord,
	'title' | 'comment' | 'rating' | 'answer' | 'created_at' | 'replied_at'
>;
export interface RatingStatsOutput {
	rating: string;
	rating_count: number;
	stats?: Record<number, number>;
}

export interface UserRatingOutput {
	firstname: string;
	lastname?: string;
	avatar_url?: string;
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

export interface MyRatingQueryParams {
	status?: string;
	city?: string;
	search?: string;
	start_date?: string;
	end_date?: string;
}
