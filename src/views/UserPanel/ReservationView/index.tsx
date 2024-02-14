import React from 'react';

import { Box, Divider, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { RestaurantCard } from './components/RestaurantCard';
import { getMyReservations } from '../../../api/reservation';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { StatusMenuFilter } from '../../../common/components/StatusMenuFilter/StatusMenuFilter';
import { GetMyReservationQueryParams, MyReservationOutput } from '../../../types/reservation';

export const ReservationsView: React.FC = () => {
	const [filters, setFilters] = React.useState<GetMyReservationQueryParams | undefined>();
	const [myReservations, setMyReservations] = React.useState<MyReservationOutput[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: ['myReservationsQuery', filters],
		queryFn: () => getMyReservations(filters ? filters : {}),
	});

	const handleSetSearchFilter = (input: GetMyReservationQueryParams) => {
		const { city, search } = input;
		setFilters({ ...filters, city: city === '' ? undefined : city, search: search === '' ? undefined : search });
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

	console.log(myReservations);

	return (
		<React.Fragment>
			<HStack justifyContent="space-between">
				<SearchBar handleSetFilter={handleSetSearchFilter} selectValues={['Madrid', 'Barcelona']} />
				<StatusMenuFilter handleSetFilter={handleSetStatusFilter} statusValues={['to_rate', 'finished']} />
			</HStack>
			{myReservations.length > 0 && (
				<Box w="100%" h="100%" overflowY="scroll">
					<VStack spacing="1rem" align="stretch" h="100%">
						{myReservations.map((reservation, index) => (
							<VStack key={index} spacing="1rem" align="stretch">
								<RestaurantCard reservation={reservation} />
								{index !== myReservations.length - 1 && <Divider />}
							</VStack>
						))}
					</VStack>
				</Box>
			)}
			{isLoading && !myReservations.length && <>Loading</>}
		</React.Fragment>
	);
};
