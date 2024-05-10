import React from 'react';

import { Image, Text, HStack, Box, VStack } from '@chakra-ui/react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { ContentContainer } from '../../../../common/components/ContentContainer/ContentContainer';
import { IconLabel } from '../../../../common/components/IconLabel/IconLabel';
import { RestaurantSummary } from '../../../../common/components/RestaurantSummary/RestaurantSummary';
import { StatusBadge } from '../../../../common/components/StatusBadge/StatusBadge';
import { SuperLink } from '../../../../common/components/SuperLink/SuperLink';
import { MyReservationOutput } from '../../../../types/reservation';

interface IProps {
	reservation: MyReservationOutput;
}

export const RestaurantCard: React.FC<IProps> = (props) => {
	const { reservation } = props;

	const formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<ContentContainer>
			<Box position="relative">
				<Box position="absolute" top="0.5rem" left="0.5rem">
					<StatusBadge status={reservation.status || 'to_be_confirmed'} />
				</Box>
				<Image
					objectFit="cover"
					borderRadius="0.5rem"
					w={{ base: '100%', xs: '12rem' }}
					h={{ base: '100%', xs: '12rem' }}
					src={reservation.header_url}
					alt={reservation.name}
				/>
			</Box>
			<Box p="0rem 0rem 0rem 1rem">
				<HStack justifyContent="space-between" alignItems="center" h="100%">
					<VStack align="stretch" spacing="0.35rem" justifyContent="center">
						<SuperLink to={`/restaurant/${reservation.name}/home`}>
							<Text _hover={{ color: 'brand-primary.default' }} transition="all 0.2s" textStyle="heading6">
								{reservation.brand_name}
							</Text>
						</SuperLink>
						<RestaurantSummary
							rating={reservation.rating_info?.rating ?? 0}
							ratingCount={reservation.rating_info?.rating_count ?? 0}
							priceAverage={reservation.price_average}
							restaurantType={reservation.restaurant_type ?? ''}
							address={reservation.address ?? ''}
							city={reservation.city ?? ''}
						/>
						<VStack align="stretch">
							<IconLabel icon={FiCalendar} label={formatter.format(new Date(reservation.date_of_reservation ?? ''))} />
							<IconLabel
								icon={FiClock}
								label={new Date(reservation.date_of_reservation ?? '').toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							/>
							<IconLabel icon={FiUser} label={reservation.number_of_person.toString()} />
						</VStack>
					</VStack>
				</HStack>
			</Box>
		</ContentContainer>
	);
};
