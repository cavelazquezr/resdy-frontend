import React from 'react';

import { HStack, Icon, VStack, Text, Divider, Flex, useToken, Box, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { FiBarChart, FiMessageSquare } from 'react-icons/fi';

import { ContentContainer } from '../../../../../common/components/ContentContainer/ContentContainer';
import { HalfPieChart } from '../../../../../common/components/HalfPieChart/HalfPieChart';
import { HorizontalBars } from '../../../../../common/components/HorizontalBars/HorizontalBars';
import { useRatings } from '../../../../../hooks/useRatings';

export const RatingsSidebar: React.FC = () => {
	const colors = useToken('colors', ['green.400', 'gray.300']);

	const { stats: restautantStats } = useRatings();

	if (!restautantStats)
		return (
			<ContentContainer p="1.5rem">
				<VStack align="stretch" w="100%" spacing="1rem">
					<Skeleton w="50%" h="1rem" />
					<Divider borderColor="brand-gray.200" />
					<Flex w="100%" h="9rem" justifyContent="center" position="relative">
						<Flex position="relative" overflow="hidden" justifyContent="center">
							<SkeletonCircle size="20rem" />
						</Flex>
					</Flex>
					<Divider borderColor="brand-gray.200" />
					<VStack align="stretch" spacing="1rem">
						<Skeleton w="50%" h="1rem" />
						<Skeleton w="100%" h="0.5rem" />
						<Skeleton w="100%" h="0.5rem" />
						<Skeleton w="100%" h="0.5rem" />
						<Skeleton w="100%" h="0.5rem" />
						<Skeleton w="100%" h="0.5rem" />
					</VStack>
					<Divider borderColor="brand-gray.200" />
					<VStack align="stretch" spacing="1rem">
						<Skeleton w="50%" h="1rem" />
						<HStack justifyContent="space-between">
							<Skeleton w="30%" h="1rem" />
							<Skeleton w="4rem" h="1rem" />
						</HStack>
						<HStack justifyContent="space-between">
							<Skeleton w="30%" h="1rem" />
							<Skeleton w="4rem" h="1rem" />
						</HStack>
					</VStack>
				</VStack>
			</ContentContainer>
		);

	const { rating, rating_count, stats, answered_ratings, unanswered_ratings } = restautantStats;

	const data = [
		{ name: 'rating', value: Number(rating) },
		{ name: 'remaining', value: 5 - Number(rating) },
	];

	return (
		<ContentContainer p="2rem">
			<VStack align="stretch" w="100%" spacing="1rem">
				<HStack>
					<Icon as={FiBarChart} />
					<Text textStyle="body1" fontWeight="medium">
						Resumen
					</Text>
				</HStack>
				<Divider borderColor="brand-gray.200" />
				<Flex w="100%" h="9rem" justifyContent="center" position="relative">
					<HalfPieChart data={data} colors={colors} />
					<VStack position="absolute" bottom="1.5rem">
						<HStack spacing="0.25rem">
							<Text fontSize="2rem" fontWeight="semibold" color="gray.800">
								{rating}
							</Text>
							<Text textStyle="body1" color="gray.800">
								/
							</Text>
							<Text textStyle="body1" color="gray.800">
								5
							</Text>
						</HStack>
						<HStack spacing="0.5rem">
							<Icon as={FiMessageSquare} color="gray.500" />
							<Text textStyle="body1" color="gray.500">
								{`${rating_count} reseñas`}
							</Text>
						</HStack>
					</VStack>
				</Flex>
				<Divider borderColor="brand-gray.200" />
				<VStack align="stretch" spacing="1rem">
					<Text textStyle="body2" color="gray.800">
						Valoración general
					</Text>
					<HorizontalBars stats={stats} />
				</VStack>
				<Divider borderColor="brand-gray.200" />
				<VStack align="stretch" spacing="1rem">
					<Text textStyle="body2" color="gray.800">
						Estados de reseña
					</Text>
					<HStack justifyContent="space-between">
						<HStack>
							<Box w="0.5rem" h="0.5rem" bg="yellow.400" borderRadius="0.25rem" />
							<Text textStyle="body2" color="gray.500">
								Sin responder
							</Text>
						</HStack>
						<Text textStyle="body1" color="gray.800" textAlign="center">
							{unanswered_ratings}
						</Text>
					</HStack>
					<HStack justifyContent="space-between">
						<HStack>
							<Box w="0.5rem" h="0.5rem" bg="green.400" borderRadius="0.25rem" />
							<Text textStyle="body2" color="gray.500" textAlign="center">
								Respondidos
							</Text>
						</HStack>
						<Text textStyle="body1" color="gray.800">
							{answered_ratings}
						</Text>
					</HStack>
				</VStack>
			</VStack>
		</ContentContainer>
	);
};
