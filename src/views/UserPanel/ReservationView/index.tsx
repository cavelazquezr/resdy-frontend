import React from 'react';

import { Text, Box, Center, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { RestaurantCard } from './components/RestaurantCard';
import { getMyReservations } from '../../../api/reservation';
import { NotFoundMessage } from '../../../common/components/NotFoundMessage/NotFoundMessage';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { StatusMenuFilter } from '../../../common/components/StatusMenuFilter/StatusMenuFilter';
import { QueryFilter } from '../../../types';
import { MyReservationsQueryParams, MyReservationOutput } from '../../../types/reservation';

export const ReservationsView: React.FC = () => {
	const [filters, setFilters] = React.useState<MyReservationsQueryParams | undefined>();
	const [myReservations, setMyReservations] = React.useState<MyReservationOutput[]>([]);
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

	console.log('filters', filters);

	React.useEffect(() => {
		const values = data?.data;
		if (values) {
			setMyReservations(values);
		}
	}, [data]);

	return (
		<VStack align="stretch" w="100%" h="100%" spacing="1rem" pb="9rem">
			<HStack justifyContent="space-between">
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
						<VStack spacing="1rem" align="stretch" h="100%">
							{myReservations.map((reservation, index) => (
								<VStack key={index} spacing="1rem" align="stretch">
									<RestaurantCard reservation={reservation} />
								</VStack>
							))}
						</VStack>
					</Box>
				) : (
					<Box w="100%" h="100%">
						<NotFoundMessage />
					</Box>
				)}
				<Center w="100%" h="100%" bg="brand-gray.200" borderRadius="0.75rem">
					<Text>Mapa en desarrollo</Text>
				</Center>
			</HStack>
			{isLoading && !myReservations.length && <>Loading</>}
		</VStack>
	);
};
