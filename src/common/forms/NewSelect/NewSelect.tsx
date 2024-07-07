import React from 'react';

import { SelectProps, Select, FormControl, FormLabel } from '@chakra-ui/react';

import { InputErrorMessage } from '../../components/InputErrorMessage/InputErrorMessage';

interface IProps extends SelectProps {
	label?: string;
	error?: string;
	choices: React.ReactNode;
}

export const NewSelect: React.FC<IProps> = (props): React.ReactNode => {
	const { error, choices, label, ...inputProps } = props;

	return (
		<FormControl isInvalid={!!error} isRequired={inputProps.isRequired}>
			<FormLabel textStyle="body2" fontWeight="normal">
				{label}
			</FormLabel>
			<Select {...inputProps}>{choices}</Select>
			{error && <InputErrorMessage error={error} />}
		</FormControl>
	);
};
