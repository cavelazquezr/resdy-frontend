import React from 'react';

import './styles.css';
import { Text, HStack, Image, VStack, Button, Box, Stack, Skeleton, SkeletonText } from '@chakra-ui/react';

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
		return (
			<HStack
				overflow="scroll"
				px={{
					base: '1rem',
					xs: '0rem',
				}}
			>
				{Array.from({ length: 4 }).map((_, index) => (
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
						minW="15rem"
					>
						<Skeleton w="100%" h="10rem" objectFit="cover" />
						<VStack padding="1rem" align="stretch" spacing="1rem">
							<Skeleton height="1rem" />
							<SkeletonText noOfLines={3} spacing="0.5rem" />
						</VStack>
					</VStack>
				))}
			</HStack>
		);
	}

	return (
		<HStack
			overflow="scroll"
			px={{
				base: '1rem',
				md: '0rem',
			}}
		>
			{data.map(({ brand_name, name, headers_url, ...summary }, index) => (
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
					minW="15rem"
				>
					{headers_url.length > 0 ? (
						<Image src={headers_url[0] ?? ''} alt={name} w="100%" h="10rem" objectFit="cover" />
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
						<Stack
							direction={{
								base: 'column',
								xs: 'row',
							}}
						>
							<SuperLink to={`restaurant/${name}/home`} w="100%">
								<Button aria-label="go-to-restaurant" w="100%" variant="default-light">
									Ver
								</Button>
							</SuperLink>
							<Button aria-label="book-in-restaurant" w="100%" variant="primary">
								Reservar
							</Button>
						</Stack>
					</VStack>
				</VStack>
			))}
		</HStack>
	);
};
