import React from 'react';

import {
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalProps,
	Text,
} from '@chakra-ui/react';

interface IProps extends ModalProps {
	children: React.ReactNode;
	title?: string;
	hideCloseButton?: boolean;
}

export const ModalTemplate: React.FC<IProps> = (props) => {
	const { children, title, hideCloseButton, ...modalProps } = props;
	return (
		<Modal {...modalProps} isCentered motionPreset="slideInBottom">
			<ModalOverlay />
			<ModalContent p="2rem">
				<ModalHeader p="0rem">
					<HStack>
						{title && <Text textStyle="heading6">{title}</Text>}
						{!hideCloseButton && <ModalCloseButton />}
					</HStack>
				</ModalHeader>
				<ModalBody p="1rem 0rem 0rem 0rem">{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};
