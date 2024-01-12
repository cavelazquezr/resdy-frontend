import React from 'react';

import {
	HStack,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputProps,
	InputRightElement,
	Text,
	Tooltip,
	VStack,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiInfo } from 'react-icons/fi';

import { InputErrorMessage } from '../InputErrorMessage/InputErrorMessage';

interface IProps extends InputProps {
	label: string;
	type: 'text' | 'password';
	tooltip?: string;
	error?: string;
}

export const NewInput: React.FC<IProps> = (props): React.ReactNode => {
	const { error, type, tooltip, ...inputProps } = props;
	const [showPassword, setShowPassword] = React.useState<boolean>(type !== 'password');

	return (
		<VStack spacing="0.5rem" align="stretch" w="100%">
			<HStack>
				<Text textStyle="label1" color="gray.800">
					{inputProps.label}
				</Text>
				{tooltip && (
					<Tooltip label={tooltip} hasArrow>
						<Icon as={FiInfo} />
					</Tooltip>
				)}
			</HStack>
			<InputGroup>
				<Input type={showPassword ? 'text' : 'password'} {...inputProps} />
				{type === 'password' && (
					<InputRightElement display="flex" alignItems="center" h="100%">
						<IconButton
							aria-label="Show/hide password"
							size="md"
							me="0.5rem"
							color="gray.500"
							icon={!showPassword ? <FiEye /> : <FiEyeOff />}
							onClick={() => setShowPassword(!showPassword)}
						/>
					</InputRightElement>
				)}
			</InputGroup>
			{error && <InputErrorMessage error={error} />}
		</VStack>
	);
};
