import React from 'react';

import { VStack, Text, Button, Icon } from '@chakra-ui/react';
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

import { ModalTemplate as Modal } from '../ModalTemplate/ModalTemplate';

type SimpleActionButton = {
	title: string;
	action: () => void;
};
interface IProps {
	title: string;
	type?: 'success' | 'error' | 'warning';
	bodyText: string;
	isOpen: boolean;
	firstActionButton?: SimpleActionButton;
	secondActionButton?: SimpleActionButton;
	onClose: () => void;
	handleToggle?: () => void;
}

export const MessageModal: React.FC<IProps> = (props) => {
	const {
		title,
		type = 'success',
		bodyText,
		handleToggle,
		firstActionButton,
		secondActionButton,
		...modalProps
	} = props;

	return (
		<Modal {...modalProps} hideCloseButton size="sm">
			<VStack spacing="1rem">
				<Icon
					color={type === 'success' ? 'green.500' : type === 'warning' ? 'yellow.500' : 'red.500'}
					w="8rem"
					h="8rem"
					as={type === 'success' ? FiCheckCircle : type === 'warning' ? FiAlertCircle : FiAlertTriangle}
				/>
				<Text textStyle="heading5" textAlign="center">
					{title}
				</Text>
				<Text textStyle="body1" color="gray.500" textAlign="center">
					{bodyText}
				</Text>
				{firstActionButton ? (
					<Button size="md" w="100%" variant="primary" onClick={firstActionButton.action}>
						{firstActionButton.title}
					</Button>
				) : (
					<Button size="md" w="100%" variant="default-light" onClick={handleToggle}>
						Cerrar
					</Button>
				)}
				{secondActionButton && (
					<Button size="md" w="100%" variant="default-light" onClick={secondActionButton.action}>
						{secondActionButton.title}
					</Button>
				)}
			</VStack>
		</Modal>
	);
};
