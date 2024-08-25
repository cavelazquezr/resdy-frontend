/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
	Button,
	Divider,
	Flex,
	HStack,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import { CategoriesTable } from './components/CategoriesTable';
import { CategoryCreateModal } from './components/CategoryCreateModal';
import { DishCreateModal } from './components/DishCreateModal';
import { DishesTable } from './components/DishesTable';
import { SearchBar } from '../../../../common/components/SearchBar/SearchBar';
import { useMenuCategories } from '../../../../hooks/useMenuCategories';
import { useMenuDishes } from '../../../../hooks/useMenuDishes';
import { CategoryCreateInput, MyCategoriesRecord } from '../../../../types/categories';
import { DishCreateInput, DishOutput } from '../../../../types/dishes';

type TabContent = {
	label: string;
	description: string;
	component: React.ReactNode;
};

const CategoriesTab = ({ categories }: { categories?: Array<MyCategoriesRecord> }) => {
	return <CategoriesTable categories={categories} />;
};

const DishesTab = ({ dishes }: { dishes?: Array<DishOutput> }) => {
	return <DishesTable dishes={dishes} />;
};

export const MenuView: React.FC = () => {
	const [tabIndex, setTabIndex] = React.useState<number>(0);
	const [filters, setFilters] = React.useState<any | undefined>();

	// Create category modal
	const {
		isOpen: createCategoryModalIsOpen,
		onClose: createCategoryModalOnClose,
		onOpen: createCategoryModalOnOpen,
	} = useDisclosure();

	// Create dish modal
	const {
		isOpen: createDishModalIsOpen,
		onClose: createDishModalOnClose,
		onOpen: createDishModalOnOpen,
	} = useDisclosure();

	const { categories, createCategoryMutation } = useMenuCategories(filters);
	const { dishes, createDishMutation } = useMenuDishes(filters);

	const handleCreateCategory = async (args: CategoryCreateInput) => {
		await createCategoryMutation(args);
		createCategoryModalOnClose();
	};

	const handleCreateDish = async (args: DishCreateInput) => {
		await createDishMutation(args);
		createDishModalOnOpen();
	};

	const handleSetSearchFilter = (input: any) => {
		setFilters({
			...filters,
			input,
		});
	};

	const tabContent: TabContent[] = [
		{
			label: 'Categorías',
			description: 'Organiza las categorías de platos de tu restaurante.',
			component: <CategoriesTab categories={categories} />,
		},
		{
			label: 'Platos',
			description: 'Organiza los platos de tu restaurante.',
			component: <DishesTab dishes={dishes} />,
		},
	];

	return (
		<React.Fragment>
			<VStack align="stretch">
				<VStack align="stretch">
					<Text textStyle="heading6" color="gray.900">
						{tabContent[tabIndex].label}
					</Text>
					<Text textStyle="body1" color="gray.500">
						{tabContent[tabIndex].description}
					</Text>
					<Divider borderColor="brand-gray.200" my="0.5rem" />
				</VStack>
				<Tabs variant="unstyled" colorScheme="green" position="relative">
					<HStack spacing="25%">
						<Flex
							position="relative"
							bg="gray.100"
							w="fit-content"
							py="0.25rem"
							px="0.5rem"
							alignItems="center"
							borderRadius="0.5rem"
						>
							<TabList zIndex={2}>
								{tabContent.map((tab, index) => (
									<Tab minW="10rem" key={index + 5} onClick={() => setTabIndex(index)}>
										{tab.label}
									</Tab>
								))}
							</TabList>
							<TabIndicator
								position="absolute"
								zIndex={1}
								height="2rem"
								bg="white"
								borderRadius="0.25rem"
								boxShadow="0 4px 10px #8F8F8F33"
							/>
						</Flex>
						<HStack w="100%" spacing="1rem">
							<SearchBar
								filters={filters}
								searchPlaceholder={tabIndex === 0 ? 'Buscar categoría' : 'Buscar plato'}
								handleSetFilter={handleSetSearchFilter}
								hideCitySelect
								hideDatePicker
							/>
							<Button
								variant="primary"
								rightIcon={<FiPlus />}
								w="10rem"
								onClick={() => {
									if (tabIndex === 0) {
										createCategoryModalOnOpen();
									} else {
										createDishModalOnOpen();
									}
								}}
							>
								Crear
							</Button>
						</HStack>
					</HStack>

					<TabPanels>
						{tabContent.map((tab, index) => (
							<TabPanel p={0} mt="1rem" key={index + 6}>
								{tab.component}
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
			</VStack>
			<CategoryCreateModal
				isOpen={createCategoryModalIsOpen}
				onClose={createCategoryModalOnClose}
				handleCreateCategory={handleCreateCategory}
			/>
			<DishCreateModal
				isOpen={createDishModalIsOpen}
				onClose={createDishModalOnClose}
				handleCreateDish={handleCreateDish}
			/>
		</React.Fragment>
	);
};
