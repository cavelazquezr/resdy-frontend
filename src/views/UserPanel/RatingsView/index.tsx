import React from 'react';

import { Box, HStack, VStack, Flex, SkeletonText, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { Conversation } from './components/Conversation';
import { UploadRatingForm } from './components/UploadRatingForm';
import { getMyRatings } from '../../../api/rating';
import { NotFoundMessage } from '../../../common/components/NotFoundMessage/NotFoundMessage';
import { RestaurantCard } from '../../../common/components/RestaurantCard/RestaurantCard';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { StatusMenuFilter } from '../../../common/components/StatusMenuFilter/StatusMenuFilter';
import { QueryFilter } from '../../../types';
import { RestaurantCardOutput } from '../../../types/common';
import { RatingDetailOutput } from '../../../types/rating';
import { MyReservationsQueryParams } from '../../../types/reservation';

type MyRatingRecord = RestaurantCardOutput<RatingDetailOutput>;

export const RatingsView: React.FC = () => {
	const [filters, setFilters] = React.useState<MyReservationsQueryParams | undefined>();
	const [myRatings, setMyRatings] = React.useState<Array<MyRatingRecord>>([]);
	const [editingRating, setEditingRating] = React.useState<MyRatingRecord | undefined>(undefined);
	const { data, isLoading: isMyRatingsLoading } = useQuery({
		queryKey: ['myRatingsQuery', filters],
		queryFn: () => getMyRatings(filters ? filters : {}),
	});

	const handleSetSearchFilter = (input: MyReservationsQueryParams) => {
		const { city, search, start_date, end_date } = input;
		setFilters({
			...filters,
			start_date: start_date,
			end_date: end_date,
			city: city === '' ? undefined : city,
			search: search === '' ? undefined : search,
		});
	};
	const handleSetStatusFilter = (status: string[] | undefined) => {
		if (status) {
			setFilters({ ...filters, status: status.length ? status.join() : undefined });
		} else {
			setFilters({ ...filters, status: undefined });
		}
	};
	const onEditRating = (id: string) => {
		setEditingRating(myRatings.find((rating) => rating.id === id));
	};

	const resetEditingRating = React.useCallback(() => {
		setEditingRating(myRatings[0]);
	}, [myRatings]);

	const requestFinished = React.useMemo(() => {
		return !isMyRatingsLoading;
	}, [isMyRatingsLoading]);

	React.useEffect(() => {
		const values = data?.data;
		if (values) {
			setMyRatings(values);
		}
	}, [data]);

	React.useEffect(() => {
		if (editingRating && myRatings) {
			const rating = myRatings.find((rating) => rating.id === editingRating.id);
			if (rating) {
				setEditingRating(rating);
			}
		}
		if (!editingRating && myRatings.length > 0) {
			setEditingRating(myRatings[0]);
		}
	}, [myRatings, editingRating]);
	console.log('editingRating', editingRating);

	return (
		<VStack align="stretch" w="100%" h="100%" spacing="1rem" pb="9rem">
			<HStack justifyContent="space-between" px="0.75rem">
				<SearchBar
					filters={filters as QueryFilter}
					handleSetFilter={handleSetSearchFilter}
					selectValues={['Madrid', 'Barcelona']}
					hideDatePicker
				/>
				<StatusMenuFilter handleSetFilter={handleSetStatusFilter} statusValues={['to_rate', 'finished']} />
			</HStack>
			<HStack h="100%" spacing="1rem">
				{requestFinished ? (
					<React.Fragment>
						{myRatings.length > 0 ? (
							<Box w="100%" h="100%" pe="1rem" overflowY="scroll">
								<VStack spacing="1rem" align="stretch" h="100%" px="0.75rem" py="0.5rem">
									{myRatings.map((rating, index) => (
										<RestaurantCard
											key={index}
											record={rating}
											showStatus
											isActive={rating.id === editingRating?.id}
											onEditRecord={onEditRating}
											showCity
										/>
									))}
								</VStack>
							</Box>
						) : (
							<Box w="100%" h="100%">
								<NotFoundMessage />
							</Box>
						)}
					</React.Fragment>
				) : (
					<VStack align="stretch" w="100%" spacing="1rem">
						{Array.from({ length: 5 }, (_, i) => i + 1).map((_, index) => (
							<HStack key={index} alignItems="start" h="100%" spacing="1rem">
								<Skeleton w="10rem" h="10rem" borderRadius="0.5rem" />
								<VStack align="stretch">
									<Skeleton w="6rem" h="1rem" />
									<SkeletonText w="15rem" mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
								</VStack>
							</HStack>
						))}
					</VStack>
				)}
				{requestFinished && myRatings.length > 0 && (
					<Flex w="100%" h="100%">
						{editingRating && editingRating.status === 'finished' ? (
							<Conversation rating={editingRating} />
						) : (
							<UploadRatingForm ratingId={editingRating?.id ?? ''} resetEditingRating={resetEditingRating} />
						)}
					</Flex>
				)}
			</HStack>
		</VStack>
	);
};
