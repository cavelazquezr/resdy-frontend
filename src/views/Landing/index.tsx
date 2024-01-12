import React from 'react';

import { Flex, Text, VStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { MapSheet } from './components/MapSheet';
import { PhoneSheet } from './components/PhoneSheet';
import { RestaurantCardSlider } from './components/RestautantCardSlider';
import { getRestaurants } from '../../api/restautants';

export const LandingView: React.FC = () => {
	// Queries
	const { data: madridRestaurantsData, isLoading: isMadridRestaurantsLoading } = useQuery({
		queryKey: ['MadridRestaurants'],
		queryFn: () => getRestaurants({ city: 'Madrid' }),
	});
	const madridRestautants = madridRestaurantsData ? madridRestaurantsData.data : [];

	const { data: barcelonaRestaurantsData, isLoading: isBarcelonaRestaurantsLoading } = useQuery({
		queryKey: ['BarcelonaRestaurants'],
		queryFn: () => getRestaurants({ city: 'Barcelona' }),
	});
	const barcelonaRestautants = barcelonaRestaurantsData ? barcelonaRestaurantsData.data : [];

	return (
		<VStack align="start">
			<Flex h="30rem" alignItems="center">
				<VStack w="40%" align="stretch" spacing="1.5rem">
					<Text
						textStyle="body2"
						bg="brand-secondary.50"
						w="fit-content"
						color="brand-secondary.600"
						borderRadius="0.5rem"
						p="0.15rem"
					>
						¿Sin planes?
					</Text>
					<Text textStyle="heading2">
						Descubre los restaurantes que están{' '}
						<Text as="span" color="brand-secondary.default">
							cerca de tí.
						</Text>
					</Text>
					<Text textStyle="body1" color="gray.600">
						Muchos restaurantes en tu ciudad utilizan Resdy para mostrarte todo lo que pueden ofrecerte. Explora y
						consigue el restaurante para hacer tus planes
					</Text>
					<Button size="md" variant="shadowPrimary" w="fit-content">
						Descubrir
					</Button>
				</VStack>
				<PhoneSheet position="absolute" right="30%" w="14rem" h="30rem" zIndex={1} boxShadow="dark-lg" bg="gray.800" />
				<MapSheet position="absolute" right="0" w="40rem" h="20rem" zIndex={0} boxShadow="2xl" borderRadius="2rem" />
			</Flex>
			<VStack align="stretch" w="100%">
				{/* Madrid restautants */}
				<RestaurantCardSlider
					title="Restaurantes más visitados de Madrid"
					isLoading={isMadridRestaurantsLoading}
					restaurants={madridRestautants}
				/>
				{/* Barcelona restautants */}
				<RestaurantCardSlider
					title="Restaurantes más visitados de Barcelona"
					isLoading={isBarcelonaRestaurantsLoading}
					restaurants={barcelonaRestautants}
				/>
			</VStack>
		</VStack>
	);
};
