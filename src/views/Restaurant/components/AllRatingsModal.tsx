import React from 'react';

import {
	Flex,
	Grid,
	GridItem,
	HStack,
	VStack,
	Text,
	Icon,
	useToken,
	Menu,
	MenuButton,
	MenuList,
	Button,
	MenuItem,
} from '@chakra-ui/react';
import { FiChevronDown, FiMessageSquare } from 'react-icons/fi';

import { HalfPieChart } from '../../../common/components/HalfPieChart/HalfPieChart';
import { HorizontalBars } from '../../../common/components/HorizontalBars/HorizontalBars';
import { ModalTemplate } from '../../../common/components/ModalTemplate/ModalTemplate';
import { RatingCard } from '../../../common/components/RatingCard/RatingCard';
import { RatingRecord, RatingStatsOutput } from '../../../types/rating';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	ratings: Array<RatingRecord>;
	stats: RatingStatsOutput;
}

export const AllRatingsModal: React.FC<IProps> = (props) => {
	const { isOpen, onClose, ratings, stats } = props;

	const [orderBy, setOrderBy] = React.useState<'Más recientes' | 'Mejor calificados' | 'Peor calificados'>(
		'Más recientes',
	);

	const colors = useToken('colors', ['green.400', 'gray.300']);

	const data = [
		{ name: 'rating', value: Number(stats.rating) },
		{ name: 'remaining', value: 5 - Number(stats.rating) },
	];

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
		<ModalTemplate
			title="Todas las reseñas"
			isOpen={isOpen}
			size="5xl"
			onClose={() => {
				onClose();
			}}
		>
			<VStack align="stretch" maxH="80vh" overflowY="hidden" spacing="2rem">
				<VStack align="stretch" spacing="2rem">
					<Text textStyle="heading6" color="gray.800">
						Valoración general
					</Text>
					<Grid templateColumns="repeat(2, 1fr)" px="0.5rem" gap="2rem">
						<GridItem colSpan={1}>
							<Flex w="100%" h="9rem" justifyContent="center" position="relative">
								<HalfPieChart data={data} colors={colors} />
								<VStack position="absolute" bottom="1.5rem">
									<HStack spacing="0.25rem">
										<Text fontSize="2rem" fontWeight="semibold" color="gray.800">
											{stats.rating}
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
											{`${stats.rating_count} reseñas`}
										</Text>
									</HStack>
								</VStack>
							</Flex>
						</GridItem>
						<GridItem colSpan={1}>
							<HorizontalBars stats={stats.stats} />
						</GridItem>
					</Grid>
				</VStack>
				<VStack align="stretch" spacing="1rem" overflowY="hidden">
					<HStack justifyContent="space-between">
						<Text textStyle="heading6" color="gray.800">
							Reseñas
						</Text>
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
					<VStack align="stretch" overflowY="scroll" px="0.5rem" pb="1rem">
						{sortedRatings.map((rating, index) => (
							<RatingCard key={index} rating={rating} />
						))}
					</VStack>
				</VStack>
			</VStack>
		</ModalTemplate>
	);
};
