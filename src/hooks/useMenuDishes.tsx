import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteDish, getMyDishes, updateDish } from '../api/dishes';
import { DishUpdateInput } from '../types/dishes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMenuDishes(filters?: any) {
	const queryClient = useQueryClient();

	const toast = useToast();

	// Get categories
	const { data: dishesData } = useQuery({
		queryKey: ['myDishesQuery', filters],
		queryFn: () => getMyDishes(undefined),
	});

	// Invalidate dish query
	const invalidateDishesQuery = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['myDishesQuery', filters],
		});
	};

	// Create category
	// const { mutate: createCategoryMutation } = useMutation({
	// 	mutationFn: (args: CategoryCreateInput) => createCategory({ ...args, restaurantName: restaurantData?.name }),
	// 	onSuccess: () => {
	// 		invalidateCategoriesQuery();
	// 		toast({
	// 			position: 'top',
	// 			title: 'Categoría creada con éxito',
	// 			status: 'success',
	// 			duration: 4000,
	// 			isClosable: true,
	// 		});
	// 	},
	// });

	// // Update dish
	const { mutate: updateDishMutation } = useMutation({
		mutationFn: (args: DishUpdateInput) => updateDish(args),
		onSuccess: () => {
			invalidateDishesQuery();
			toast({
				position: 'top',
				title: 'Plato actualizado con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	// Delete dish
	const { mutate: deleteDishMutation } = useMutation({
		mutationFn: (dishId: string) => deleteDish(dishId),
		onSuccess: () => {
			invalidateDishesQuery();
			toast({
				position: 'top',
				title: 'Plato eliminado con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	return {
		dishes: dishesData?.data,
		// createCategoryMutation,
		updateDishMutation,
		deleteDishMutation,
		invalidateDishesQuery,
	};
}
