import React from 'react';

import { Flex } from '@chakra-ui/react';

import { FormField } from '../../../types/form';
import { NewForm } from '../NewForm';

interface IProps {
	fields: Array<FormField>;
	isSubmitting?: boolean;
	isDisabled?: boolean;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
}

export const FormStack: React.FC<IProps> = (props): React.ReactNode => {
	const { fields, ...restProps } = props;

	return (
		<Flex direction="row" align="stretch" gap="2rem">
			{fields.map((field, index) => (
				<NewForm key={index} fields={[field] ?? []} {...restProps} isDisabled={field.isDisabled} />
			))}
		</Flex>
	);
};
