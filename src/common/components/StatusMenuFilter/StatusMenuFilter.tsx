import React from 'react';

import { Button, Checkbox, Menu, MenuButton, MenuList, Text, VStack } from '@chakra-ui/react';
import { FiChevronDown, FiClock } from 'react-icons/fi';

type StatusList = {
	value: string;
	label: string;
	color: string;
};

interface IProps {
	statusValues: string[];
	handleSetFilter: (status: string[] | undefined) => void;
	resetFilters?: boolean;
	setResetFilters?: (value: boolean) => void;
}

export const StatusMenuFilter: React.FC<IProps> = (props) => {
	const { statusValues, handleSetFilter, resetFilters, setResetFilters } = props;
	const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
	const handleMenuItemSelect = (option: string) => {
		if (setResetFilters) {
			setResetFilters(true);
		}
		if (checkedItems.includes(option)) {
			setCheckedItems(checkedItems.filter((item) => item !== option));
		} else {
			setCheckedItems([...checkedItems, option]);
		}
	};

	const statusList: StatusList[] = [
		{
			value: 'finished',
			label: 'Finalizada',
			color: 'gray',
		},
		{
			value: 'to_rate',
			label: 'Por dejar reseña',
			color: 'yellow',
		},
		{
			value: 'to_be_confirmed',
			label: 'Por confirmar',
			color: 'yellow',
		},
		{
			value: 'cancelled',
			label: 'Cancelada',
			color: 'red',
		},
		{
			value: 'next',
			label: 'Próxima',
			color: 'green',
		},
	];
	const statusAvailable = statusList.filter((status) => statusValues.includes(status.value));
	const allChecked: boolean = checkedItems.length === statusValues.length;

	React.useEffect(() => {
		handleSetFilter(allChecked ? undefined : checkedItems);
		if (resetFilters === false && checkedItems.length > 0) {
			setCheckedItems([]);
		}
	}, [checkedItems, resetFilters]);

	return (
		<Menu placement="bottom-end">
			<MenuButton
				variant="default-light"
				size="md"
				as={Button}
				rightIcon={<FiChevronDown />}
				leftIcon={<FiClock />}
				w="10rem"
			>
				Estado
			</MenuButton>
			<MenuList>
				<VStack align="stretch" spacing="0.25rem" px="0.75rem">
					{statusAvailable.map((status) => (
						<Checkbox
							isChecked={checkedItems.includes(status.value)}
							key={status.value}
							colorScheme={status.color}
							p="0.25rem 0.5rem"
							_hover={{ bg: `${status.color}.200` }}
							bg={checkedItems.includes(status.value) ? `${status.color}.100` : undefined}
							borderRadius="0.5rem"
							onChange={() => handleMenuItemSelect(status.value)}
						>
							<Text color={`${status.color}.900`}>{status.label}</Text>
						</Checkbox>
					))}
				</VStack>
			</MenuList>
		</Menu>
	);
};
