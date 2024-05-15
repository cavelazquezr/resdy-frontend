import React from 'react';

import { HStack, Icon, Text, Textarea, TextareaProps, Tooltip, VStack } from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';

import { InputErrorMessage } from '../InputErrorMessage/InputErrorMessage';

interface IProps extends TextareaProps {
	label: string;
	tooltip?: string;
	error?: string;
}

export const NewTextArea: React.FC<IProps> = (props): React.ReactNode => {
	const { error, tooltip, ...inputProps } = props;

	return (
		<VStack spacing="0.5rem" align="stretch" w="100%">
			<HStack>
				<Text textStyle="body2" color="gray.900">
					{inputProps.label}
				</Text>
				{tooltip && (
					<Tooltip label={tooltip} hasArrow>
						<Icon as={FiInfo} />
					</Tooltip>
				)}
			</HStack>
			<Textarea {...inputProps} border="1px solid" borderColor="brand-gray.200" maxH="15rem" color="gray.500" />
			{error && <InputErrorMessage error={error} />}
		</VStack>
	);
};
