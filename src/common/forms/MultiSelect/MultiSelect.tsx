import React from 'react';

import { Flex, FormControl, FormLabel, SelectProps, Wrap, WrapItem } from '@chakra-ui/react';

import { InputErrorMessage } from '../../components/InputErrorMessage/InputErrorMessage';

interface IProps extends SelectProps {
	label?: string;
	error?: string;
	value?: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setSelectedItems?: React.Dispatch<React.SetStateAction<any>>;
	choices: Array<{
		label: string;
		value: string;
	}>;
}

export const MultiSelect: React.FC<IProps> = (props) => {
	const { error, choices, value, label, setSelectedItems, ...inputProps } = props;
	const [items, setItems] = React.useState<string[]>(value ?? []);

	React.useEffect(() => {
		if (value) {
			setItems(value);
		}
	}, [value]);

	React.useEffect(() => {
		setSelectedItems && setSelectedItems(items);
	}, [items]);

	return (
		<FormControl isInvalid={!!error} isRequired={inputProps.isRequired}>
			{label && <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>}
			<Wrap>
				{choices.map((it, index) => (
					<WrapItem key={index}>
						<MultiSelectItem label={it.label} value={it.value} items={items} setSelectedItems={setItems} />
					</WrapItem>
				))}
			</Wrap>
			{error && <InputErrorMessage error={error} />}
		</FormControl>
	);
};

export const MultiSelectItem = (props: {
	label: string;
	value: string;
	items: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const { label, value, items, setSelectedItems } = props;
	const [isSelected, setIsSelected] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (items.includes(value)) {
			setIsSelected(true);
		}
	}, [items]);

	React.useEffect(() => {
		if (isSelected) {
			setSelectedItems((prev) => [...prev, value]);
		} else {
			setSelectedItems((prev) => prev.filter((it) => it !== value));
		}
	}, [isSelected]);

	return (
		<Flex
			px="1rem"
			py="0.5rem"
			bg={isSelected ? 'brand-primary.50' : 'gray.100'}
			color={isSelected ? 'brand-primary.500' : 'gray.500'}
			borderRadius="0.5rem"
			transition="all 0.2s"
			cursor="pointer"
			onClick={() => {
				setIsSelected(!isSelected);
			}}
		>
			{label}
		</Flex>
	);
};
