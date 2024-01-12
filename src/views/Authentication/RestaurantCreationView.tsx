import React from 'react';

import { Box, Flex, HStack } from '@chakra-ui/react';

import { ImagePanel } from './components/ImagePanel/ImagePanel';
import { RestaurantCreationForm } from './components/RestaurantCreationForm/RestaurantCreationForm';

export const RestaurantCreationView: React.FC = () => {
	return (
		<HStack w="100%" h="100vh">
			<Box display={{ base: 'none', xs: 'block' }} w={{ base: '0%', xs: '50%' }} h="100%" bg="brand-secondary.default">
				<ImagePanel isRestaurantCreationView />
			</Box>
			<Flex w={{ base: '100%', xs: '50%' }} h="100%" alignItems="center" justifyContent="center">
				<RestaurantCreationForm />
			</Flex>
		</HStack>
	);
};
