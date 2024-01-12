import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { useCustomParams } from '../../hooks/useCustomParams';
import { getRestaurantsThunk } from '../../store/restaurant/thunk';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const RestaurantLayout: React.FC = () => {
	const dispatch = useAppDispatch();
	const { restaurantName } = useCustomParams(['restaurantName']);
	const currentRestaurant = useAppSelector((state) => state.restaurant.currentRestaurant?.data);

	React.useEffect(() => {
		dispatch(getRestaurantsThunk({ name: restaurantName }));
	}, []);

	return (
		<Box bg="gray.300" w="100%" h="20rem" position="absolute" left={0}>
			<Flex position="absolute" zIndex={2} w="100%" h="100%" alignItems="center">
				<Text w="100%" textAlign="center" textStyle="heading2" color="white">
					{currentRestaurant?.brand_name}
				</Text>
			</Flex>

			<Box bg="black" opacity="50%" w="100%" h="20rem" position="absolute" left={0} />
			<Image src={currentRestaurant?.header_url} w="100%" h="20rem" objectFit="cover" objectPosition="center" />
		</Box>
	);
};
