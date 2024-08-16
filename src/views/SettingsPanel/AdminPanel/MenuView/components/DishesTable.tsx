import React from 'react';

import { Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { FiEdit2, FiEye, FiEyeOff, FiMoreVertical, FiTrash2 } from 'react-icons/fi';

import { DishEditModal } from './DishEditModal';
import { ColumnLayout, CustomTable, SortBy } from '../../../../../common/components/CustomTable/CustomTable';
import { MessageModal } from '../../../../../common/components/MessageModal/MessageModal';
import { useMenuDishes } from '../../../../../hooks/useMenuDishes';
import { setSelectedDish } from '../../../../../store/admin/reducer';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { DishOutput, DishUpdateInput } from '../../../../../types/dishes';

interface IProps {
	dishes?: Array<DishOutput>;
}

export const DishesTable: React.FC<IProps> = ({ dishes }) => {
	const [sortBy, setSortBy] = React.useState<SortBy>({
		column: 'name',
		direction: 'asc',
	});

	const selectedDish = useAppSelector((state) => state.admin.selectedDish);
	const { deleteDishMutation, updateDishMutation } = useMenuDishes();
	const dispatch = useAppDispatch();

	const {
		isOpen: updateDishModalIsOpen,
		onClose: updateDishModalOnClose,
		onOpen: updateDishModalOnOpen,
	} = useDisclosure();

	const {
		isOpen: deleteDishModalIsOpen,
		onClose: deleteDishModalOnClose,
		onOpen: deleteDishModalOnOpen,
	} = useDisclosure();

	const columnsLayout: Array<ColumnLayout> = [
		{ key: 'name', label: 'Nombre', colSpan: 7, align: 'start', isSortable: true },
		{ key: 'category', label: 'Categoría', colSpan: 1, align: 'center', isSortable: true },
		{ key: 'price', label: 'Precio', colSpan: 1, align: 'center', isSortable: true },
		{ key: 'is_active', label: 'Activo', colSpan: 1, align: 'center', isSortable: true },
		{ colSpan: 1, align: 'end', isSortable: false },
	];

	const sortedAndFilteredDishes = React.useMemo(() => {
		const sortedDishes = dishes?.sort((a, b) => {
			const getValue = (item, column) => {
				if (column === 'category') {
					return item.category.label;
				} else if (column === 'price') {
					return parseFloat(item.price.replace('€', ''));
				} else {
					return item[column];
				}
			};

			if (sortBy.direction === 'asc') {
				return getValue(a, sortBy.column) > getValue(b, sortBy.column) ? 1 : -1;
			} else {
				return getValue(a, sortBy.column) < getValue(b, sortBy.column) ? 1 : -1;
			}
		});

		return sortedDishes;
	}, [dishes, sortBy]);

	return (
		<React.Fragment>
			<CustomTable columnsLayout={columnsLayout} sortBy={sortBy} setSortBy={setSortBy}>
				{sortedAndFilteredDishes?.map((dish) => (
					<CustomTable.Row
						key={dish.id}
						cells={[
							{ type: 'text', content: dish.name },
							{ type: 'text', content: dish.category.label },
							{ type: 'text', content: dish.price, suffix: '€' },
							{
								type: 'component',
								content: (
									<IconButton
										aria-label="hide-unhide"
										variant="ghost"
										onClick={() =>
											updateDishMutation({
												hide: dish.is_active,
												name: dish.name,
												price: dish.price,
												description: dish.description,
												allergen: dish.allergen,
												dishId: dish.id,
											})
										}
									>
										<Icon as={dish.is_active ? FiEye : FiEyeOff} />
									</IconButton>
								),
							},
							{
								type: 'component',
								content: (
									<Menu>
										<MenuButton as={IconButton} aria-label="more-options" variant="ghost">
											<Flex alignItems="center" justifyContent="center">
												<Icon as={FiMoreVertical} h="1.25rem" w="1.25rem" strokeWidth="1.5px" alignItems="center" />
											</Flex>
										</MenuButton>
										<MenuList>
											<MenuItem
												icon={<Icon as={FiEdit2} h="1rem" w="1rem" />}
												onClick={() => {
													dispatch(setSelectedDish(dish));
													updateDishModalOnOpen();
												}}
											>
												Editar
											</MenuItem>
											<MenuItem
												icon={<Icon as={FiTrash2} h="1rem" w="1rem" />}
												onClick={() => {
													dispatch(setSelectedDish(dish));
													deleteDishModalOnOpen();
												}}
											>
												Eliminar
											</MenuItem>
										</MenuList>
									</Menu>
								),
							},
						]}
					/>
				))}
			</CustomTable>
			<DishEditModal
				isOpen={updateDishModalIsOpen}
				onClose={updateDishModalOnClose}
				handleUpdateDish={(args: DishUpdateInput) => updateDishMutation(args)}
			/>
			<MessageModal
				title="Eliminar plato"
				bodyText="¿Estás seguro de que deseas eliminar este plato?"
				type="warning"
				isOpen={deleteDishModalIsOpen}
				onClose={deleteDishModalOnClose}
				firstActionButton={{
					title: 'Eliminar',
					action: () => {
						if (selectedDish) {
							deleteDishMutation(selectedDish.id);
							deleteDishModalOnClose();
							dispatch(setSelectedDish(null));
						}
					},
				}}
				secondActionButton={{
					title: 'Cancelar',
					action: () => {
						deleteDishModalOnClose();
						dispatch(setSelectedDish(null));
					},
				}}
			/>
		</React.Fragment>
	);
};
