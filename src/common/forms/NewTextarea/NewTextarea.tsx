import React from 'react';

import { FormControl, FormLabel, Textarea, TextareaProps, Box, Text } from '@chakra-ui/react';

import { InputErrorMessage } from '../../components/InputErrorMessage/InputErrorMessage';

interface IProps extends TextareaProps {
	label?: string;
	tooltip?: string;
	error?: string;
	limit?: number;
}

export const NewTextarea: React.FC<IProps> = (props): React.ReactNode => {
	const { error, tooltip, limit, label, ...inputProps } = props;

	return (
		<FormControl isInvalid={!!error} isRequired={inputProps.isRequired}>
			{label && <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>}
			<Box position="relative">
				<Textarea {...inputProps} border="1px solid" borderColor="brand-gray.200" maxH="15rem" color="gray.500" />
				{limit && (
					<Text textStyle="body3" color="gray.500" position="absolute" bottom="0.5rem" right="0.875rem">
						{`${(inputProps.value as string).length}/${limit}`}
					</Text>
				)}
			</Box>
			{error && <InputErrorMessage error={error} />}
		</FormControl>
	);
};
