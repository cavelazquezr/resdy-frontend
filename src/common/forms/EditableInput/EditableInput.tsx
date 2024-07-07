/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
	Text,
	Grid,
	GridItem,
	VStack,
	HStack,
	Icon,
	Spinner,
	FormControl,
	FormLabel,
	IconButton,
} from '@chakra-ui/react';
import { FiCheck, FiChevronRight, FiLock, FiX } from 'react-icons/fi';

import { FormField } from '../../../types/form';
import { UploadAvatarInput } from '../../components/UploadAvatarInput/UploadAvatarInput';
import { NewInput } from '../NewInput/NewInput';
import { NewTextarea } from '../NewTextarea/NewTextarea';

interface IProps {
	formId?: string;
	field: FormField;
	isSubmitting?: boolean;
	isDisabled?: boolean;
	labelingCol?: number;
	inputCol?: number;
	error?: string;
	customSubmitHandler?: (args: any) => void;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
	setEditingField?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const EditableInput: React.FC<IProps> = (props) => {
	const {
		formId,
		field,
		isSubmitting,
		isDisabled,
		labelingCol = 1,
		inputCol = 1,
		error,
		customSubmitHandler,
		setEditingField,
		onBlur,
		onChange,
		onKeyDown,
		...restProps
	} = props;
	const ref = React.useRef<HTMLDivElement>(null);

	const [isHovered, setIsHovered] = React.useState<boolean>(false);
	const [isEditing, setIsEditing] = React.useState<boolean>(field.type === 'password');

	const onFinishEditing = () => {
		customSubmitHandler && customSubmitHandler({ [field.id]: (field.value as any).toString() });
		setIsEditing(false);
		setIsHovered(false);
		setEditingField && setEditingField(undefined);
	};

	const onEditClick = () => {
		setEditingField && setEditingField(field.id);
		setIsEditing(true);
	};

	const renderInputByType = (type: string): React.ReactNode => {
		switch (type) {
			case 'number':
			case 'date':
			case 'password':
			case 'textarea':
			case 'text':
				return (
					<VStack spacing="0.25rem" align="stretch">
						<HStack>
							<Text textStyle="body1" color={!field.defaultValue || field.blocked ? 'gray.500' : 'gray.900'}>
								{field.defaultValue?.toString() ?? 'No especificado'}
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
				return <UploadAvatarInput isDisabled={isDisabled ?? false} isSubmitting={isSubmitting ?? false} />;
		}
	};

	const renderEditableByType = (type: string): React.ReactNode => {
		switch (type) {
			case 'date':
			case 'number':
			case 'password':
			case 'text':
				return (
					<VStack alignItems="stretch" h="100%" maxW="20rem" spacing="0rem">
						<HStack>
							<NewInput
								id={field.id}
								error={field.error}
								type={field.type as 'text' | 'password'}
								value={field.value as string}
								defaultValue={field.value as string}
								onBlur={onBlur}
								onKeyDown={onKeyDown}
								onChange={onChange}
								{...restProps}
							/>
							{field.type !== 'password' && (
								<React.Fragment>
									<IconButton
										isDisabled={field.value === '' || !!error}
										aria-label="submit-edit"
										type="submit"
										form={formId}
										variant="default-light"
										size="sm"
										borderRadius="0.5rem"
										icon={<FiCheck />}
										color="gray.500"
										onClick={onFinishEditing}
									/>
									<IconButton
										aria-label="cancel-edit"
										variant="default-light"
										size="sm"
										borderRadius="0.5rem"
										icon={<FiX />}
										color="gray.500"
										onClick={() => {
											setIsEditing(false);
											setIsHovered(false);
											setEditingField && setEditingField(undefined);
										}}
									/>
								</React.Fragment>
							)}
						</HStack>
					</VStack>
				);
			case 'textarea':
				return (
					<VStack alignItems="stretch" h="100%" maxW="20rem" spacing="0.5rem">
						<NewTextarea
							id={field.id}
							error={field.error}
							limit={field.limit}
							value={field.value as string}
							defaultValue={field.value as string}
							onBlur={onBlur}
							onKeyDown={onKeyDown}
							onChange={onChange}
							{...restProps}
						/>
						<HStack>
							<IconButton
								isDisabled={field.value === '' || !!error}
								aria-label="submit-edit"
								type="submit"
								form={formId}
								variant="default-light"
								size="sm"
								borderRadius="0.5rem"
								icon={<FiCheck />}
								color="gray.500"
								onClick={onFinishEditing}
							/>
							<IconButton
								aria-label="cancel-edit"
								variant="default-light"
								size="sm"
								borderRadius="0.5rem"
								icon={<FiX />}
								color="gray.500"
								onClick={() => {
									setIsEditing(false);
									setIsHovered(false);
									setEditingField && setEditingField(undefined);
								}}
							/>
						</HStack>
					</VStack>
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
		<FormControl isInvalid={!!field.error ?? false}>
			<Grid w="100%" templateColumns={`repeat(${labelingCol + inputCol}, 1fr)`}>
				<GridItem colSpan={labelingCol}>
					<VStack spacing="0.25rem" align="stretch">
						<FormLabel m={0} htmlFor={field.id}>
							{field.label}
						</FormLabel>
						<Text textStyle="body1" color="gray.500">
							{field.description}
						</Text>
					</VStack>
				</GridItem>
				<GridItem colSpan={inputCol}>
					{isEditing ? renderEditableByType(field.type) : renderInputByType(field.type)}
				</GridItem>
			</Grid>
		</FormControl>
	);
};
