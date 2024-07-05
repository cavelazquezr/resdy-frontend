import React from 'react';

import { HStack, Icon, VStack, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

interface IProps {
	rating: number;
	ratingCount: number;
	priceAverage: number;
	restaurantType: string;
	address: string;
	city: string;
	showCity?: boolean;
}

export const RestaurantSummary: React.FC<IProps> = (props) => {
	const { rating, ratingCount, priceAverage, restaurantType, address, city, showCity } = props;
	return (
		<VStack align="stretch" spacing="0.25rem">
			<HStack spacing="0.25rem">
				<HStack spacing={0} alignItems="center">
					<Icon me="0.25rem" as={FaStar} color="brand-primary.default" />
					<Text textStyle="body2" color="brand-primary.default">
						{Number(rating).toFixed(1)}
					</Text>
					<Text textStyle="body2" color="gray.500">
						{`(${ratingCount})`}
					</Text>
				</HStack>
				<Text textStyle="body2" color="gray.500">
					-
				</Text>
				<Text textStyle="body2" color="gray.500" textTransform="capitalize">
					{restaurantType}
				</Text>
				<Text textStyle="body2" color="gray.500">
					-
				</Text>
				<Text textStyle="body2" color="gray.500">
					{`${priceAverage}€`}
				</Text>
			</HStack>
			<HStack spacing={0} alignItems="center">
				<Icon me="0.25rem" as={FiMapPin} color="gray.500" />
				<Text textStyle="body2" color="gray.500">
					{`${address}${showCity ? `, ${city}` : ''}`}
				</Text>
			</HStack>
		</VStack>
	);
};
