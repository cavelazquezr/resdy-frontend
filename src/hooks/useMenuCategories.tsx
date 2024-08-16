import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createCategory, deleteCategory, getMyCategories, updateCategory } from '../api/categories';
import { useAppSelector } from '../store/store';
import { CategoryCreateInput, CategoryUpdateInput } from '../types/categories';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMenuCategories(filters?: any) {
	const restaurantData = useAppSelector((state) => state.restaurant.restaurantData?.data);
	const queryClient = useQueryClient();

	const toast = useToast();

	// Get categories
	const { data: categoriesData } = useQuery({
		queryKey: ['myCategoriesQuery', filters],
		queryFn: () => getMyCategories(restaurantData?.name as string),
		enabled: !!restaurantData?.name,
	});

	// Invalidate categories query
	const invalidateCategoriesQuery = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['myCategoriesQuery', filters],
		});
	};

	// Create category
	const { mutate: createCategoryMutation } = useMutation({
		mutationFn: (args: CategoryCreateInput) => createCategory({ ...args, restaurantName: restaurantData?.name }),
		onSuccess: () => {
			invalidateCategoriesQuery();
			toast({
				position: 'top',
				title: 'Categoría creada con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	// Update category
	const { mutate: updateCategoryMutation } = useMutation({
		mutationFn: (args: CategoryUpdateInput) => updateCategory(args),
		onSuccess: () => {
			invalidateCategoriesQuery();
			toast({
				position: 'top',
				title: 'Categoría actualizada con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	// Delete category
	const { mutate: deleteCategoryMutation } = useMutation({
		mutationFn: (categoryId: string) => deleteCategory(categoryId),
		onSuccess: () => {
			invalidateCategoriesQuery();
			toast({
				position: 'top',
				title: 'Categoría eliminada con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	return {
		categories: categoriesData?.data,
		createCategoryMutation,
		updateCategoryMutation,
		deleteCategoryMutation,
		invalidateCategoriesQuery,
	};
}
