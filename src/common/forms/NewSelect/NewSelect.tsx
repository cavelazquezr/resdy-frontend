import React from 'react';

import { SelectProps, Select, FormControl, FormLabel } from '@chakra-ui/react';

import { InputErrorMessage } from '../../components/InputErrorMessage/InputErrorMessage';

interface IProps extends SelectProps {
	label?: string;
	error?: string;
	choices: Array<{
		label: string;
		value: string;
	}>;
}

export const NewSelect: React.FC<IProps> = (props): React.ReactNode => {
	const { error, choices, label, ...inputProps } = props;

	return (
		<FormControl isInvalid={!!error} isRequired={inputProps.isRequired}>
			{label && (
				<FormLabel textStyle="body2" fontWeight="normal">
					{label}
				</FormLabel>
			)}
			<Select {...inputProps}>
				{choices.map((it) => (
					<option key={it.value} value={it.value}>
						{it.label}
					</option>
				))}
			</Select>
			{error && <InputErrorMessage error={error} />}
		</FormControl>
	);
};
