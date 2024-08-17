import React from 'react';

import { Button, Box, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { ModalTemplate } from '../../../../../common/components/ModalTemplate/ModalTemplate';
import { NewForm } from '../../../../../common/forms/NewForm';
import { setSelectedCategory } from '../../../../../store/admin/reducer';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { CategoryUpdateInput } from '../../../../../types/categories';
import { FormField } from '../../../../../types/form';
import { updateCategorySchema } from '../schemas';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	handleUpdateCategory: (args: CategoryUpdateInput) => void;
}

export const CategoryEditModal: React.FC<IProps> = ({ isOpen, onClose, handleUpdateCategory }) => {
	const selectedCategory = useAppSelector((state) => state.admin.selectedCategory);

	const dispatch = useAppDispatch();

	const onSubmit = async (values) => {
		await handleUpdateCategory({ ...values, categoryId: selectedCategory?.id });
		onClose();
		dispatch(setSelectedCategory(null));
	};

	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			label: selectedCategory?.label || '',
		},
		enableReinitialize: true,
		onSubmit,
		validationSchema: updateCategorySchema,
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
					defaultValue: selectedCategory?.label,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['label'] && touched['label'] && (errors['label'] as any),
				},
			],
		},
	];

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	return (
		<ModalTemplate
			title="Editar categoría"
			isOpen={isOpen}
			onClose={() => {
				onClose();
				dispatch(setSelectedCategory(null));
			}}
		>
			<Box as="form" id="create-category" onSubmit={handleSubmit} noValidate>
				<VStack align="stretch" spacing="1rem">
					<NewForm formId="create-category" fields={fields} onBlur={handleBlur} onChange={handleChange} />
					<Button
						variant="primary"
						isDisabled={!isFormValid}
						type="submit"
						isLoading={isSubmitting}
						loadingText="Actualizando categoría"
					>
						Actualizar
					</Button>
				</VStack>
			</Box>
		</ModalTemplate>
	);
};
