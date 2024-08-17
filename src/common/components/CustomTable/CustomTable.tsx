/* eslint-disable max-len */
import React from 'react';

import {
	Flex,
	Grid,
	GridItem,
	GridProps,
	HStack,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';
import { HiOutlineSelector } from 'react-icons/hi';

export type SortBy = {
	column: string;
	direction: 'asc' | 'desc';
};

export type ColumnLayout = {
	key?: string;
	label?: string;
	colSpan?: number;
	align?: 'start' | 'center' | 'end';
	isSortable?: boolean;
};

type CellRecord = {
	type: 'text' | 'number' | 'component';
	prefix?: string;
	suffix?: string;
	content: string | number | React.ReactNode;
};

interface ICommonProps {
	alignContent?: 'start' | 'center' | 'end';
}

interface ICustomTableProps extends ICommonProps {
	children: React.ReactNode;
	columnsLayout: Array<ColumnLayout>;
	sortBy?: SortBy;
	setSortBy?: React.Dispatch<React.SetStateAction<SortBy>>;
}

interface IRowProps extends ICommonProps {
	cells: Array<CellRecord>;
	templateColumns?: string;
	columnsLayout?: Array<ColumnLayout>;
}

interface IHeadersProps extends ICommonProps {
	labels?: Array<string>;
	isIndeterminate?: boolean;
	templateColumns?: string;
	columnsLayout?: Array<ColumnLayout>;
	sortBy?: SortBy;
	setSortBy?: React.Dispatch<React.SetStateAction<SortBy>>;
}

const commonGridProps: GridProps = {
	columnGap: '1rem',
};

const CustomTable: React.FC<ICustomTableProps> & {
	Row: React.FC<IRowProps>;
} = ({ children, columnsLayout, sortBy, setSortBy }) => {
	const templateColumns = columnsLayout.map((column) => `${column.colSpan || 1}fr`).join(' ');
	const labels = columnsLayout.map((column) => column.label || '');

	const [allRowsSelected, setAllRowsSelected] = React.useState(false);
	const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());

	const isIndeterminate = selectedRows.size > 0 && selectedRows.size < React.Children.count(children);

	const handleSelectAll = () => {
		setAllRowsSelected(!allRowsSelected);
		if (!allRowsSelected) {
			setSelectedRows(new Set(Array.from({ length: React.Children.count(children) }, (_, i) => i)));
		} else {
			setSelectedRows(new Set());
		}
	};

	const handleRowSelect = (index: number, selected: boolean) => {
		const newSelectedRows = new Set(selectedRows);
		if (selected) {
			newSelectedRows.add(index);
		} else {
			newSelectedRows.delete(index);
		}
		setSelectedRows(newSelectedRows);
		if (newSelectedRows.size < React.Children.count(children)) {
			setAllRowsSelected(false);
		} else if (newSelectedRows.size === React.Children.count(children)) {
			setAllRowsSelected(true);
		}
	};

	const clonedChildren = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child as React.ReactElement, {
				templateColumns,
				isRowSelected: selectedRows.has(index),
				onRowSelect: (selected: boolean) => handleRowSelect(index, selected),
				labels,
				columnsLayout,
			});
		}
		return child;
	});

	return (
		<React.Fragment>
			<Headers
				templateColumns={templateColumns}
				labels={labels}
				onSelectAll={handleSelectAll}
				allRowsSelected={allRowsSelected}
				columnsLayout={columnsLayout}
				isIndeterminate={isIndeterminate}
				sortBy={sortBy}
				setSortBy={setSortBy}
			/>
			{clonedChildren}
		</React.Fragment>
	);
};

const Row: React.FC<IRowProps & { isRowSelected?: boolean; onRowSelect?: (selected: boolean) => void }> = ({
	cells,
	templateColumns,
	columnsLayout,
	isRowSelected,
}) => {
	return (
		<Flex
			position="relative"
			borderBottom="1px solid"
			borderBottomColor="brand-gray.200"
			paddingY="0.5rem"
			backgroundColor={isRowSelected ? 'brand-primary.50' : 'transparent'}
		>
			<Grid width="100%" templateColumns={templateColumns} alignItems="center" paddingX="1rem" {...commonGridProps}>
				{cells.map((cell, index) => (
					<GridItem key={index} textAlign={columnsLayout?.[index]?.align ?? 'start'}>
						{cell.prefix}
						{cell.content}
						{cell.suffix}
					</GridItem>
				))}
			</Grid>
		</Flex>
	);
};

const Headers: React.FC<IHeadersProps & { onSelectAll?: () => void; allRowsSelected?: boolean }> = ({
	labels,
	templateColumns,
	columnsLayout,
	sortBy,
	setSortBy,
}) => {
	return (
		<Flex position="relative" bg="gray.100" borderRadius="0.5rem" paddingY="0.75rem">
			<Grid w="100%" aria-label="table-headers" templateColumns={templateColumns} paddingX="1rem" {...commonGridProps}>
				{labels &&
					labels.map((label, index) => (
						<GridItem key={index}>
							<HStack justifyContent={columnsLayout?.[index]?.align ?? 'start'} spacing="0.25rem">
								<Text fontWeight="medium">{label}</Text>
								{columnsLayout?.[index]?.isSortable && (
									<Menu>
										<MenuButton as={IconButton} aria-label="sort-column" size="sm">
											<Flex alignItems="center" justifyContent="center">
												<Icon as={HiOutlineSelector} h="1.25rem" w="1.25rem" strokeWidth="1.5px" alignItems="center" />
											</Flex>
										</MenuButton>
										<MenuList>
											<MenuItem
												icon={<Icon as={GoSortAsc} h="1rem" w="1rem" />}
												bg={
													columnsLayout[index].key === sortBy?.column && sortBy?.direction === 'asc'
														? 'brand-primary.50'
														: undefined
												}
												onClick={() => setSortBy?.({ column: columnsLayout[index].key || '', direction: 'asc' })}
											>
												Ascendente
											</MenuItem>
											<MenuItem
												icon={<Icon as={GoSortDesc} h="1rem" w="1rem" />}
												bg={
													columnsLayout[index].key === sortBy?.column && sortBy?.direction === 'desc'
														? 'brand-primary.50'
														: undefined
												}
												onClick={() => setSortBy?.({ column: columnsLayout[index].key || '', direction: 'desc' })}
											>
												Descendente
											</MenuItem>
										</MenuList>
									</Menu>
								)}
							</HStack>
						</GridItem>
					))}
			</Grid>
		</Flex>
	);
};

CustomTable.Row = Row;

export { CustomTable };
