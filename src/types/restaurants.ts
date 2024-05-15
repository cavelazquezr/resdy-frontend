/*
 * Notes:
 * 1. Types with suffix 'Output' represents the data structure of database schema
 * 2. Types with suffix 'Output' are never used in the front-end, This represents how Prisma builds the types
 * 3. Everytime that schemas are updated in the ´´schema.prisma´´ file, the 'Output' types must be updated in the front-end
 */

type RestaurantOutput = {
	id: string;
	name: string;
	created_at: Date;
	admin_id: string;
};
type CustomizationOutput = {
	color_palette: Record<string, string>;
	font_families: Record<string, string>;
	extra_customization: Record<string, string>;
	header_url: string | null;
	name: string | null;
	updated_at: Date;
	restaurant_id: string;
};
type InformationOutput = {
	phone: string;
	address: string;
	city: string;
	country: string;
	social_media: Record<string, string>;
	restaurant_type: string;
	location: Record<string, string>;
	description: string | null;
	extra_information: Record<string, string>;
	updated_at: Date;
	restaurant_id: string;
};

export interface RestaurantRecord
	extends Pick<
			InformationOutput,
			'phone' | 'address' | 'country' | 'city' | 'restaurant_type' | 'description' | 'location'
		>,
		Pick<RestaurantOutput, 'name'>,
		Pick<CustomizationOutput, 'header_url'> {
	brand_name: string | null;
	price_average: number;
	rating: number;
	rating_count: number;
}

export type RestaurantCardRecord = Pick<
	RestaurantRecord,
	| 'name'
	| 'brand_name'
	| 'address'
	| 'price_average'
	| 'header_url'
	| 'rating'
	| 'rating_count'
	| 'city'
	| 'country'
	| 'restaurant_type'
>;

export type LandingRestaurantInfo = {
	[category: string]: Array<RestaurantCardRecord>;
};

export type RestaurantSummary = {
	rating: number;
	rating_count: number;
	price_average: number;
};

export type GetRestaurantsQueryParams = {
	name?: string;
	city?: string;
	restaurant_type?: string;
	country?: string;
};
