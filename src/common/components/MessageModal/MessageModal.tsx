import React from 'react';

import { VStack, Text, Button, Icon } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

import { ModalTemplate as Modal } from '../ModalTemplate/ModalTemplate';

interface IProps {
	title: string;
	bodyText: string;
	isOpen: boolean;
	onClose: () => void;
	handleToggle: () => void;
}

export const MessageModal: React.FC<IProps> = (props) => {
	const { title, bodyText, handleToggle, ...modalProps } = props;

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
				<Button size="md" w="100%" variant="solidDefault" onClick={handleToggle}>
					Cerrar
				</Button>
			</VStack>
		</Modal>
	);
};
