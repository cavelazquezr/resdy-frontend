import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getRatingStats, getRatings, putRating } from '../api/rating';
import { useAppSelector } from '../store/store';
import { RatingUpdateRecord } from '../types/rating';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRatings() {
	const restaurantData = useAppSelector((state) => state.restaurant.restaurantData?.data);
	const queryClient = useQueryClient();

	const toast = useToast();

	// Get categories
	const { data: ratings } = useQuery({
		queryKey: ['ratingsQuery', restaurantData?.name],
		queryFn: () => getRatings(restaurantData?.name as string),
		enabled: !!restaurantData?.name,
	});

	// Get restaurant ratings
	const { data: ratingStats } = useQuery({
		queryKey: ['ratingStatsQuery', restaurantData?.name],
		queryFn: () => getRatingStats(restaurantData?.name as string),
		enabled: !!restaurantData?.name,
	});

	// Invalidate ratings query
	const invalidateRatingsQuery = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['ratingsQuery', restaurantData?.name],
		});
	};

	// Invalidate ratings query
	const invalidateRatingStatsQuery = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['ratingStatsQuery', restaurantData?.name],
		});
	};

	// Update rating
	const { mutate: updateRatingMutation } = useMutation({
		mutationFn: (args: RatingUpdateRecord) => putRating(args),
		onSuccess: () => {
			invalidateRatingsQuery();
			invalidateRatingStatsQuery();
			toast({
				position: 'top',
				title: 'Reseña actualizada con éxito',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		},
	});

	return {
		ratings: ratings?.data,
		stats: ratingStats?.data,
		updateRatingMutation,
	};
}
