import React from 'react';

import { Text, Grid, GridItem, VStack, HStack, Icon, Input, Flex, useToast, Spinner } from '@chakra-ui/react';
import { FiChevronRight, FiLock } from 'react-icons/fi';

import { InputConfiguration, InputValueType } from '../../../types/input';
import { UploadAvatarInput } from '../UploadAvatarInput/UploadAvatarInput';

interface IProps {
	field: InputConfiguration;
	isDisabled?: boolean;
	labelingCol?: number;
	inputCol?: number;
	handleSubmit?: (id: string, value: InputValueType) => void;
	setEditingField?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const EditableInput: React.FC<IProps> = (props) => {
	const { field, isDisabled, labelingCol = 1, inputCol = 1, handleSubmit, setEditingField } = props;
	const ref = React.useRef<HTMLDivElement>(null);

	const toast = useToast();

	const [isHovered, setIsHovered] = React.useState<boolean>(false);
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<InputValueType>(field.value ?? null);

	const onFinishEditing = async () => {
		try {
			setIsSubmitting(true);
			setIsHovered(false);
			setIsEditing(false);
			let response;
			if (handleSubmit) {
				response = await handleSubmit(field.id, value);
			}
			if (!response.error) {
				toast({
					position: 'top',
					description: `Tu información de ${field.label} ha sido actualizada correctamente.`,
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
				setValue(field.value ?? null);
				setEditingField && setEditingField(undefined);
				setIsSubmitting(false);
			} else {
				throw new Error('Error updating user information');
			}
		} catch (error) {
			console.error('Error:', error);
			toast({
				position: 'top',
				description: `Ha habido un error al actualizar tu información de ${field.label}.`,
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
			setIsSubmitting(false);
			setValue(field.value ?? null);
			setIsHovered(false);
			setIsEditing(false);
			setEditingField && setEditingField(undefined);
		}
	};

	const onEditClick = () => {
		setEditingField && setEditingField(field.id);
		setIsEditing(true);
	};

	const renderInputByType = (type: string): React.ReactNode => {
		switch (type) {
			case 'number':
			case 'date':
			case 'text':
				return (
					<VStack spacing="0.25rem" align="stretch">
						<HStack>
							<Text textStyle="body1" color={!field.value || field.blocked ? 'gray.500' : 'gray.900'}>
								{field.value?.toString() ?? 'No especificado'}
							</Text>
							{isSubmitting && (
								<Spinner
									thickness="2px"
									speed="0.35s"
									emptyColor="brand-gray.200"
									color="brand-primary.default"
									size="sm"
								/>
							)}
						</HStack>
						{!field.blocked ? (
							<HStack
								ref={ref}
								cursor={isDisabled || isSubmitting ? 'default' : 'pointer'}
								w="fit-content"
								opacity={isDisabled || isSubmitting ? 0.5 : 1}
								alignItems="center"
								spacing="0.15rem"
								onMouseEnter={!(isDisabled || isSubmitting) ? handleMouseEnter : undefined}
								onMouseLeave={!(isDisabled || isSubmitting) ? handleMouseLeave : undefined}
								onClick={!(isDisabled || isSubmitting) ? () => onEditClick() : undefined}
							>
								<Text
									textStyle="body1"
									color={isHovered ? 'brand-primary.300' : 'brand-primary.default'}
									transition="all 0.3s"
								>
									Editar
								</Text>
								<Icon
									as={FiChevronRight}
									color={isHovered ? 'brand-primary.300' : 'brand-primary.default'}
									ms={isHovered ? '0.25rem' : '0'}
									transition="all 0.3s"
								/>
							</HStack>
						) : (
							<Icon as={FiLock} color="gray.500" />
						)}
					</VStack>
				);
			case 'avatar':
				return (
					<UploadAvatarInput
						currentAvatar={field.value as string}
						isDisabled={isDisabled ?? false}
						isSubmitting={isSubmitting}
					/>
				);
		}
	};

	const renderEditableByType = (type: string): React.ReactNode => {
		switch (type) {
			case 'date':
			case 'number':
			case 'text':
				return (
					<Flex alignItems="center" h="100%">
						<Input
							type={field.type}
							defaultValue={value as string}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const { value } = e.target;
								setValue(value);
							}}
							onBlur={onFinishEditing}
							onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
								if (e.key === 'Enter') {
									onFinishEditing();
								}
							}}
						/>
					</Flex>
				);
		}
	};

	const handleMouseEnter = () => {
		if (ref.current) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (ref.current) {
			setIsHovered(false);
		}
	};
	return (
		<Grid w="100%" templateColumns={`repeat(${labelingCol + inputCol}, 1fr)`}>
			<GridItem colSpan={labelingCol}>
				<VStack spacing="0.25rem" align="stretch">
					<Text textStyle="body1" color="gray.900" fontWeight="medium">
						{field.label}
					</Text>
					<Text textStyle="body1" color="gray.500">
						{field.description}
					</Text>
				</VStack>
			</GridItem>
			<GridItem colSpan={inputCol}>
				{isEditing ? renderEditableByType(field.type) : renderInputByType(field.type)}
			</GridItem>
		</Grid>
	);
};
