import React from 'react';

import {
	Text,
	FormControl,
	Input,
	VStack,
	useDisclosure,
	Flex,
	FlexProps,
	SlideFade,
	IconButton,
	InputGroup,
	InputProps,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import { FormField } from '../../../types/form';
import { InputErrorMessage } from '../../components/InputErrorMessage/InputErrorMessage';

type IProps = Partial<FormField> & InputProps;

const optionsMenuStyle: FlexProps = {
	bg: 'white',
	mt: '0.25rem',
	p: '1rem',
	w: '100%',
	border: '1px solid',
	borderColor: 'brand-gray.200',
	borderRadius: '0.5rem',
	boxShadow: '0 4px 10px #8F8F8F33',
};

export const AutoCompleteInput: React.FC<IProps> = (props) => {
	const { id, label, value, choices, error, ...inputProps } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();

	console.log('ERROR', error);

	const [inputValue, setInputValue] = React.useState<string>('');
	const [selectedResult, setSelectedResult] = React.useState<string | undefined>(undefined);

	React.useEffect(() => {
		if (inputValue.length > 0 && !selectedResult) {
			onOpen();
		} else {
			onClose();
		}
	}, [inputValue, onOpen, onClose]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('foo');
		setInputValue(e.target.value);
		inputProps.onChange && inputProps.onChange(e);
	};

	const handleSelectOption = (value: string) => {
		const valueParts = value.split(',');
		setSelectedResult(valueParts[0]);
		setInputValue(valueParts[0]);
		onClose();
	};

	return (
		<VStack spacing="0.5rem" align="stretch" position="relative">
			<FormControl id={id}>
				<VStack spacing="0.5rem" align="stretch">
					<Text textStyle="body2" color="gray.900" opacity={inputProps.isDisabled ? '0.5' : '1'}>
						{label}
					</Text>
					<InputGroup alignItems="center" gap="0.5rem">
						<Input type="text" {...inputProps} />
						{selectedResult && (
							<IconButton
								aria-label="Clear"
								icon={<FiX />}
								onClick={() => {
									setInputValue('');
									setSelectedResult(undefined);
								}}
								size="sm"
								variant="ghost"
								color="gray.500"
							/>
						)}
					</InputGroup>
				</VStack>
			</FormControl>
			<OptionsMenu isOpen={!!(isOpen && choices && choices.length > 0)}>
				{choices &&
					choices.length > 0 &&
					choices.map(({ value, label }, index) => (
						<Option key={index} label={label} value={value} onClick={handleSelectOption} />
					))}
			</OptionsMenu>
			{error && <InputErrorMessage error={error} />}
		</VStack>
	);
};

const OptionsMenu: React.FC<{ isOpen: boolean; children: React.ReactNode }> = (args) => {
	const { isOpen, children } = args;
	if (isOpen) {
		return (
			<SlideFade in={isOpen} offsetY="-20px">
				<Flex position="absolute" zIndex={99} {...optionsMenuStyle}>
					<VStack align="stretch" spacing="0rem" w="100%">
						{children}
					</VStack>
				</Flex>
			</SlideFade>
		);
	}
};

const Option: React.FC<{ label: string; value: string; onClick: (value: string) => void }> = (args) => {
	return (
		<Flex
			_hover={{ bg: 'gray.100', cursor: 'pointer' }}
			transition="all 0.2s"
			p="0.25rem"
			borderRadius="0.25rem"
			onClick={() => args.onClick(args.value)}
		>
			<Text textStyle="body2" color="gray.900">
				{args.label}
			</Text>
		</Flex>
	);
};
