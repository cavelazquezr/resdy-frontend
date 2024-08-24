import React from 'react';

import { Button, ButtonProps, HStack, Icon, Input, Select } from '@chakra-ui/react';
import { FiCalendar, FiRefreshCcw, FiSearch } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { QueryFilter } from '../../../types';
import { DatePicker } from '../DatePicker/DatePicker';

interface IProps {
	selectValues?: string[];
	searchPlaceholder?: string;
	filters?: QueryFilter;
	handleSetFilter: (input: Record<string, string | undefined>) => void;
	hideDatePicker?: boolean;
	hideCitySelect?: boolean;
	resetFilters?: boolean;
	setResetFilters?: (value: boolean) => void;
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
	const {
		filters,
		selectValues,
		searchPlaceholder,
		handleSetFilter,
		hideDatePicker,
		hideCitySelect,

		setResetFilters,
	} = props;

	const [search, setSearch] = React.useState<string | undefined>();
	const [debounceTimeout, setDebounceTimeout] = React.useState<NodeJS.Timeout | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const WAIT_TIME = 400; //tiempo de espera para realizar la búsqueda;
		const { value } = e.target;
		setSearch(value);

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		const newTimeout = setTimeout(() => {
			handleSetFilter({ ...filters, search: value });
		}, WAIT_TIME);

		setDebounceTimeout(newTimeout);
	};

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
			{!hideDatePicker && (
				<HStack w="fit-content" spacing="0rem" borderRight="1px solid" borderRightColor="brand-gray.200">
					<Icon as={FiCalendar} color="gray.500" />
					<DatePicker filters={filters} buttonProps={datePickerButtonProps} handleSetFilter={handleSetFilter} />
				</HStack>
			)}
			{!hideCitySelect && (
				<HStack w="13rem" spacing="0rem" ps="1rem">
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
						{selectValues?.map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</Select>
				</HStack>
			)}
			<HStack
				w="100%"
				borderLeft={!hideCitySelect ? 'brand-gray.200' : undefined}
				spacing="0rem"
				borderLeftColor="brand-gray.200"
				ps="1rem"
			>
				<Icon as={FiSearch} color="gray.500" />
				<Input
					id="search"
					border="none"
					size="md"
					value={search}
					placeholder={searchPlaceholder || 'Nombre del restaurante...'}
					onKeyDown={handleKeyDown}
					onChange={handleInputChange}
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
						if (setResetFilters) {
							setResetFilters(false);
						}
					}}
				>
					Limpiar filtros
				</Button>
			</HStack>
		</HStack>
	);
};
