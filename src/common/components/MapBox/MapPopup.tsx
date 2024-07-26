import React from 'react';

import {
	Box,
	Button,
	HStack,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Text,
	VStack,
} from '@chakra-ui/react';

import { actions as mapNavigationActions } from '../../../store/mapNavigation/reducer';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { RestaurantCardOutput } from '../../../types/common';
import { RestaurantSummary } from '../RestaurantSummary/RestaurantSummary';
import { SuperLink } from '../SuperLink/SuperLink';

interface IProps {
	detail: RestaurantCardOutput<unknown>;
	isHovered: boolean;
}

export const MapPopup: React.FC<IProps> = (props) => {
	const { detail, isHovered } = props;
	const { selectedRestaurant } = useAppSelector((state) => state.mapNavigation);
	const dispatch = useAppDispatch();

	const isSelected = selectedRestaurant !== null && selectedRestaurant === detail.id;

	return (
		<Box position="relative" zIndex={isSelected ? 1000 : 1}>
			<Popover
				placement="top"
				isOpen={detail.id === selectedRestaurant}
				openDelay={3000}
				onClose={() => {
					dispatch(mapNavigationActions.resetSelectedRestaurant());
				}}
				closeOnBlur
			>
				<PopoverTrigger>
					<Box
						bg={isSelected ? 'gray.700' : 'brand-primary.500'}
						p="0.25rem 0.5rem"
						borderRadius="0.5rem"
						transition="all 0.2s"
						transform={isHovered || isSelected ? 'scale(1.2)' : 'scale(1)'}
						_hover={{ transform: 'scale(1.2)', bg: isSelected ? 'gray.500' : 'brand-primary.300' }}
						onClick={() => {
							dispatch(mapNavigationActions.setSelectedRestaurant(detail.id));
							dispatch(mapNavigationActions.setLastSelectedRestaurant(detail.id));
						}}
					>
						<Text textStyle="body2" color="white" fontWeight="medium">
							{detail.summary.rating.toFixed(1)}
						</Text>
					</Box>
				</PopoverTrigger>
				<PopoverContent borderRadius="0.5rem">
					<PopoverArrow />
					<PopoverBody overflow="hidden" p="0rem" borderRadius="0.5rem">
						<VStack align="stretch" spacing="0rem" overflow="hidden" w="100%">
							{detail.headers_url && detail.headers_url[0] ? (
								<Image src={detail.headers_url[0] ?? ''} alt={detail.name} w="100%" h="10rem" objectFit="cover" />
							) : (
								<Box bg="gray.200" w="100%" h="10rem" />
							)}
							<VStack padding="1rem" align="stretch">
								<Text textStyle="heading6" color="gray.900">
									{detail.brand_name}
								</Text>
								<RestaurantSummary
									rating={detail.summary.rating}
									ratingCount={detail.summary.rating_count}
									priceAverage={detail.summary.price_average}
									restaurantType={detail.restaurant_type}
									address={detail.address}
									city={detail.city}
								/>
								<HStack>
									<SuperLink to={`/restaurant/${detail.name}/home`} w="100%">
										<Button w="100%" variant="default-light">
											Ver
										</Button>
									</SuperLink>
								</HStack>
							</VStack>
						</VStack>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
};
