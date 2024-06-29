import React from 'react';

import { GridItem, VStack } from '@chakra-ui/react';

import { AutoCompleteInput } from './AutoCompleteInput/AutoCompleteInput';
import { DragAndDrop } from './DragAndDrop/DragAndDrop';
import { FormStack } from './FormStack/FormStack';
import { InlineForm } from './InlineForm/InlineForm';
import { NewInput } from './NewInput/NewInput';
import { NewSelect } from './NewSelect/NewSelect';
import { FormField } from '../../types/form';

interface IProps {
	fields: Array<FormField>;
	isSubmitting?: boolean;
	isDisabled?: boolean;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
}

export const NewForm: React.FC<IProps> = (props): React.ReactNode => {
	const { fields, ...restProps } = props;
	const { isSubmitting, isDisabled, onBlur, onChange, onKeyDown } = restProps;

	const renderFields = (fields: FormField[]) => {
		return fields.map((field, index) => {
			switch (field.type) {
				case 'text':
				case 'password':
					return (
						<GridItem key={index} colSpan={field.colSpan ?? 2}>
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
								onBlur={onBlur}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</GridItem>
					);
				case 'select':
					return (
						<GridItem key={index} colSpan={field.colSpan ?? 2}>
							<NewSelect
								key={index}
								label={field.label}
								id={field.id}
								choices={(field.choices ?? []).map((choice) => (
									<option key={choice.value} value={choice.value}>
										{choice.label}
									</option>
								))}
								placeholder={field.placeholder}
								size="md"
								value={field.value as string}
								error={field.error}
								isInvalid={!!field.error}
								isDisabled={field.isDisabled || isSubmitting || isDisabled}
								onChange={onChange}
							/>
						</GridItem>
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
			}
		});
	};

	return (
		<VStack spacing="1rem" w="100%" align="stretch">
			{renderFields(fields)}
		</VStack>
	);
};
