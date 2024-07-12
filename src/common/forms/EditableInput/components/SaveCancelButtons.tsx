import React from 'react';

import { HStack, IconButton } from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';

interface IProps {
	isDisabled: boolean;
	formId: string;
	handleSubmit: () => void;
	handleCancel: () => void;
}

export const SaveCancelButtons: React.FC<IProps> = (props) => {
	const { isDisabled, formId, handleSubmit, handleCancel } = props;
	return (
		<HStack>
			<IconButton
				isDisabled={isDisabled}
				aria-label="submit-edit"
				type="submit"
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
