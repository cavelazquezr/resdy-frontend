import React from 'react';

import { HStack, Icon, Input, Select } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { GetMyRatingQueryParams } from '../../../types/rating';

interface IProps {
	selectValues?: string[];
	handleSetFilter: (input: GetMyRatingQueryParams) => void;
}

export const SearchBar: React.FC<IProps> = (props) => {
	const { selectValues, handleSetFilter } = props;
	const [search, setSearch] = React.useState<GetMyRatingQueryParams | undefined>({});

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const { id, value } = e.target as HTMLInputElement;
			setSearch({ ...search, [id]: value });
		}
	};

	React.useEffect(() => {
		if (search) {
			handleSetFilter(search);
		}
	}, [search]);
	return (
		<HStack bg="gray.100" p="0rem 0.5rem" borderRadius="0.5rem" w="100%">
			<HStack w="13rem">
				<Icon as={HiOutlineLocationMarker} color="gray.700" />
				<Select
					id="city"
					onChange={(e) => {
						const { id, value } = e.target;
						setSearch({ ...search, [id]: value });
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
			<HStack w="100%" borderLeft="1px solid" borderLeftColor="gray.300" ps="1rem">
				<Icon as={FiSearch} color="gray.700" />
				<Input
					id="search"
					size="md"
					placeholder="Nombre del restaurante..."
					onKeyDown={(e) => handleKeyDown(e)}
					onBlur={(e) => {
						const { id, value } = e.target;
						setSearch({ ...search, [id]: value });
					}}
				/>
			</HStack>
		</HStack>
	);
};
