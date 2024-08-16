import React from 'react';

import { Divider, VStack } from '@chakra-ui/react';

import { AutoCompleteInput } from './AutoCompleteInput/AutoCompleteInput';
import { DragAndDrop } from './DragAndDrop/DragAndDrop';
import { EditableInput } from './EditableInput/EditableInput';
import { FormStack } from './FormStack/FormStack';
import { InlineForm } from './InlineForm/InlineForm';
import { MultiSelect } from './MultiSelect/MultiSelect';
import { NewInput } from './NewInput/NewInput';
import { NewSelect } from './NewSelect/NewSelect';
import { NewTextarea } from './NewTextarea/NewTextarea';
import { FormField } from '../../types/form';

interface IProps {
	fields: Array<FormField>;
	formId?: string;
	isSubmitting?: boolean;
	isDisabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	customSubmitHandler?: (args: any) => void;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined;
}

export const NewForm: React.FC<IProps> = (props): React.ReactNode => {
	const { fields, ...restProps } = props;
	const { isSubmitting, isDisabled, onBlur, onChange, onKeyDown } = restProps;

	const renderFields = (fields: FormField[]) => {
		return fields.map((field, index) => {
			if (field.isEditable) {
				return (
					<React.Fragment key={index}>
						<EditableInput
							formId={restProps.formId}
							field={field}
							labelingCol={3}
							inputCol={5}
							isDisabled={field.isDisabled || isSubmitting || isDisabled}
							isSubmitting={isSubmitting}
							customSubmitHandler={restProps.customSubmitHandler}
							setEditingField={field.dispatcher}
							error={field.error}
							onBlur={onBlur}
							onChange={onChange}
							onKeyDown={onKeyDown}
						/>
						<Divider borderColor="brand-gray.200" />
					</React.Fragment>
				);
			} else {
				switch (field.type) {
					case 'number':
					case 'text':
					case 'password':
						return (
							<NewInput
								key={index}
								autoComplete="on"
								label={field.label}
								type={field.type as never}
								id={field.id}
								tooltip={field.tooltip ?? undefined}
								size="md"
								value={field.value as string}
								error={field.error}
								isInvalid={!!field.error}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								isRequired={field.isRequired}
								onBlur={onBlur}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						);
					case 'select':
						return (
							<NewSelect
								key={index}
								label={field.label}
								id={field.id}
								choices={field.choices ?? []}
								placeholder={field.placeholder}
								size="md"
								value={field.value as string}
								error={field.error}
								isInvalid={!!field.error}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								isRequired={field.isRequired}
								onChange={onChange}
							/>
						);
					case 'textarea':
						return (
							<NewTextarea
								key={index}
								label={field.label}
								id={field.id}
								tooltip={field.tooltip ?? undefined}
								limit={field.limit}
								value={field.value as string}
								error={field.error}
								isInvalid={!!field.error}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								isRequired={field.isRequired}
								onBlur={onBlur}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						);
					case 'formStack':
						return (
							<FormStack
								key={index}
								fields={field.children ?? []}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								{...restProps}
							/>
						);
					case 'inlineGroup':
						return (
							<InlineForm
								key={index}
								field={field}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								{...restProps}
							/>
						);
					case 'dragAndDrop':
						return (
							<DragAndDrop
								key={index}
								id={field.id}
								field={field}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								{...restProps}
							/>
						);
					case 'autoComplete':
						return (
							<AutoCompleteInput
								key={index}
								label={field.label}
								id={field.id}
								choices={field.choices}
								size="md"
								value={field.value as string}
								error={field.error}
								isInvalid={!!field.error}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								onChange={onChange}
							/>
						);
					case 'multiSelect':
						return (
							<MultiSelect
								key={index}
								label={field.label}
								id={field.id}
								choices={field.choices ?? []}
								placeholder={field.placeholder}
								size="md"
								value={field.value as string[]}
								error={field.error}
								isInvalid={!!field.error}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								isRequired={field.isRequired}
								setSelectedItems={field.dispatcher}
								onChange={onChange}
							/>
						);
				}
			}
		});
	};

	return (
		<VStack spacing="1rem" w="100%" align="stretch">
			{renderFields(fields)}
		</VStack>
	);
};
