import React from 'react';

import { FormControl, FormLabel, IconButton, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { InputErrorMessage } from '../../components/InputErrorMessage/InputErrorMessage';

interface IProps extends InputProps {
	type: 'text' | 'password';
	label?: string;
	tooltip?: string;
	error?: string;
}

export const NewInput: React.FC<IProps> = (props): React.ReactNode => {
	const { error, type, tooltip, label, ...inputProps } = props;
	const [showPassword, setShowPassword] = React.useState<boolean>(type !== 'password');

	return (
		<FormControl isInvalid={!!error} isRequired={inputProps.isRequired}>
			{label && <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>}
			<InputGroup>
				<Input type={showPassword ? 'text' : 'password'} {...inputProps} />
				{type === 'password' && (
					<InputRightElement display="flex" alignItems="center" h="100%">
						<IconButton
							aria-label="Show/hide password"
							size="sm"
							variant="ghost"
							me="0.5rem"
							color="gray.500"
							icon={!showPassword ? <FiEye /> : <FiEyeOff />}
							onClick={() => setShowPassword(!showPassword)}
						/>
					</InputRightElement>
				)}
			</InputGroup>
			{error && <InputErrorMessage error={error} />}
		</FormControl>
	);
};
