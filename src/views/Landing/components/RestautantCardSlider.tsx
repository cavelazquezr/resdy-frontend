import React from 'react';

import { VStack, Text, Box, HStack, Card, Image, Stack, Heading, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

import { SuperLink } from '../../../common/components/SuperLink/SuperLink';
import { RestaurantRecord } from '../../../types/restaurants';

interface IRestaurantCardSliderProps {
	title: string;
	restaurants?: RestaurantRecord[];
	isLoading?: boolean;
}

export const RestaurantCardSlider: React.FC<IRestaurantCardSliderProps> = (props) => {
	const { title, restaurants, isLoading } = props;

	return (
		<VStack align="stretch" spacing="1rem" mb="2rem">
			<Text textStyle="heading5">{title}</Text>
			{isLoading ? (
				<>Loading</>
			) : (
				<HStack spacing="1rem" w="100%" overflow="scroll" p="0.75rem" m="-0.75rem">
					{restaurants?.map((restaurant, index) => <RestaurantCard restaurant={restaurant} key={index} />)}
				</HStack>
			)}
		</VStack>
	);
};

const RestaurantCard: React.FC<{ restaurant: RestaurantRecord }> = (props) => {
	const { name, brand_name, price_average, address, rating, rating_count, restaurant_type, header_url } =
		props.restaurant;

	return (
		<SuperLink to={`/restaurant/${name}/home`}>
			<Card
				maxW="xs"
				shadow="none"
				borderRadius="0.75rem"
				overflow="hidden"
				minW="15rem"
				_hover={{
					transform: 'scale(1.05)',
					boxShadow: 'lg',
					cursor: 'pointer',
				}}
				transition="transform 0.4s, box-shadow 0.4s" // Transition for scaling only
			>
				<Box position="relative" h="25vh" overflow="hidden">
					<Image src={header_url ?? ''} alt="header" objectFit="cover" w="100%" h="100%" />
				</Box>
				<Stack spacing="0.5rem" p="1rem">
					<HStack>
						<HStack bg="brand-primary.50" p="0.25rem 0.5rem" borderRadius="full">
							<Icon color="brand-primary.default" as={FaStar} />
							<Text textStyle="body2" color="brand-primary.default">
								{`${rating} (${rating_count})`}
							</Text>
						</HStack>
						<Text
							textStyle="body2"
							color="gray.700"
							bg="gray.200"
							textTransform="capitalize"
							p="0.25rem 0.5rem"
							borderRadius="full"
						>
							{restaurant_type}
						</Text>
					</HStack>
					<Heading size="md">{brand_name}</Heading>
					<VStack spacing="0rem" align="stretch">
						<Text textStyle="body2" color="gray.500">
							{`Precio medio: ${price_average}€`}
						</Text>
						<Text textStyle="body2" color="gray.500">
							{address}
						</Text>
					</VStack>
				</Stack>
			</Card>
		</SuperLink>
	);
};
