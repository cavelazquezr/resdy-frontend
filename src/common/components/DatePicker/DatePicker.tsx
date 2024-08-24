import React from 'react';

import { Button, ButtonProps, HStack, Menu, MenuButton, MenuList, VStack } from '@chakra-ui/react';
import { es } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';

import './styles.css';
import { QueryFilter } from '../../../types';

interface IProps {
	buttonProps?: ButtonProps;
	filters?: QueryFilter;
	handleSetFilter: (input: Record<string, string>) => void;
}

export const DatePicker: React.FC<IProps> = (props) => {
	const { filters, buttonProps, handleSetFilter } = props;
	const initialValues = {
		from: filters?.start_date ? new Date(filters.start_date) : undefined,
		to: filters?.end_date ? new Date(filters.end_date) : undefined,
	};
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const [range, setRange] = React.useState<DateRange | undefined>(initialValues);

	const onApply = React.useCallback(() => {
		if (range) {
			const { from, to } = range;
			if (from && to) {
				const startOfDay = new Date(from);
				startOfDay.setHours(0, 0, 0, 0);

				const endOfDay = new Date(to);
				endOfDay.setHours(23, 59, 59, 999);

				handleSetFilter({ start_date: startOfDay.toISOString(), end_date: endOfDay.toISOString() });
				setIsOpen(false);
			}
		}
	}, [range]);

	const isApplyButtonDisabled = React.useMemo(() => {
		return !range?.from || !range?.to;
	}, [range]);

	React.useEffect(() => {
		if (!filters?.start_date && !filters?.end_date) {
			setRange({
				from: undefined,
				to: undefined,
			});
		}
	}, [filters]);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
	};

	const formatRange = (startDate: Date, endDate: Date) => {
		return `${formatDate(startDate)} - ${formatDate(endDate)}`;
	};

	return (
		<Menu isOpen={isOpen}>
			<MenuButton as={Button} {...buttonProps} onClick={() => setIsOpen(!isOpen)}>
				{range?.from && range?.to ? formatRange(range.from, range.to) : 'Selecciona una fecha'}
			</MenuButton>
			<MenuList>
				<VStack>
					<DayPicker
						locale={es}
						id="test"
						mode="range"
						defaultMonth={new Date()}
						selected={range}
						onSelect={setRange}
					/>
					<HStack justifyContent="center" w="100%" px="1rem">
						<Button w="100%" variant="default-light" onClick={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button w="100%" variant="primary" onClick={onApply} isDisabled={isApplyButtonDisabled}>
							Aplicar
						</Button>
					</HStack>
				</VStack>
			</MenuList>
		</Menu>
	);
};
