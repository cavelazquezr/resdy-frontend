import React from 'react';

import { VStack, Text, Button, Icon } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

import { ModalTemplate as Modal } from '../ModalTemplate/ModalTemplate';

type SimpleActionButton = {
	title: string;
	action: () => void;
};
interface IProps {
	title: string;
	bodyText: string;
	isOpen: boolean;
	firstActionButton?: SimpleActionButton;
	secondActionButton?: SimpleActionButton;
	onClose: () => void;
	handleToggle: () => void;
}

export const MessageModal: React.FC<IProps> = (props) => {
	const { title, bodyText, handleToggle, firstActionButton, secondActionButton, ...modalProps } = props;

	return (
		<Modal {...modalProps} hideCloseButton size="sm">
			<VStack spacing="1rem">
				<Icon color="brand-secondary.default" w="8rem" h="8rem" as={FiCheckCircle} />
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
