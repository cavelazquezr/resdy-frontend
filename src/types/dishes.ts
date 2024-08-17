import { WithHide } from '.';
import { CategoryOutput } from './categories';

type Dish = {
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

export type DishOutput = Dish & { category: CategoryOutput };
export type DishProps = Partial<DishOutput>;
export type DishCreateInput = Pick<DishOutput, 'name' | 'allergen' | 'price' | 'description' | 'category_id'> & {
	restaurantName?: string;
};
export type DishUpdateInput = WithHide<
	Partial<Pick<DishProps, 'name' | 'photo_url' | 'allergen' | 'price' | 'description'>> & { dishId: string }
>;
export type DishesByCategoryOutput = { category: string; dishes: DishOutput[] };
