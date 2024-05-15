import { WithHide } from '.';

/*
 * Notes:
 * 1. Types with suffix 'Output' represents the data structure of database schema
 * 2. Types with suffix 'Output' are never used in the front-end, This represents how Prisma builds the types
 * 3. Everytime that schemas are updated in the ´´schema.prisma´´ file, the 'Output' types must be updated in the front-end
 */

type DishOutput = {
	id: string;
	name: string;
	photo_url: string | null;
	price: number;
	description: string | null;
	allergen: string | null;
	is_active: boolean;
	created_at: Date;
	updated_at: Date | null;
	restaurant_id: string;
	category_id: string;
};

export type DishProps = Partial<DishOutput>;
export type DishCreateInput = Pick<DishOutput, 'name' | 'photo_url' | 'allergen' | 'price' | 'description'>;
export type DishUpdateInput = WithHide<
	Partial<Pick<DishProps, 'name' | 'photo_url' | 'allergen' | 'price' | 'description'>>
>;
export type DishesByCategoryOutput = { category: string; dishes: DishOutput[] };
