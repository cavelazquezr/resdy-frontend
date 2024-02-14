import React from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiCheckCircle, FiEdit3 } from 'react-icons/fi';

interface IProps {
	status: string;
}

export const StatusBadge: React.FC<IProps> = (props) => {
	const { status } = props;
	const parseStatus = (status: string): { icon: IconType; label: string; color: string; bg: string } => {
		switch (status) {
			case 'cancelled':
				return {
					label: 'Cancelada',
					bg: 'red.200',
					color: 'red.900',
					icon: FiEdit3,
				};
			case 'to_be_confirmed':
				return {
					label: 'Por confirmar',
					bg: 'yellow.200',
					color: 'yellow.900',
					icon: FiEdit3,
				};
			case 'next_booking':
				return {
					label: 'Próxima',
					bg: 'green.200',
					color: 'green.900',
					icon: FiEdit3,
				};
			case 'to_rate':
				return {
					label: 'Por dejar reseña',
					bg: 'yellow.200',
					color: 'yellow.900',
					icon: FiEdit3,
				};
			case 'finished':
				return {
					label: 'Finalizada',
					bg: 'gray.200',
					color: 'gray.900',
					icon: FiCheckCircle,
				};
			default:
				return {
					label: 'Finalizada',
					bg: 'gray.200',
					color: 'gray.900',
					icon: FiCheckCircle,
				};
		}
	};
	const { label, color, bg, icon } = parseStatus(status);
	return (
		<HStack padding="0.25rem 0.5rem" borderRadius="0.25rem" bg={bg} w="fit-content">
			<Icon color={color} as={icon} />
			<Text textStyle="body2" fontWeight="semibold" color={color}>
				{label}
			</Text>
		</HStack>
	);
};
