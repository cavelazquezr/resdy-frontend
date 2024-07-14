import React from 'react';

import { HStack, IconButton } from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';

interface IProps {
	isDisabled: boolean;
	formId?: string;
	handleSubmit: () => void;
	handleCancel: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isNotFromForm?: boolean;
}

export const SaveCancelButtons: React.FC<IProps> = (props) => {
	const { isDisabled, formId, handleSubmit, handleCancel, isNotFromForm } = props;
	return (
		<HStack>
			<IconButton
				isDisabled={isDisabled}
				aria-label="submit-edit"
				type={isNotFromForm ? 'button' : 'submit'}
				form={formId}
				variant="default-light"
				size="sm"
				borderRadius="0.5rem"
				icon={<FiCheck />}
				color="gray.500"
				onClick={handleSubmit}
			/>
			<IconButton
				aria-label="cancel-edit"
				variant="default-light"
				size="sm"
				borderRadius="0.5rem"
				icon={<FiX />}
				color="gray.500"
				onClick={handleCancel}
			/>
		</HStack>
	);
};
