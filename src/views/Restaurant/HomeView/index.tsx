import React from 'react';

import { Box, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { breakpointLayoutWidth } from '../../../components/Layout/utils/styles';
import { RestaurantOutput } from '../../../types/restaurants';

export const HomeView: React.FC = () => {
	const queryClient = useQueryClient();
	const restaurantQuery = queryClient.getQueryData<AxiosResponse<RestaurantOutput[]>>(['restaurantQuery']);
	const queriesFetching = queryClient.isFetching();

	// const restaurant: RestaurantOutput = restaurantQuery ? restaurantQuery.data[0] : {};

	if (restaurantQuery) {
		console.log('restaurantQuery', restaurantQuery.data[0]);
	}

	return (
		<Flex justifyContent="center">
			<Box w={breakpointLayoutWidth}>
				<Grid templateColumns="repeat(12, 1fr)" columnGap="2rem">
					<GridItem colSpan={8}>
						<VStack>
							<Heading>{}</Heading>
						</VStack>
					</GridItem>
					<GridItem colSpan={4}>Book</GridItem>
				</Grid>
			</Box>
		</Flex>
	);
};
