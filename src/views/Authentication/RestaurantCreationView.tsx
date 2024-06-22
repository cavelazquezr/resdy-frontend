import React from 'react';

import { Flex } from '@chakra-ui/react';

import { RestaurantCreationForm } from './components/RestaurantCreationForm/RestaurantCreationForm';
import { ContentContainer } from '../../common/components/ContentContainer/ContentContainer';

export const RestaurantCreationView: React.FC = () => {
	return (
		<Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg="gray.50">
			<ContentContainer w="-moz-fit-content" p="2rem">
				<RestaurantCreationForm />
			</ContentContainer>
		</Flex>
	);
};
