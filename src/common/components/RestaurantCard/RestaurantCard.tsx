/* eslint-disable max-len */
import React from 'react';

import { Image, Text, HStack, Box, VStack } from '@chakra-ui/react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { RestaurantCardOutput } from '../../../types/common';
import { RatingDetailOutput } from '../../../types/rating';
import { ReservationDetailOutput } from '../../../types/reservation';
import { ContentContainer } from '../ContentContainer/ContentContainer';
import { IconLabel } from '../IconLabel/IconLabel';
import { RestaurantSummary } from '../RestaurantSummary/RestaurantSummary';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { SuperLink } from '../SuperLink/SuperLink';

interface IProps {
	record: RestaurantCardOutput<RatingDetailOutput | ReservationDetailOutput | unknown>;
	navigateToRestaurantView?: boolean;
	showStatus?: boolean;
	showCity?: boolean;
	isActive?: boolean;
	onEditRecord?: (id: string) => void;
	onHover?: (id: string | undefined) => void;
	onClick?: (restaurant: RestaurantCardOutput<RatingDetailOutput | ReservationDetailOutput | unknown>) => void;
}

export const RestaurantCard: React.FC<IProps> = (props) => {
	const { record, navigateToRestaurantView, showStatus, showCity, isActive, onEditRecord, onHover, onClick } = props;
	const { restaurant_type, brand_name, address, city, detail } = record;
	const { rating, rating_count, price_average } = record.summary;

	const formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<SuperLink
			onClick={onClick ? () => onClick(record) : undefined}
			to={navigateToRestaurantView && !onClick ? `/restaurant/${record.name}/home` : ''}
			_hover={{ transform: 'scale(1.015)' }}
			onMouseEnter={onHover ? () => onHover(record.id) : undefined}
			onMouseLeave={onHover ? () => onHover(undefined) : undefined}
		>
			<ContentContainer
				_hover={{ bg: 'brand-primary.50' }}
				onClick={onEditRecord ? () => onEditRecord(record.id) : undefined}
				transition="all 0.2s"
				bg={isActive ? 'brand-primary.50' : undefined}
			>
				<Box position="relative">
					{showStatus && (
						<Box position="absolute" top="0.5rem" left="0.5rem">
							<StatusBadge status={record.status || 'to_be_confirmed'} />
						</Box>
					)}
					<Image
						objectFit="cover"
						borderRadius="0.5rem"
						w={{ base: '100%', xs: '12rem' }}
						h={{ base: '100%', xs: '12rem' }}
						src={record.headers_url ? record.headers_url[0] : undefined}
						alt={record.name}
					/>
				</Box>
				<Box p="0rem 0rem 0rem 1rem">
					<HStack justifyContent="space-between" alignItems="center" h="100%">
						<VStack align="stretch" spacing="0.75rem" h="100%" alignContent="start" py="0.5rem">
							<Text textStyle="heading6">{brand_name}</Text>
							<RestaurantSummary
								rating={rating ?? 0}
								ratingCount={rating_count ?? 0}
								priceAverage={price_average}
								restaurantType={restaurant_type ?? ''}
								address={address ?? ''}
								city={city ?? ''}
								showCity={showCity}
							/>
							{!!detail && (
								<VStack align="stretch">
									{(detail as ReservationDetailOutput).date_of_reservation && (
										<React.Fragment>
											<IconLabel
												icon={FiCalendar}
												label={formatter.format(
													new Date((detail as ReservationDetailOutput).date_of_reservation ?? ''),
												)}
											/>
											<IconLabel
												icon={FiClock}
												label={new Date(
													(detail as ReservationDetailOutput).date_of_reservation ?? '',
												).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											/>
										</React.Fragment>
									)}
									{(detail as ReservationDetailOutput).number_of_person && (
										<IconLabel icon={FiUser} label={(detail as ReservationDetailOutput).number_of_person.toString()} />
									)}
								</VStack>
							)}
						</VStack>
					</HStack>
				</Box>
			</ContentContainer>
		</SuperLink>
	);
};
