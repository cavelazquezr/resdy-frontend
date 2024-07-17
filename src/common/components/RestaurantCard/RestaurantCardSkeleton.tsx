import React from 'react';

import { HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

interface IProps {
	noOfRows?: number;
	size?: 'md' | 'lg';
}

export const RestaurantCardSkeleton: React.FC<IProps> = (props) => {
	const { noOfRows, size } = props;

	const imageSkeletonSize = size ? (size === 'md' ? '5rem' : '10rem') : '10rem';

	return (
		<VStack align="stretch" w="100%" spacing="1rem">
			{Array.from({ length: noOfRows ? noOfRows : 5 }, (_, i) => i + 1).map((_, index) => (
				<HStack key={index} w="100%" alignItems="start" spacing="1rem">
					<Skeleton w={imageSkeletonSize} h={imageSkeletonSize} borderRadius="0.5rem" />
					<VStack align="stretch">
						<Skeleton w="6rem" h="1rem" />
						<SkeletonText w="100%" mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
					</VStack>
				</HStack>
			))}
		</VStack>
	);
};
