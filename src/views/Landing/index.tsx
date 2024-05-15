import React from 'react';

import { Flex, Text, VStack, Button, HStack, Box, Grid, GridItem, Img } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { IconType } from 'react-icons';
import { FiAward, FiThumbsUp, FiSmile } from 'react-icons/fi';

import { FeatureStack } from './components/FeatureStack';
import { HorizontalRestaurantStack } from './components/HorizontalRestaurantStack';
import { VerticalRestaurantStackByCategory } from './components/VerticalRestaurantStackByCategory';
import { getLandingRestaurants } from '../../api/restautants';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { Footer } from '../../components/Footer/Footer';
import { breakpointLayoutWidth } from '../../components/Layout/utils/styles';
import './styles.css';
import { GetRestaurantsQueryParams, RestaurantCardRecord } from '../../types/restaurants';

const cityBackground: Record<string, string> = {
	madrid:
		'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
};

type RestaurantStackItem = {
	category: string;
	icon: IconType;
	data: Array<RestaurantCardRecord>;
};

export const LandingView: React.FC = () => {
	const [filters, _setFilters] = React.useState<GetRestaurantsQueryParams>({
		city: 'Madrid',
	});
	// Queries
	const { data } = useQuery({
		queryKey: ['landingRestaurants', filters],
		queryFn: () => getLandingRestaurants(filters),
	});

	const landingRestaurants = data?.data ?? {};

	const mostVisitedRestaurants: RestaurantStackItem = {
		category: 'Más visitados',
		icon: FiAward,
		data: landingRestaurants.most_visited ?? [],
	};
	const mostRatedRestaurants: RestaurantStackItem = {
		category: 'Mejor calificados',
		icon: FiThumbsUp,
		data: landingRestaurants.best_rated ?? [],
	};
	const newRestaurants: RestaurantStackItem = {
		category: 'Nuevos en Resdy',
		icon: FiSmile,
		data: landingRestaurants.new_restaurants ?? [],
	};

	return (
		<React.Fragment>
			<VStack>
				<Flex h="28rem" alignItems="center">
					<VStack w="100%" align="center" spacing="1rem" width={breakpointLayoutWidth}>
						<Text textStyle="body1" w="fit-content" color="brand-primary.default" borderRadius="0.5rem" p="0.15rem">
							Descubre, reserva y comparte
						</Text>
						<Text textStyle="heading2" textAlign="center">
							La plataforma para idear tu próximo plan y conseguir el mejor sitio de la ciudad
						</Text>
						<Text w="70%" textAlign="center" textStyle="body1" color="gray.500">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam.
						</Text>
						<HStack>
							<SuperLink to="/login">
								<Button size="md" variant="primary" w="fit-content">
									Comenzar
								</Button>
							</SuperLink>
							<Button size="md" variant="default-light" w="fit-content">
								Descubrir
							</Button>
						</HStack>
					</VStack>
				</Flex>
				<VStack w="100%" align="center" spacing="2rem" width={breakpointLayoutWidth}>
					<Text textStyle="heading4">Adecuado a tus necesidades</Text>
					<FeatureStack />
				</VStack>
				<Flex w="100%" position="relative" justifyContent="center" mt="2rem">
					<Box className="gradient-divider" />
					<Grid templateColumns="repeat(4, 1fr)" columnGap="2rem" mt="2rem" zIndex={2} width={breakpointLayoutWidth}>
						<GridItem>
							<VStack align="stretch" spacing="0.5rem">
								<Text textStyle="heading6" color="gray.900">
									Descubre restaurantes que te encantarán en Madrid
								</Text>
								<Text textStyle="body2" color="gray.500">
									Se el primero en enterarte de las nuevas aperturas, restaurantes más visitados en Resdy y mucho más
								</Text>
								<VStack align="stretch" spacing="0.5rem">
									<SuperLink
										to={'/discover'}
										textStyle="body2"
										color="brand-primary.default"
										fontWeight="medium"
										_hover={{ color: 'brand-primary.800' }}
									>
										Más visitados
									</SuperLink>
									<SuperLink
										to={'/discover'}
										textStyle="body2"
										color="brand-primary.default"
										fontWeight="medium"
										_hover={{ color: 'brand-primary.800' }}
									>
										Más valorados
									</SuperLink>
									<SuperLink
										to={'/discover'}
										textStyle="body2"
										color="brand-primary.default"
										fontWeight="medium"
										_hover={{ color: 'brand-primary.800' }}
									>
										Nuevos en Resdy
									</SuperLink>
								</VStack>
							</VStack>
						</GridItem>
						<GridItem colSpan={3}>
							<Box position="relative" h="30rem" w="100%">
								<Img
									src={cityBackground.madrid}
									alt="Madrid"
									w="100%"
									h="100%"
									objectFit="cover"
									objectPosition="center"
								/>
								<Flex position="absolute" bottom={0} right={0} bg="white" padding="1rem" w="40%">
									<VStack align="stretch" spacing="0.5rem">
										<Text textStyle="heading6" color="brand-primary.default">
											En Madrid
										</Text>
										<Text textStyle="heading6" color="gray.900">
											¿Ya sabes donde vas a comer?
										</Text>
										<Text textStyle="body2" color="gray.500">
											Ya hay restaurantes que usan Resdy para posicionarse y asi podrás conseguir el mejor plan y la
											mejor comida.
										</Text>
									</VStack>
								</Flex>
							</Box>
						</GridItem>
					</Grid>
				</Flex>
				<Flex w="100%" position="relative" justifyContent="center" mt="2rem">
					<Box className="gradient-divider" />
					<HStack width={breakpointLayoutWidth} justifyContent="space-between" mt="2rem" spacing="2rem" zIndex={2}>
						{[mostVisitedRestaurants, mostRatedRestaurants, newRestaurants].map(({ icon, data, category }, index) => (
							<VerticalRestaurantStackByCategory category={category} icon={icon} data={data} key={index} />
						))}
					</HStack>
				</Flex>
				<Flex w="100%" position="relative" justifyContent="center" mt="2rem">
					<Box className="gradient-divider" />
					<VStack width={breakpointLayoutWidth} align="stretch" spacing="2rem" mt="2rem" zIndex={2}>
						<HStack justifyContent="space-between" w="100%">
							<Text textStyle="heading6" color="gray.900">
								Reserva esta noche...
							</Text>
							<SuperLink textStyle="heading6" to={'/discover'} _hover={{ color: 'brand-primary.default' }}>
								Ver más
							</SuperLink>
						</HStack>
						<HorizontalRestaurantStack data={landingRestaurants.book_tonight ?? []} />
					</VStack>
				</Flex>
				<Footer />
			</VStack>
		</React.Fragment>
	);
};
