import React from 'react';

import { SelectProps, Select, Text, VStack } from '@chakra-ui/react';

import { InputErrorMessage } from '../InputErrorMessage/InputErrorMessage';

interface IProps extends SelectProps {
	label: string;
	error?: string;
	choices: React.ReactNode;
}

export const NewSelect: React.FC<IProps> = (props): React.ReactNode => {
	const { error, choices, ...inputProps } = props;

	return (
		<VStack spacing="0.5rem" align="stretch" w="100%">
			<Text textStyle="label1" color="gray.800">
				{inputProps.label}
			</Text>
			<Select {...inputProps}>{choices}</Select>
			{error && <InputErrorMessage error={error} />}
		</VStack>
	);
};
