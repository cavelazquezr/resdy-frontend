import React from 'react';

import { Card, Image, CardBody, Heading, Text, HStack, Box, VStack, Icon, Flex } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

import { RestaurantTypeBadge } from '../../../../common/components/RestaurantTypeBadge/RestaurantTypeBadge';
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
		<Card direction={{ base: 'column', xs: 'row' }} overflow="hidden" boxShadow="none">
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
			<CardBody p="0rem 0rem 0rem 1rem">
				<HStack justifyContent="space-between">
					<VStack align="stretch" spacing="0.35rem">
						<RestaurantTypeBadge restaurantType={reservation.restaurant_type ?? ''} />
						<HStack w="100%" justifyContent="space-between">
							<SuperLink to={`/restaurant/${reservation.name}/home`}>
								<Heading size="md">{reservation.brand_name}</Heading>
							</SuperLink>
						</HStack>
						<Text textStyle="body1" color="gray.500">{`Precio medio: ${reservation.price_average}`}</Text>
						<Text textStyle="body1" color="gray.500">{`${reservation.address}, ${reservation.city} - ${formatter.format(
							new Date(reservation.date_of_reservation ?? ''),
						)}`}</Text>
					</VStack>
					<VStack>
						<Flex p="0.75rem" bg="brand-secondary.100" borderRadius="full">
							<Icon as={FaStar} color="brand-secondary.800" />
						</Flex>
						<Text textStyle="heading5" color="black">
							{reservation.rating_info?.rating}
						</Text>
						<HStack align="center" spacing="0.25rem">
							<Icon color="gray.500" as={FiMessageSquare} />
							<Text textStyle="body1" color="gray.500">
								{reservation.rating_info?.rating_count}
							</Text>
						</HStack>
					</VStack>
				</HStack>
			</CardBody>
		</Card>
	);
};
