import React from 'react';

import { Text, Divider, Img, VStack, IconButton, HStack, Skeleton } from '@chakra-ui/react';
import { FiAward, FiChevronLeft, FiSmile, FiThumbsUp } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import resdyLogoPrimary from '../../../assets/Resdy.svg';
import { LinkText } from '../../../common/components/LinkText/LinkText';
import { RestaurantTypeFilterButton } from '../../../common/components/RestaurantTypeFilterButton/RestaurantTypeFilterButton';
import { SuperLink } from '../../../common/components/SuperLink/SuperLink';
import { actions as mapNavigationActions } from '../../../store/mapNavigation/reducer';
import { useAppSelector } from '../../../store/store';
import { SortRestaurantBy } from '../../../types/restaurants';

interface IProps {
	children: React.ReactNode;
	itemsFound: number;
	isLoading?: boolean;
}

export const SidebarWrapper: React.FC<IProps> = (props) => {
	const { itemsFound, children, isLoading } = props;
	const dispatch = useDispatch();

	const { sortRestaurantsBy: sortBy, typeFilterOptions } = useAppSelector((state) => state.mapNavigation);

	const sortText =
		sortBy === 'visits' ? 'Más visitados' : sortBy === 'rating' ? 'Mejor calificados' : 'Nuevos en Resdy';

	const handleSortBy = (sortBy: SortRestaurantBy) => {
		dispatch(mapNavigationActions.setSortRestaurantsBy(sortBy));
	};

	return (
		<VStack h="100%" align="stretch" p="1rem" alignItems="start" spacing="1rem">
			<SuperLink px="0.75rem" to="/">
				<Img src={resdyLogoPrimary} />
			</SuperLink>
			<Divider borderColor="brand-gray.200" />
			{sortBy !== null && (
				<LinkText leftIcon={FiChevronLeft} onClick={() => dispatch(mapNavigationActions.resetSortRestaurantsBy())}>
					Todos los resultados
				</LinkText>
			)}
			<VStack spacing="1.25rem" align="stretch" px="0.75rem">
				<VStack spacing="0.25rem" align="stretch">
					<Skeleton height="1.25rem" isLoaded={!isLoading} mb="0.5rem">
						<Text textStyle="heading5">Restaurantes en Madrid</Text>
					</Skeleton>
					{isLoading ? (
						<Skeleton height="1.25rem" w="15rem" />
					) : (
						<React.Fragment>
							{sortBy === null ? (
								<Text textStyle="body1" color="gray.500">
									{`${itemsFound} resultados encontrados`}
								</Text>
							) : (
								<Text textStyle="body1" color="gray.500">
									{sortText}
								</Text>
							)}
						</React.Fragment>
					)}
				</VStack>
				{sortBy === null && (
					<HStack w="100%">
						<VStack w="fit-content">
							<IconButton
								icon={<FiAward />}
								aria-label="feature"
								variant="default-light"
								size="lg"
								onClick={() => handleSortBy('visits')}
							/>
							<Text textStyle="body2" fontWeight="medium" w="70%" textAlign="center">
								Más visitados
							</Text>
						</VStack>
						<VStack w="fit-content">
							<IconButton
								icon={<FiThumbsUp />}
								aria-label="feature"
								variant="default-light"
								size="lg"
								onClick={() => handleSortBy('rating')}
							/>
							<Text textStyle="body2" fontWeight="medium" w="70%" textAlign="center">
								Mejor calificados
							</Text>
						</VStack>
						<VStack w="fit-content">
							<IconButton
								icon={<FiSmile />}
								aria-label="feature"
								variant="default-light"
								size="lg"
								onClick={() => handleSortBy('new')}
							/>
							<Text textStyle="body2" fontWeight="medium" w="70%" textAlign="center">
								Nuevos en Resdy
							</Text>
						</VStack>
					</HStack>
				)}
				<HStack>
					<HStack>
						<RestaurantTypeFilterButton
							options={typeFilterOptions}
							onChange={(value: string | null) => dispatch(mapNavigationActions.setTypeFilter(value))}
						/>
					</HStack>
				</HStack>
			</VStack>
			{children}
		</VStack>
	);
};
