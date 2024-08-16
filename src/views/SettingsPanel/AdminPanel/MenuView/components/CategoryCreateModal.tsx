import React from 'react';

import { Button, Box, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { ModalTemplate } from '../../../../../common/components/ModalTemplate/ModalTemplate';
import { NewForm } from '../../../../../common/forms/NewForm';
import { CategoryCreateInput } from '../../../../../types/categories';
import { FormField } from '../../../../../types/form';
import { createCategorySchema } from '../schemas';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	handleCreateCategory: (args: CategoryCreateInput) => void;
}

export const CategoryCreateModal: React.FC<IProps> = ({ isOpen, onClose, handleCreateCategory }) => {
	const onSubmit = async () => {
		await handleCreateCategory(values as CategoryCreateInput);
		resetForm();
	};

	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit, resetForm } =
		useFormik({
			initialValues: {
				label: '',
			},
			onSubmit,
			validationSchema: createCategorySchema,
		});

	const fields: FormField[] = [
		{
			id: 'createCategoryGroup',
			groupId: 'createCategoryGroup',
			type: 'inlineGroup',
			children: [
				{
					id: 'label',
					label: 'Nombre de la categoría',
					type: 'text',
					value: values['label'],
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['label'] && touched['label'] && (errors['label'] as any),
				},
			],
		},
	];

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	return (
		<ModalTemplate isOpen={isOpen} onClose={onClose}>
			<Box as="form" id="create-category" onSubmit={handleSubmit} noValidate>
				<VStack align="stretch" spacing="1rem">
					<NewForm formId="create-category" fields={fields} onBlur={handleBlur} onChange={handleChange} />
					<Button
						variant="primary"
						isDisabled={!isFormValid}
						type="submit"
						isLoading={isSubmitting}
						loadingText="Creando categoría"
					>
						Crear
					</Button>
				</VStack>
			</Box>
		</ModalTemplate>
	);
};
