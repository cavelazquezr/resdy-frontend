import React from 'react';

import { HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

interface IProps {
	noOfRows?: number;
}

export const RestaurantCardSkeleton: React.FC<IProps> = (props) => {
	const { noOfRows } = props;
	return (
		<VStack align="stretch" w="100%" spacing="1rem">
			{Array.from({ length: noOfRows ? noOfRows : 5 }, (_, i) => i + 1).map((_, index) => (
				<HStack key={index} alignItems="start" h="100%" spacing="1rem">
					<Skeleton w="10rem" h="10rem" borderRadius="0.5rem" />
					<VStack align="stretch">
						<Skeleton w="6rem" h="1rem" />
						<SkeletonText w="15rem" mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
					</VStack>
				</HStack>
			))}
		</VStack>
	);
};
