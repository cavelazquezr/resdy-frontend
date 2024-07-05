import React from 'react';

import './styles.css';
import { Text, HStack, Image, VStack, Button, Box } from '@chakra-ui/react';

import { RestaurantSummary } from '../../../common/components/RestaurantSummary/RestaurantSummary';
import { SuperLink } from '../../../common/components/SuperLink/SuperLink';
import { RestaurantCardRecord } from '../../../types/restaurants';

interface IProps {
	data: Array<RestaurantCardRecord>;
	isLoading?: boolean;
}

export const HorizontalRestaurantStack: React.FC<IProps> = (props) => {
	const { data, isLoading } = props;

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<HStack>
			{data.map(({ brand_name, name, header_url, ...summary }, index) => (
				<VStack
					key={index}
					bg="white"
					align="stretch"
					spacing="0rem"
					border="1px solid"
					borderRadius="0.75rem"
					borderColor="brand-gray.200"
					overflow="hidden"
					w="100%"
				>
					{header_url ? (
						<Image src={header_url ?? ''} alt={name} w="100%" h="10rem" objectFit="cover" />
					) : (
						<Box bg="gray.200" w="100%" h="10rem" />
					)}
					<VStack padding="1rem" align="stretch">
						<Text textStyle="heading6" color="gray.900">
							{brand_name}
						</Text>
						<RestaurantSummary
							rating={summary.rating}
							ratingCount={summary.rating_count}
							priceAverage={summary.price_average}
							restaurantType={summary.restaurant_type}
							address={summary.address}
							city={summary.city}
						/>
						<HStack>
							<SuperLink to={`restaurant/${name}/home`} w="100%">
								<Button w="100%" variant="default-light">
									Ver
								</Button>
							</SuperLink>
							<Button w="100%" variant="primary">
								Reservar
							</Button>
						</HStack>
					</VStack>
				</VStack>
			))}
		</HStack>
	);
};
