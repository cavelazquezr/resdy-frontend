import React from 'react';

import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useQueries } from '@tanstack/react-query';

import { HomeView } from './HomeView';
import { MenuView } from './MenuView';
import { RatingView } from './RatingsView';
import { ReservationView } from './ReservationView';
import { getMenu } from '../../api/menu';
import { getRatingStats, getRatings } from '../../api/rating';
import { getRestaurants } from '../../api/restautants';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { useCustomParams } from '../../hooks/useCustomParams';
import { MenuOutput } from '../../types/menu';
import { RatingOutput, RatingStatsOutput } from '../../types/rating';
import { RestaurantRecord } from '../../types/restaurants';

export const RestaurantLayout: React.FC = () => {
	const { restaurantName, restaurantSection } = useCustomParams(['restaurantName', 'restaurantSection']);

	console.log('changed to restaurant: ', restaurantName);

	const queryBuilder = [
		{
			key: 'restaurantQuery',
			apiFn: () => getRestaurants({ name: restaurantName }),
		},
		{
			key: 'ratingStatsQuery',
			apiFn: () => getRatingStats(restaurantName),
		},
		{
			key: 'ratingsQuery',
			apiFn: () => getRatings(restaurantName),
		},
		{
			key: 'menuQuery',
			apiFn: () => getMenu(restaurantName),
		},
	];

	// Queries
	const [restaurantQuery, ratingStatsQuery, ratingsQuery, menuQuery] = useQueries({
		queries: queryBuilder.map((query) => ({ queryKey: [query.key], queryFn: query.apiFn })),
	});

	// Query records
	const restautantRecord = restaurantQuery.data?.data[0] as RestaurantRecord;
	const ratingStatsRecord = ratingStatsQuery.data?.data as RatingStatsOutput;
	const ratingsRecords = ratingsQuery.data?.data as RatingOutput[];
	const menuRecords = menuQuery.data?.data as MenuOutput[];

	const requestFinished =
		!restaurantQuery.isLoading && !ratingStatsQuery.isLoading && !ratingsQuery.isLoading && !menuQuery.isLoading;

	const sections = [
		{
			name: 'home',
			label: 'Inicio',
			component: HomeView,
		},
		{
			name: 'menu',
			label: 'Carta',
			component: MenuView,
		},
		{
			name: 'ratings',
			label: 'Opiniones',
			component: RatingView,
		},
		{
			name: 'reservations',
			label: 'Reservar',
			component: ReservationView,
		},
	];

	const currentSection = sections.find((section) => section.name === restaurantSection);

	if (requestFinished && restautantRecord && ratingStatsRecord && ratingsRecords && menuRecords) {
		return (
			<VStack align="stretch" spacing={0}>
				<Box position="relative" w="100%">
					<Flex position="absolute" zIndex={2} w="100%" h="100%" alignItems="center">
						<Text w="100%" textAlign="center" textStyle="heading2" color="white">
							{restautantRecord.brand_name}
						</Text>
					</Flex>
					<Box bg="black" opacity="50%" w="100%" h="20rem" position="absolute" />
					<Image src={restautantRecord.header_url ?? ''} w="100%" h="20rem" objectFit="cover" objectPosition="center" />
				</Box>
				<Box bg="brand-primary.default" w="100%" h="3rem">
					<HStack alignItems="center" h="100%" justifyContent="center" spacing="1rem">
						{sections.map((section, index) => (
							<SuperLink key={index} to={`/restaurant/${restaurantName}/${section.name}`}>
								<Text
									textStyle="body1"
									fontWeight="semibold"
									color="brand-primary.200"
									_hover={{ color: 'white', cursor: 'pointer' }}
								>
									{section.label}
								</Text>
							</SuperLink>
						))}
					</HStack>
				</Box>
				<Box>{currentSection?.component && <currentSection.component />}</Box>
			</VStack>
		);
	}
};
