import React from 'react';

import { Box, Grid, GridItem } from '@chakra-ui/react';

interface IProps {
	stats: Record<number, number>;
	colorScheme?: string;
}

export const HorizontalBars: React.FC<IProps> = (props) => {
	const { stats, colorScheme } = props;

	const maxValue = Math.max(...Object.values(stats));

	const sortedKeys = Object.keys(stats)
		.map(Number)
		.sort((a, b) => b - a);

	return (
		<Grid templateColumns="1fr 10fr" w="100%" h="80%" rowGap="0.5rem" alignItems="center">
			{sortedKeys.map((key, index) => (
				<React.Fragment key={index}>
					<GridItem>{key}</GridItem>
					<GridItem>
						<Box w="100%" h="0.5rem" bg="gray.300" borderRadius="0.25rem" overflow="hidden">
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
