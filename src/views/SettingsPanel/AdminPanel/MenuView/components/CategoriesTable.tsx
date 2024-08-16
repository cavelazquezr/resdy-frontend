import React from 'react';

import { Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { FiEdit2, FiEye, FiEyeOff, FiMoreVertical, FiTrash2 } from 'react-icons/fi';

import { CategoryEditModal } from './CategoryEditModal';
import { ColumnLayout, CustomTable, SortBy } from '../../../../../common/components/CustomTable/CustomTable';
import { MessageModal } from '../../../../../common/components/MessageModal/MessageModal';
import { useMenuCategories } from '../../../../../hooks/useMenuCategories';
import { setSelectedCategory } from '../../../../../store/admin/reducer';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { WithIsUsed } from '../../../../../types';
import { CategoryUpdateInput, MyCategoriesRecord } from '../../../../../types/categories';

interface IProps {
	categories?: WithIsUsed<MyCategoriesRecord>[];
}

export const CategoriesTable: React.FC<IProps> = ({ categories }) => {
	const [sortBy, setSortBy] = React.useState<SortBy>({
		column: 'label',
		direction: 'asc',
	});

	const selectedCategory = useAppSelector((state) => state.admin.selectedCategory);
	const { updateCategoryMutation, deleteCategoryMutation } = useMenuCategories();
	const dispatch = useAppDispatch();

	const {
		isOpen: updateCategoryModalIsOpen,
		onClose: updateCategoryModalOnClose,
		onOpen: updateCategoryModalOnOpen,
	} = useDisclosure();

	const {
		isOpen: deleteCategoryModalIsOpen,
		onClose: deleteCategoryModalOnClose,
		onOpen: deleteCategoryModalOnOpen,
	} = useDisclosure();

	const columnsLayout: Array<ColumnLayout> = [
		{ key: 'label', label: 'Categoría', colSpan: 7, align: 'start', isSortable: true },
		{ key: 'dishes', label: 'Platos', colSpan: 1, align: 'center', isSortable: true },
		{ key: 'is_active', label: 'Activo', colSpan: 1, align: 'center', isSortable: true },
		{ colSpan: 1, align: 'end', isSortable: false },
	];

	const sortedAndFilteredCategories = React.useMemo(() => {
		const sortedCategories = categories?.sort((a, b) => {
			if (sortBy.direction === 'asc') {
				return a[sortBy.column] > b[sortBy.column] ? 1 : -1;
			}
			return a[sortBy.column] < b[sortBy.column] ? 1 : -1;
		});

		return sortedCategories;
	}, [categories, sortBy]);

	return (
		<React.Fragment>
			<CustomTable columnsLayout={columnsLayout} sortBy={sortBy} setSortBy={setSortBy}>
				{sortedAndFilteredCategories?.map((category) => (
					<CustomTable.Row
						key={category.id}
						cells={[
							{ type: 'text', content: category.label },
							{ type: 'text', content: category.dishes.toString() },
							{
								type: 'component',
								content: (
									<IconButton
										aria-label="hide-unhide"
										variant="ghost"
										onClick={() =>
											updateCategoryMutation({
												hide: category.is_active,
												label: category.label,
												categoryId: category.id,
											})
										}
									>
										<Icon as={category.is_active ? FiEye : FiEyeOff} />
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
													dispatch(setSelectedCategory(category));
													updateCategoryModalOnOpen();
												}}
											>
												Editar
											</MenuItem>
											<MenuItem
												icon={<Icon as={FiTrash2} h="1rem" w="1rem" />}
												onClick={() => {
													dispatch(setSelectedCategory(category));
													deleteCategoryModalOnOpen();
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
			<CategoryEditModal
				isOpen={updateCategoryModalIsOpen}
				onClose={updateCategoryModalOnClose}
				handleUpdateCategory={(args: CategoryUpdateInput) => updateCategoryMutation(args)}
			/>
			<MessageModal
				title="Eliminar categoría"
				bodyText={
					selectedCategory?.is_used
						? 'No se puede eliminar una categoría ya que hay platos asociados a esta categoría.'
						: '¿Estás seguro de que deseas eliminar esta categoría?'
				}
				type={selectedCategory?.is_used ? 'error' : 'warning'}
				isOpen={deleteCategoryModalIsOpen}
				onClose={deleteCategoryModalOnClose}
				firstActionButton={
					selectedCategory?.is_used
						? {
								title: 'Cerrar',
								action: () => {
									deleteCategoryModalOnClose();
									dispatch(setSelectedCategory(null));
								},
						  }
						: {
								title: 'Eliminar',
								action: () => {
									if (selectedCategory) {
										deleteCategoryMutation(selectedCategory.id);
										deleteCategoryModalOnClose();
										dispatch(setSelectedCategory(null));
									}
								},
						  }
				}
				secondActionButton={
					selectedCategory?.is_used
						? undefined
						: {
								title: 'Cancelar',
								action: () => {
									deleteCategoryModalOnClose();
									dispatch(setSelectedCategory(null));
								},
						  }
				}
			/>
		</React.Fragment>
	);
};
