import React from 'react';

import { Avatar, HStack, VStack, Text, Box, Icon, Textarea, IconButton, Divider } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

import { RatingRecord, RatingUpdateRecord } from '../../../types/rating';
import { ContentContainer } from '../ContentContainer/ContentContainer';

interface IProps {
	rating: RatingRecord;
	canAnswer?: boolean;
	onReply?: (ratingId: string, input: RatingUpdateRecord) => void;
}

export const RatingCard: React.FC<IProps> = (props) => {
	const { rating, canAnswer, onReply } = props;
	const [reply, setReply] = React.useState<string>('');

	const formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return (
		<ContentContainer p="1.5rem">
			<VStack align="stretch" spacing="1rem" w="100%">
				<HStack justifyContent="space-between">
					<HStack>
						<Avatar size="sm" src={rating.user_info?.avatar_url ?? 'https://bit.ly/broken-link'} />
						<VStack spacing={0} align="stretch">
							<Text textStyle="body2" fontWeight="semibold">
								{`${rating.user_info?.firstname} ${rating.user_info?.lastname}`}
							</Text>
							<HStack alignItems="center" spacing="0.25rem">
								<RatingStarsIndicator rating={rating.rating ?? 0} />
								<Text textStyle="body3" color="gray.500">
									-
								</Text>
								<Text textStyle="body3" color="gray.500">
									{`${formatter.format(new Date(rating.created_at ?? ''))}`}
								</Text>
							</HStack>
						</VStack>
					</HStack>
				</HStack>
				<Text textStyle="body1" fontWeight="semibold" color="gray.800">
					{rating.title}
				</Text>
				<Text textStyle="body1" color="gray.500">
					{rating.comment}
				</Text>
				{rating.answer && (
					<HStack align="start">
						<VStack align="end" spacing="0.25rem" w="100%">
							<Box bg="gray.100" w="100%" borderRadius="0.5rem" p="0.75rem">
								<Text color="gray.800" textStyle="body1">
									{rating.answer}
								</Text>
							</Box>
							<Text textStyle="body3" color="gray.500">{`${formatter.format(new Date(rating.replied_at ?? ''))}`}</Text>
						</VStack>
						<Avatar size="sm" src="https://bit.ly/broken-link" />
					</HStack>
				)}
				{canAnswer && !rating.answer && (
					<>
						<Divider borderColor="brand-gray.200" />
						<HStack alignItems="start">
							<Textarea
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									setReply(e.target.value);
								}}
							/>
							<IconButton
								isDisabled={reply === ''}
								variant="default-light"
								aria-label="reply"
								icon={<Icon as={FiSend} />}
								onClick={() =>
									onReply &&
									onReply(rating.id, {
										id: rating.id,
										answer: reply,
										comment: rating.comment,
										rating: rating.rating,
										title: rating.title,
									})
								}
							/>
						</HStack>
					</>
				)}
			</VStack>
		</ContentContainer>
	);
};

export const RatingStarsIndicator: React.FC<{ rating: number }> = (props) => {
	const { rating } = props;
	const stars = Array.from({ length: 5 }, (_, index) => {
		if (index < rating) return <Icon key={index} as={FaStar} color="yellow.400" />;
		return <Icon key={index} as={FaRegStar} color="gray.300" />;
	});
	return <HStack spacing="0rem">{stars}</HStack>;
};
