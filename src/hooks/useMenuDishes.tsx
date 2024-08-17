import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createDish, deleteDish, getMyDishes, updateDish } from '../api/dishes';
import { useAppSelector } from '../store/store';
import { DishCreateInput, DishUpdateInput } from '../types/dishes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMenuDishes(filters?: any) {
	const restaurantData = useAppSelector((state) => state.restaurant.restaurantData?.data);
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

	// Create dish
	const { mutate: createDishMutation } = useMutation({
		mutationFn: (args: DishCreateInput) => createDish({ ...args, restaurantName: restaurantData?.name }),
		onSuccess: async () => {
			invalidateDishesQuery();
			await queryClient.invalidateQueries({
				queryKey: ['myCategoriesQuery', filters],
			});
			toast({
				position: 'top',
				title: 'Plato creado con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

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
		createDishMutation,
		updateDishMutation,
		deleteDishMutation,
		invalidateDishesQuery,
	};
}
