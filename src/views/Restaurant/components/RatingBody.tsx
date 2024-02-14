import React from 'react';

import { Avatar, HStack, VStack, Text, Box } from '@chakra-ui/react';

import { RatingOutput } from '../../../types/rating';

interface IProps {
	rating: RatingOutput;
}

export const RatingBody: React.FC<IProps> = (props) => {
	const { rating } = props;
	const formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return (
		<VStack align="stretch">
			<HStack justifyContent="space-between">
				<HStack>
					<Avatar size="sm" src={rating.user_info?.avatar_url ?? 'https://bit.ly/broken-link'} />
					<VStack spacing={0} align="stretch">
						<Text textStyle="body2" fontWeight="semibold">
							{`${rating.user_info?.firstname} ${rating.user_info?.lastname}`}
						</Text>
						<Text textStyle="body3" color="gray.500">
							{`${formatter.format(new Date(rating.created_at ?? ''))}`}
						</Text>
					</VStack>
				</HStack>
				<HStack spacing={0} align="end">
					<Text textStyle="body1" fontWeight="semibold">
						{rating.rating}
					</Text>
					<Text textStyle="body3">/5</Text>
				</HStack>
			</HStack>
			<Text textStyle="body1" fontWeight="semibold">
				{rating.title}
			</Text>
			<Text textStyle="body1" color="gray.500">
				{rating.comment}
			</Text>
			{rating.answer && (
				<HStack align="start">
					<VStack align="end" spacing="0.25rem" w="100%">
						<Box bg="gray.200" w="100%" borderRadius="0.5rem" p="0.75rem">
							<Text color="gray.900" textStyle="body1">
								{rating.answer}
							</Text>
						</Box>
						<Text textStyle="body3" color="gray.500">{`${formatter.format(new Date(rating.replied_at ?? ''))}`}</Text>
					</VStack>
					<Avatar size="sm" src="https://bit.ly/broken-link" />
				</HStack>
			)}
		</VStack>
	);
};
