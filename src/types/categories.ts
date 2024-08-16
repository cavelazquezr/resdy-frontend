import { WithHide, WithIsUsed } from '.';

/*
 * Notes:
 * 1. Types with suffix 'Output' represents the data structure of database schema
 * 2. Types with suffix 'Output' are never used in the front-end, This represents how Prisma builds the types
 * 3. Everytime that schemas are updated in the ´´schema.prisma´´ file, the 'Output' types must be updated in the front-end
 */

export type CategoryOutput = {
	id: string;
	label: string;
	is_active: boolean;
	created_at: Date;
	updated_at: Date | null;
	restaurant_id: string;
};

export type CategoryProps = Partial<CategoryOutput>;
export type CategoryCreateInput = Pick<CategoryOutput, 'label'> & { restaurantName?: string };
export type MyCategoriesRecord = Omit<WithIsUsed<CategoryOutput>, 'restaurant_id'> & { dishes: number };
export type CategoryUpdateInput = Pick<Partial<WithHide<CategoryOutput>>, 'hide' | 'label'> & {
	categoryId: string;
};
