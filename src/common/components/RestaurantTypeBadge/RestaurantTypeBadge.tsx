import React from 'react';

import { HStack, Text } from '@chakra-ui/react';

interface IProps {
	restaurantType: string;
}

export const RestaurantTypeBadge: React.FC<IProps> = (props) => {
	const { restaurantType } = props;

	return (
		<HStack padding="0.25rem 0.5rem" borderRadius="full" bg="brand-primary.default" w="fit-content">
			<Text textTransform="capitalize" textStyle="body2" fontWeight="semibold" color="white">
				{restaurantType}
			</Text>
		</HStack>
	);
};
