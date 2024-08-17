import React from 'react';

import { Grid, GridItem, VStack, Box, HStack, Menu, MenuButton, Button, MenuItem, MenuList } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { RatingsSidebar } from './components/RatingsSidebar';
import { RatingCard } from '../../../../common/components/RatingCard/RatingCard';
import { useRatings } from '../../../../hooks/useRatings';
import { RatingUpdateRecord } from '../../../../types/rating';

export const RatingsView: React.FC = () => {
	const { ratings, updateRatingMutation } = useRatings();
	const [orderBy, setOrderBy] = React.useState<'Más recientes' | 'Mejor calificados' | 'Peor calificados'>(
		'Más recientes',
	);

	const handleReplyRating = async (ratingId: string, input: RatingUpdateRecord) => {
		await updateRatingMutation({ id: ratingId, ...input });
	};

	const sortedRatings = React.useMemo(() => {
		if (ratings) {
			return [...ratings].sort((a, b) => {
				switch (orderBy) {
					case 'Más recientes':
						return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
					case 'Mejor calificados':
						return (b.rating ?? 0) - (a.rating ?? 0);
					case 'Peor calificados':
						return (a.rating ?? 0) - (b.rating ?? 0);
					default:
						return 0;
				}
			});
		}
		return [];
	}, [ratings, orderBy]);

	return (
		<Grid templateColumns="repeat(3, 1fr)" gap="2rem">
			<GridItem colSpan={1}>
				<RatingsSidebar />
			</GridItem>
			<GridItem colSpan={2}>
				<VStack align="stretch" spacing="1rem">
					<HStack px="1rem">
						<Menu>
							<MenuButton as={Button} variant="default-light" rightIcon={<FiChevronDown />}>
								{orderBy}
							</MenuButton>
							<MenuList>
								<MenuItem onClick={() => setOrderBy('Más recientes')}>Más recientes</MenuItem>
								<MenuItem onClick={() => setOrderBy('Mejor calificados')}>Mejor calificados</MenuItem>
								<MenuItem onClick={() => setOrderBy('Peor calificados')}>Peor calificados</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
					<Box overflowY="scroll" h="80vh" px="1rem">
						<VStack align="stretch" spacing="1rem">
							{sortedRatings.map((rating) => (
								<RatingCard key={rating.id} rating={rating} canAnswer onReply={handleReplyRating} />
							))}
						</VStack>
					</Box>
				</VStack>
			</GridItem>
		</Grid>
	);
};
