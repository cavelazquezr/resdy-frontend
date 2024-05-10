import React from 'react';

import { Box, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { RestaurantCard } from './components/RestaurantCard';
import { getMyRatings } from '../../../api/rating';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { StatusMenuFilter } from '../../../common/components/StatusMenuFilter/StatusMenuFilter';
import { GetMyRatingQueryParams, MyRatingOutput } from '../../../types/rating';

export const RatingsView: React.FC = () => {
	const [filters, setFilters] = React.useState<GetMyRatingQueryParams | undefined>();
	const [myRatings, setMyRatings] = React.useState<MyRatingOutput[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: ['myRatingsQuery', filters],
		queryFn: () => getMyRatings(filters ? filters : {}),
	});

	const handleSetSearchFilter = (input: GetMyRatingQueryParams) => {
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
		const values = data?.data.ratings;
		if (values) {
			setMyRatings(values);
		}
	}, [data]);

	return (
		<React.Fragment>
			<HStack justifyContent="space-between">
				<SearchBar handleSetFilter={handleSetSearchFilter} selectValues={['Madrid', 'Barcelona']} />
				<StatusMenuFilter handleSetFilter={handleSetStatusFilter} statusValues={['to_rate', 'finished']} />
			</HStack>
			{myRatings.length > 0 && (
				<Box overflowY="scroll" px="1rem">
					<Box w="100%" h="100%">
						<VStack spacing="1rem" align="stretch" h="100%">
							{myRatings.map((rating, index) => (
								<VStack key={index} spacing="1rem" align="stretch">
									<RestaurantCard rating={rating} />
								</VStack>
							))}
						</VStack>
					</Box>
				</Box>
			)}
			{isLoading && !myRatings.length && <>Loading</>}
		</React.Fragment>
	);
};
