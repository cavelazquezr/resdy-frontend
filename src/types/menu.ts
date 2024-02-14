export interface DishOutput {
	id: string;
	name: string;
	price: number;
	photo_url?: string;
	description?: string;
	allergen?: string[];
}

export interface CreateDishInput {
	id?: string;
	name: string;
	photo_url?: string;
	price: number;
	description?: string;
	allergen?: string;
}

export interface UpdateCategoryInput {
	label: string;
}

export interface MenuOutput {
	category: string;
	dishes: DishOutput[];
}
