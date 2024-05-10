import React from 'react';

import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	VStack,
	Text,
	Button,
	Select,
	HStack,
	IconButton,
	Icon,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { FiHeart, FiMinus, FiPlus, FiSmartphone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { RestaurantDescriptionLabels } from './components/RestaurantDescriptionLabels';
import { IconLabel } from '../../../common/components/IconLabel/IconLabel';
import { breakpointLayoutWidth } from '../../../components/Layout/utils/styles';
import { RestaurantOutput } from '../../../types/restaurants';

export const HomeView: React.FC = () => {
	const queryClient = useQueryClient();
	const restaurantQuery = queryClient.getQueryData<AxiosResponse<RestaurantOutput[]>>(['restaurantQuery']);
	const queriesFetching = queryClient.isFetching();
	const isLoading = queriesFetching !== 0;

	const restaurant = React.useMemo<RestaurantOutput | undefined>(() => {
		if (restaurantQuery && !isLoading) {
			return restaurantQuery.data[0];
		}
		return undefined;
	}, [restaurantQuery]);

	console.log('restaurant', restaurant);

	if (isLoading) {
		return <>Loading</>;
	}

	if (restaurant) {
		const { rating, brand_name, rating_count, price_average, restaurant_type, city, phone, description } = restaurant;
		return (
			<React.Fragment>
				<Flex justifyContent="center" alignItems="center" mt="2rem" flexDir="column" w="100%" gap="2rem">
					<Box w={breakpointLayoutWidth}>
						<Grid templateColumns="repeat(12, 1fr)" columnGap="2rem">
							<GridItem colSpan={8}>
								<VStack align="stretch" spacing="1rem">
									<VStack align="stretch">
										<Heading>{brand_name}</Heading>
										<RestaurantDescriptionLabels
											rating={rating}
											ratingCount={rating_count}
											priceAverage={price_average}
											restaurantType={restaurant_type}
										/>
										<IconLabel label={city} icon={HiOutlineLocationMarker} />
										<IconLabel label={phone} icon={FiSmartphone} />
									</VStack>
									<VStack align="stretch">
										<Text textStyle="heading5">Sobre nosotros</Text>
										<Text textStyle="body1" color="gray.500">
											{description}
										</Text>
									</VStack>
								</VStack>
							</GridItem>
							<GridItem colSpan={4}>
								<Flex
									w="100%"
									boxShadow="2xl"
									border="1px solid"
									borderColor="gray.200"
									p="1.5rem"
									borderRadius="0.5rem"
								>
									<VStack align="stretch" w="100%" spacing="1rem">
										<Text textStyle="heading5">Reservar ahora</Text>
										<Grid templateColumns="1fr 2fr" alignItems="center">
											<GridItem>
												<Text color="gray.500" fontWeight="semibold">
													Día
												</Text>
											</GridItem>
											<GridItem>
												<Select size="md"></Select>
											</GridItem>
										</Grid>
										<Grid templateColumns="1fr 2fr" alignItems="center">
											<GridItem>
												<Text color="gray.500" fontWeight="semibold">
													Hora
												</Text>
											</GridItem>
											<GridItem>
												<Select size="md"></Select>
											</GridItem>
										</Grid>
										<Grid templateColumns="1fr 2fr" alignItems="center">
											<GridItem>
												<Text color="gray.500" fontWeight="semibold">
													Personas
												</Text>
											</GridItem>
											<GridItem>
												<HStack>
													<IconButton variant="solidPrimary" aria-label="Remove people" icon={<FiMinus />} />
													<Text color="gray.500">2</Text>
													<IconButton variant="solidPrimary" aria-label="Add people" icon={<FiPlus />} />
												</HStack>
											</GridItem>
										</Grid>
										<Button size="lg" w="100%" variant="solidSecondaryForm">
											Solicitar reserva
										</Button>
									</VStack>
								</Flex>
							</GridItem>
						</Grid>
					</Box>
					<Box h="15rem" w="100%" bg="gray.200"></Box>
					<Box w={breakpointLayoutWidth}>
						<VStack align="stretch">
							<Text textStyle="heading5">Opiniones</Text>
							<Grid templateColumns="repeat(12, 1fr)" columnGap="2rem">
								Comments
							</Grid>
						</VStack>
					</Box>
				</Flex>
				<Flex
					position="fixed"
					left="90%"
					top="90%"
					p="1rem"
					bg="white"
					boxShadow="2xl"
					borderRadius="full"
					w="fit-content"
					alignItems="center"
				>
					<Icon color="red.500" h="2rem" w="2rem" as={FiHeart} />
				</Flex>
			</React.Fragment>
		);
	}
};
