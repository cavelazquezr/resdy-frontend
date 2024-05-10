import React from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiCalendar, FiCheckCircle, FiClock, FiEdit3, FiX } from 'react-icons/fi';

interface IProps {
	status: string;
}

export const StatusBadge: React.FC<IProps> = (props) => {
	const { status } = props;
	const parseStatus = (status: string): { icon: IconType; label: string; color: string } => {
		switch (status) {
			case 'cancelled':
				return {
					label: 'Cancelada',
					color: 'red',
					icon: FiX,
				};
			case 'to_be_confirmed':
				return {
					label: 'Por confirmar',
					color: 'yellow',
					icon: FiEdit3,
				};
			case 'next_booking':
				return {
					label: 'Próxima',
					color: 'green',
					icon: FiClock,
				};
			case 'to_rate':
				return {
					label: 'Por dejar reseña',
					color: 'yellow',
					icon: FiEdit3,
				};
			case 'finished':
				return {
					label: 'Finalizada',
					color: 'gray',
					icon: FiCheckCircle,
				};
			default:
				return {
					label: 'Finalizada',
					color: 'gray',
					icon: FiCheckCircle,
				};
		}
	};
	const { label, color, icon } = parseStatus(status);
	return (
		<HStack
			padding="0.25rem 0.5rem"
			borderRadius="full"
			bg={`${color}.500`}
			spacing="0.25rem"
			w="fit-content"
			boxShadow={`0 4px 10px #00000033`}
		>
			<Icon color="white" h="0.75rem" as={icon} />
			<Text textStyle="body3" fontWeight="semibold" color="white">
				{label}
			</Text>
		</HStack>
	);
};
