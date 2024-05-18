import React from 'react';

import { Box, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { getMyReservations } from '../../../api/reservation';
import MapBox from '../../../common/components/MapBox/MapBox';
import { NotFoundMessage } from '../../../common/components/NotFoundMessage/NotFoundMessage';
import { RestaurantCard } from '../../../common/components/RestaurantCard/RestaurantCard';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { StatusMenuFilter } from '../../../common/components/StatusMenuFilter/StatusMenuFilter';
import { QueryFilter } from '../../../types';
import { RestaurantCardOutput } from '../../../types/common';
import { MyReservationsQueryParams, ReservationDetailOutput } from '../../../types/reservation';

type MyReservationsRecord = RestaurantCardOutput<ReservationDetailOutput>;

export const ReservationsView: React.FC = () => {
	const [filters, setFilters] = React.useState<MyReservationsQueryParams | undefined>();
	const [myReservations, setMyReservations] = React.useState<Array<MyReservationsRecord>>([]);
	const { data, isLoading } = useQuery({
		queryKey: ['myReservationsQuery', filters],
		queryFn: () => getMyReservations(filters ? filters : {}),
	});

	const handleSetSearchFilter = (input: MyReservationsQueryParams) => {
		const { city, search, start_date, end_date } = input;
		setFilters({
			...filters,
			start_date: start_date,
			end_date: end_date,
			city: city === '' ? undefined : city,
			search: search === '' ? undefined : search,
		});
	};
	const handleSetStatusFilter = (status: string[] | undefined) => {
		if (status) {
			setFilters({ ...filters, status: status.length ? status.join() : undefined });
		} else {
			setFilters({ ...filters, status: undefined });
		}
	};

	React.useEffect(() => {
		const values = data?.data;
		if (values) {
			setMyReservations(values);
		}
	}, [data]);

	return (
		<VStack align="stretch" w="100%" h="100%" spacing="1rem" pb="9rem">
			<HStack justifyContent="space-between" px="0.75rem">
				<SearchBar
					filters={filters as QueryFilter}
					handleSetFilter={handleSetSearchFilter}
					selectValues={['Madrid', 'Barcelona']}
				/>
				<StatusMenuFilter
					handleSetFilter={handleSetStatusFilter}
					statusValues={['to_be_confirmed', 'finished', 'cancelled', 'next']}
				/>
			</HStack>
			<HStack h="100%" spacing="1rem">
				{myReservations.length > 0 ? (
					<Box w="100%" h="100%" pe="1rem" overflowY="scroll">
						<VStack spacing="1rem" align="stretch" h="100%" px="0.75rem" py="0.5rem">
							{myReservations.map((reservation, index) => (
								<RestaurantCard key={index} record={reservation} navigateToRestaurantView showStatus />
							))}
						</VStack>
					</Box>
				) : (
					<Box w="100%" h="100%">
						<NotFoundMessage />
					</Box>
				)}
				<Box w="100%" h="100%" borderRadius="0.75rem" overflow="hidden">
					<MapBox />
				</Box>
			</HStack>
			{isLoading && !myReservations.length && <>Loading</>}
		</VStack>
	);
};
