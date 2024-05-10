import React from 'react';

import { Button, ButtonProps, HStack, Icon, Input, Select } from '@chakra-ui/react';
import { FiCalendar, FiRefreshCcw, FiSearch } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { QueryFilter } from '../../../types';
import { GetMyRatingQueryParams } from '../../../types/rating';
import { DatePicker } from '../DatePicker/DatePicker';

interface IProps {
	hasCalendar?: boolean;
	selectValues?: string[];
	filters?: QueryFilter | undefined;
	handleSetFilter: (input: GetMyRatingQueryParams) => void;
}

const datePickerButtonProps: ButtonProps = {
	textStyle: 'body1',
	fontWeight: 'normal',
	color: 'gray.500',
	bg: 'transparent',
	_hover: { bg: 'transparent' },
	_active: { bg: 'transparent' },
};

export const SearchBar: React.FC<IProps> = (props) => {
	const { filters, selectValues, handleSetFilter } = props;
	const [search, setSearch] = React.useState<string | undefined>();

	console.log('search', search);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSetFilter({ ...filters, search: search });
		}
	};

	return (
		<HStack
			bg="brand-gray.100"
			p="0rem 1rem"
			borderRadius="full"
			w="100%"
			border="1px solid"
			borderColor="brand-gray.200"
			boxShadow={'0 4px 10px #8F8F8F33'}
		>
			<HStack w="fit-content" spacing="0rem">
				<Icon as={FiCalendar} color="gray.500" />
				<DatePicker filters={filters} buttonProps={datePickerButtonProps} handleSetFilter={handleSetFilter} />
			</HStack>
			<HStack w="13rem" spacing="0rem" borderLeft="1px solid" borderLeftColor="brand-gray.200" ps="1rem">
				<Icon as={HiOutlineLocationMarker} color="gray.500" />
				<Select
					id="city"
					border="none"
					value={filters?.city || ''}
					onChange={(e) => {
						const { id, value } = e.target;
						handleSetFilter({ ...filters, [id]: value });
					}}
					size="md"
					placeholder="Ciudad"
				>
					{selectValues &&
						selectValues.map((value, i) => (
							<option key={i} value={value}>
								{value}
							</option>
						))}
				</Select>
			</HStack>
			<HStack w="100%" borderLeft="1px solid" spacing="0rem" borderLeftColor="brand-gray.200" ps="1rem">
				<Icon as={FiSearch} color="gray.500" />
				<Input
					id="search"
					border="none"
					size="md"
					value={search}
					placeholder="Nombre del restaurante..."
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => handleKeyDown(e)}
					onBlur={() => {
						handleSetFilter({ ...filters, search: search });
					}}
				/>
				<Button
					variant="default-light"
					size="md"
					leftIcon={<FiRefreshCcw />}
					border="none"
					boxShadow="none"
					color="gray.500"
					fontWeight="normal"
					onClick={() => {
						setSearch('');
						handleSetFilter({});
					}}
				>
					Limpiar filtros
				</Button>
			</HStack>
		</HStack>
	);
};
