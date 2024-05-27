/* eslint-disable max-len */
import React from 'react';

import { Box, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMap } from 'react-map-gl';

import { SidebarWrapper } from './components/Sidebar';
import { getDiscoverRestaurants } from '../../api/restautants';
import { CustomViewportChangeEvent, MapBox, MarkerProps } from '../../common/components/MapBox/MapBox';
import { NotFoundMessage } from '../../common/components/NotFoundMessage/NotFoundMessage';
import { RestaurantCard } from '../../common/components/RestaurantCard/RestaurantCard';
import { RestaurantCardSkeleton } from '../../common/components/RestaurantCard/RestaurantCardSkeleton';
import { actions as mapNavigationActions } from '../../store/mapNavigation/reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { RestaurantCardOutput } from '../../types/common';
import { GetDiscoveryRestaurantsQueryParams } from '../../types/restaurants';

export const DiscoverView: React.FC = () => {
	const [filters, setFilters] = React.useState<GetDiscoveryRestaurantsQueryParams | undefined>(undefined);
	const [restaurantData, setRestaurantData] = React.useState<Array<RestaurantCardOutput<unknown>> | undefined>(
		undefined,
	);
	const [initialLoad, setInitialLoad] = React.useState<boolean>(true);

	const { selectedRestaurant, lastSelectedRestaurant, hoveredRestaurant, sortRestaurantsBy, typeFilter } =
		useAppSelector((state) => state.mapNavigation);
	const dispatch = useAppDispatch();

	const hasBounds = !!(filters?.swLat && filters?.swLng && filters?.neLat && filters?.neLng);

	const { data } = useQuery({
		queryKey: ['discoverRestaurants', filters, sortRestaurantsBy, typeFilter],
		queryFn: () =>
			getDiscoverRestaurants(
				{
					...filters,
					restaurant_type: typeFilter === null ? undefined : typeFilter,
					sortBy: sortRestaurantsBy === null ? undefined : sortRestaurantsBy,
				} ?? {},
			),
		enabled: hasBounds,
	});

	const { discoverMap } = useMap();

	const handleHover = (id: string | undefined) => {
		dispatch(mapNavigationActions.setHoveredRestaurant(id));
	};

	const handleClickCard = (restaurant: RestaurantCardOutput<unknown>) => {
		dispatch(mapNavigationActions.setSelectedRestaurant(restaurant.id));

		if (discoverMap) {
			discoverMap.flyTo({
				center: [restaurant.location.coordinates[0], restaurant.location.coordinates[1]],
				zoom: 17,
				duration: 2000,
			});
		}
	};

	const onViewportChange = (e: CustomViewportChangeEvent) => {
		const { bounds } = e;
		setFilters({
			...filters,
			swLat: bounds.sw.lat,
			swLng: bounds.sw.lng,
			neLat: bounds.ne.lat,
			neLng: bounds.ne.lng,
		});
	};

	const markers = React.useMemo<Array<MarkerProps>>(() => {
		if (restaurantData) {
			return restaurantData.map((restaurant) => {
				const { location } = restaurant;
				return {
					detail: restaurant,
					longitude: location.coordinates[0],
					latitude: location.coordinates[1],
					hovered: hoveredRestaurant === restaurant.id,
					selected: selectedRestaurant === restaurant.id,
				};
			});
		} else {
			return [];
		}
	}, [restaurantData, hoveredRestaurant]);

	React.useEffect(() => {
		if (data && data.data) {
			dispatch(mapNavigationActions.setTypeFilterOptions(data.data.options));
			const resData = data.data.results;
			if (lastSelectedRestaurant) {
				const selected = resData.find((restaurant) => restaurant.id === lastSelectedRestaurant);
				const rest = resData.filter((restaurant) => restaurant.id !== lastSelectedRestaurant);
				const sortedList = selected ? [...rest, selected] : resData;
				setRestaurantData(sortedList);
			} else {
				setRestaurantData(resData);
			}
			setInitialLoad(false);
		}
	}, [data, selectedRestaurant]);

	const renderContent = () => {
		if (initialLoad) {
			return <RestaurantCardSkeleton noOfRows={5} />;
		}

		if (restaurantData) {
			if (!initialLoad && restaurantData.length === 0) {
				return (
					<NotFoundMessage
						title="Sin resultados"
						body="No hemos podido encontrar restaurantes en esta zona con tus filtros de búsqueda."
					/>
				);
			}

			return (
				<Box w="100%" h="100%" pe="1rem" overflowY="scroll">
					<VStack spacing="1rem" align="stretch" h="100%" px="0.75rem" py="0.5rem">
						{restaurantData.map((restaurant, index) => (
							<RestaurantCard key={index} record={restaurant} onHover={handleHover} onClick={handleClickCard} />
						))}
					</VStack>
				</Box>
			);
		}
	};

	return (
		<HStack w="100%" h="100vh" overflow="hidden" position="absolute" top={0} left={0}>
			<Box w="30%" h="100%">
				<SidebarWrapper itemsFound={(restaurantData ?? []).length} isLoading={restaurantData === undefined}>
					{renderContent()}
				</SidebarWrapper>
			</Box>
			<Box w="70%" position="relative">
				<MapBox id="discoverMap" markersCoordinates={markers} onViewportChange={onViewportChange} />
			</Box>
		</HStack>
	);
};
