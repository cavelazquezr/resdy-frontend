import React from 'react';

import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { RiRestaurantLine } from 'react-icons/ri';

interface IProps {
	options: Array<string>;
	onChange?: (value: string | null) => void;
}

export const RestaurantTypeFilterButton: React.FC<IProps> = (props) => {
	const { options, onChange } = props;
	const [selectedType, setSelectedType] = React.useState<string | null>(null);

	const typeOptions = options.map((option) => ({ label: option, value: option }));

	React.useEffect(() => {
		if (onChange) {
			onChange(selectedType);
		}
	}, [selectedType]);

	return (
		<React.Fragment>
			{selectedType ? (
				<Button
					variant="default-light"
					leftIcon={<RiRestaurantLine />}
					rightIcon={<FiX />}
					onClick={() => setSelectedType(null)}
				>
					<Text textTransform="capitalize">{selectedType}</Text>
				</Button>
			) : (
				<Menu>
					<MenuButton variant="default-light" leftIcon={<RiRestaurantLine />} as={Button} rightIcon={<FiChevronDown />}>
						<Text textTransform="capitalize">{!selectedType ? 'cocina' : selectedType}</Text>
					</MenuButton>
					<MenuList>
						{typeOptions.map(({ label, value }, index) => (
							<MenuItem key={index} color="brand-primary.default" onClick={() => setSelectedType(value)}>
								<Text textTransform="capitalize" color="gray.900">
									{label}
								</Text>
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			)}
		</React.Fragment>
	);
};
