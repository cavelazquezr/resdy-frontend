import React from 'react';

import { Text, VStack } from '@chakra-ui/react';

import { FormField } from '../../../types/form';
import { NewForm } from '../NewForm';

interface IProps {
	field: FormField;
	isDisabled?: boolean;
	isSubmitting?: boolean;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
}

export const InlineForm: React.FC<IProps> = (props) => {
	const { field, isDisabled, isSubmitting, ...restProps } = props;
	const { label, description, children } = field;
	return (
		<VStack align="stretch" spacing="1rem">
			{label && (
				<Text textStyle="heading6" color="gray.900" opacity={field.isDisabled ? '0.5' : '1'}>
					{label}
				</Text>
			)}
			<Text textStyle="body1" color="gray.500" opacity={field.isDisabled ? '0.5' : '1'}>
				{description}
			</Text>
			<NewForm fields={children ?? []} {...restProps} isDisabled={field.isDisabled || isDisabled || isSubmitting} />
		</VStack>
	);
};
