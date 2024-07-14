import React from 'react';

import { Box, Flex, Grid, GridItem, HStack, Icon, Text, useToken } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FiMessageSquare } from 'react-icons/fi';

import { RatingStatsOutput } from '../../../types/rating';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
	stats: RatingStatsOutput;
	colorScheme?: string;
}

export const RatingChart: React.FC<IProps> = (props) => {
	const { stats, colorScheme } = props;
	const totalRating =
		stats.stats &&
		Object.entries(stats.stats).reduce((sum, [rating, count]) => {
			return sum + parseInt(rating, 10) * count;
		}, 0);
	const maxRating = stats.rating_count * 5;
	const remainingRating = maxRating - (totalRating ?? 0);

	const [brandSecondary100, brandSecondaryDefault] = useToken('colors', [
		`${colorScheme ? colorScheme : 'brand-secondary'}.100`,
		`${colorScheme ? colorScheme : 'brand-secondary'}.${colorScheme?.includes('brand') ? 'default' : '500'}`,
	]);
	const dataSet = {
		labels: ['Max', 'Total'],
		datasets: [
			{
				label: 'Rating',
				data: [maxRating, remainingRating],
				backgroundColor: [brandSecondaryDefault, brandSecondary100],
			},
		],
	};
	const options = {
		cutout: '70%',
		plugins: {
			tooltip: {
				enabled: false,
			},
			legend: {
				display: false,
			},
		},
		events: [],
	};

	return (
		<Flex h="13rem" my="2rem" gap="2rem" alignItems="center">
			<Box position="relative">
				<Box position="absolute" w="100%" h="100%">
					<Flex justifyContent="center" flexDir="column" alignItems="center" w="100%" h="100%" gap="0.5rem">
						<HStack align="end" spacing="0.25rem">
							<Text fontSize="2rem" fontWeight="semibold" lineHeight="2rem">
								{stats.rating}
							</Text>
							<Text textStyle="body1" lineHeight="2rem">
								/5
							</Text>
						</HStack>
						<HStack align="center" spacing="0.25rem">
							<Icon color="gray.500" as={FiMessageSquare} />
							<Text textStyle="body1" color="gray.500">
								{stats.rating_count}
							</Text>
						</HStack>
					</Flex>
				</Box>
				<Box w="13rem">
					<Doughnut data={dataSet} options={options} />
				</Box>
			</Box>
			{stats.stats && <HorizontalBars stats={stats.stats} colorScheme={colorScheme} />}
		</Flex>
	);
};

const HorizontalBars: React.FC<{ stats: Record<number, number>; colorScheme?: string }> = (props) => {
	const { stats, colorScheme } = props;

	const maxValue = Math.max(...Object.values(stats));

	const sortedKeys = Object.keys(stats)
		.map(Number)
		.sort((a, b) => b - a);

	return (
		<Grid templateColumns="1fr 10fr" w="100%" h="80%">
			{sortedKeys.map((key, index) => (
				<React.Fragment key={index}>
					<GridItem>{key}</GridItem>
					<GridItem>
						<Box
							w="100%"
							h="1.25rem"
							bg={`${colorScheme ? colorScheme : 'brand-secondary'}.100`}
							borderRadius="0.25rem"
							overflow="hidden"
						>
							<Box
								bg={`${colorScheme ? colorScheme : 'brand-secondary'}.${
									colorScheme?.includes('brand') ? 'default' : '500'
								}`}
								h="100%"
								borderRadius="0.25rem"
								w={`${(stats[key] * 100) / maxValue}%`}
							/>
						</Box>
					</GridItem>
				</React.Fragment>
			))}
		</Grid>
	);
};
