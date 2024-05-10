import React from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface IProps {
	rating: number;
	ratingCount: number;
	priceAverage: number;
	restaurantType: string;
}

export const RestaurantDescriptionLabels: React.FC<IProps> = (props) => {
	const { rating, ratingCount, priceAverage, restaurantType } = props;
	return (
		<HStack>
			<HStack spacing={0}>
				<Icon as={FaStar} color="brand-secondary.default" />
				<Text textStyle="body1" color="brand-secondary.default" fontWeight="semibold">
					{rating}
				</Text>
				<Text color="gray.500">{`(${ratingCount})`}</Text>
			</HStack>
			<Text color="gray.500" textTransform="capitalize">
				-
			</Text>
			<Text color="gray.500" textTransform="capitalize">
				{restaurantType}
			</Text>
			<Text color="gray.500" textTransform="capitalize">
				-
			</Text>
			<Text color="gray.500">{`${priceAverage}€`}</Text>
		</HStack>
	);
};
