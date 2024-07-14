/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Text, Grid, GridItem, VStack, HStack, Icon, Spinner, FormControl, FormLabel } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { FiChevronRight, FiLock } from 'react-icons/fi';

import { HeaderThumbnails } from './components/HeaderThumbnails';
import { SaveCancelButtons } from './components/SaveCancelButtons';
import { FormField } from '../../../types/form';
import { LinkText } from '../../components/LinkText/LinkText';
import { UploadAvatarInput } from '../../components/UploadAvatarInput/UploadAvatarInput';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';
import { NewInput } from '../NewInput/NewInput';
import { NewSelect } from '../NewSelect/NewSelect';
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

	const [isEditing, setIsEditing] = React.useState<boolean>(field.type === 'password');

	const onFinishEditing = () => {
		customSubmitHandler && customSubmitHandler({ [field.id]: (field.value as any).toString() });
		setIsEditing(false);
		setEditingField && setEditingField(undefined);
	};

	const onCancelEditing = () => {
		setIsEditing(false);
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
			case 'select':
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
							<LinkText
								rightIcon={FiChevronRight}
								isDisabled={isDisabled || isSubmitting}
								onClick={!(isDisabled || isSubmitting) ? () => onEditClick() : undefined}
							>
								Editar
							</LinkText>
						) : (
							<Icon as={FiLock} color="gray.500" />
						)}
					</VStack>
				);
			case 'avatar':
				return <UploadAvatarInput isDisabled={isDisabled ?? false} isSubmitting={isSubmitting ?? false} />;
			case 'socialMedia':
				return (
					<VStack spacing="0.5rem" align="stretch">
						<VStack align="stretch">
							<HStack>
								<Icon as={FaTiktok} color="gray.900" />
								<Text
									textStyle="body1"
									color={(field.defaultValue as Record<string, string>).tiktok ? 'gray.900' : 'gray.500'}
								>
									{(field.defaultValue as Record<string, string>).tiktok &&
									(field.defaultValue as Record<string, string>).tiktok !== ''
										? (field.defaultValue as Record<string, string>).tiktok
										: 'No especificado'}
								</Text>
							</HStack>
							<HStack>
								<Icon as={FaInstagram} />
								<Text
									textStyle="body1"
									color={(field.defaultValue as Record<string, string>).instagram ? 'gray.900' : 'gray.500'}
								>
									{(field.defaultValue as Record<string, string>).instagram &&
									(field.defaultValue as Record<string, string>).instagram !== ''
										? (field.defaultValue as Record<string, string>).instagram
										: 'No especificado'}
								</Text>
							</HStack>
							<HStack>
								<Icon as={FaTwitter} color="gray.900" />
								<Text
									textStyle="body1"
									color={(field.defaultValue as Record<string, string>).twitter ? 'gray.900' : 'gray.500'}
								>
									{(field.defaultValue as Record<string, string>).twitter &&
									(field.defaultValue as Record<string, string>).twitter !== ''
										? (field.defaultValue as Record<string, string>).twitter
										: 'No especificado'}
								</Text>
							</HStack>
							<HStack>
								<Icon as={FaFacebook} color="gray.900" />
								<Text
									textStyle="body1"
									color={(field.defaultValue as Record<string, string>).facebook ? 'gray.900' : 'gray.500'}
								>
									{(field.defaultValue as Record<string, string>).facebook &&
									(field.defaultValue as Record<string, string>).facebook !== ''
										? (field.defaultValue as Record<string, string>).facebook
										: 'No especificado'}
								</Text>
							</HStack>
						</VStack>
						{!field.blocked ? (
							<LinkText
								rightIcon={FiChevronRight}
								onClick={!(isDisabled || isSubmitting) ? () => onEditClick() : undefined}
							>
								Editar
							</LinkText>
						) : (
							<Icon as={FiLock} color="gray.500" />
						)}
					</VStack>
				);
			case 'headers':
				return (
					<VStack align="stretch" spacing="0.5rem">
						{isSubmitting ? (
							<Spinner
								thickness="2px"
								speed="0.35s"
								emptyColor="brand-gray.200"
								color="brand-primary.default"
								size="sm"
							/>
						) : (
							<React.Fragment>
								{field.value && (field.value as string[]).length > 0 ? (
									<HeaderThumbnails headerPaths={field.value as string[]} />
								) : (
									<Text textStyle="body1" color="gray.500">
										No se han subido imágenes aún
									</Text>
								)}
							</React.Fragment>
						)}
						<LinkText
							rightIcon={FiChevronRight}
							onClick={!(isDisabled || isSubmitting) ? () => onEditClick() : undefined}
						>
							Subir nuevas cabeceras
						</LinkText>
					</VStack>
				);
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
						<HStack alignItems="start">
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
								<SaveCancelButtons
									isDisabled={field.value === '' || !!error}
									formId={formId ?? ''}
									handleSubmit={onFinishEditing}
									handleCancel={onCancelEditing}
								/>
							)}
						</HStack>
					</VStack>
				);
			case 'select':
				return (
					<VStack alignItems="stretch" h="100%" maxW="20rem" spacing="0rem">
						<HStack alignItems="start">
							<NewSelect
								id={field.id}
								error={field.error}
								choices={field.choices ?? []}
								value={field.value as string}
								defaultValue={field.value as string}
								onBlur={onBlur}
								onKeyDown={onKeyDown}
								onChange={onChange}
								{...restProps}
							/>
							{field.type !== 'password' && (
								<SaveCancelButtons
									isDisabled={field.value === '' || !!error}
									formId={formId ?? ''}
									handleSubmit={onFinishEditing}
									handleCancel={onCancelEditing}
								/>
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
						<SaveCancelButtons
							isDisabled={field.value === '' || !!error}
							formId={formId ?? ''}
							handleSubmit={onFinishEditing}
							handleCancel={onCancelEditing}
						/>
					</VStack>
				);
			case 'socialMedia':
				return (
					<VStack alignItems="stretch" h="100%" maxW="20rem" spacing="0.5rem">
						<VStack align="stretch">
							<HStack>
								<Icon as={FaTiktok} color="gray.900" />
								<NewInput
									id="tiktok"
									type="text"
									value={(field.value as Record<string, string>).tiktok}
									onBlur={onBlur}
									onKeyDown={onKeyDown}
									onChange={onChange}
									{...restProps}
								/>
							</HStack>
							<HStack>
								<Icon as={FaInstagram} />
								<NewInput
									id="instagram"
									type="text"
									value={(field.value as Record<string, string>).instagram}
									onBlur={onBlur}
									onKeyDown={onKeyDown}
									onChange={onChange}
									{...restProps}
								/>
							</HStack>
							<HStack>
								<Icon as={FaTwitter} color="gray.900" />
								<NewInput
									id="twitter"
									type="text"
									value={(field.value as Record<string, string>).twitter}
									onBlur={onBlur}
									onKeyDown={onKeyDown}
									onChange={onChange}
									{...restProps}
								/>
							</HStack>
							<HStack>
								<Icon as={FaFacebook} color="gray.900" />
								<NewInput
									id="facebook"
									type="text"
									value={(field.value as Record<string, string>).facebook}
									onBlur={onBlur}
									onKeyDown={onKeyDown}
									onChange={onChange}
									{...restProps}
								/>
							</HStack>
						</VStack>
						<SaveCancelButtons
							isDisabled={field.value === '' || !!error}
							formId={formId ?? ''}
							handleSubmit={onFinishEditing}
							handleCancel={onCancelEditing}
						/>
					</VStack>
				);
			case 'headers':
				return (
					<VStack alignItems="stretch" spacing="0.5rem" w="100%">
						<DragAndDrop id={field.id} field={field} hideLabel filesLimit={3} />
						<SaveCancelButtons
							isDisabled={field.value === '' || !!error}
							handleSubmit={onFinishEditing}
							handleCancel={onCancelEditing}
							isNotFromForm
						/>
					</VStack>
				);
		}
	};

	return (
		<FormControl isInvalid={!!field.error ?? false}>
			<Grid w="100%" templateColumns={`repeat(${labelingCol + inputCol}, 1fr)`} columnGap="0.5rem">
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
