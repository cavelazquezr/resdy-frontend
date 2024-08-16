import React from 'react';

import { Button, Box, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { ModalTemplate } from '../../../../../common/components/ModalTemplate/ModalTemplate';
import { NewForm } from '../../../../../common/forms/NewForm';
import { allergenList } from '../../../../../common/utils/allergenList';
import { setSelectedCategory } from '../../../../../store/admin/reducer';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { DishUpdateInput } from '../../../../../types/dishes';
import { FormField } from '../../../../../types/form';
import { updateDishSchema } from '../schemas';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	handleUpdateDish: (args: DishUpdateInput) => void;
}

export const DishEditModal: React.FC<IProps> = ({ isOpen, onClose, handleUpdateDish }) => {
	const selectedDish = useAppSelector((state) => state.admin.selectedDish);
	const [selectedAllergen, setSelectedAllergen] = React.useState<string[]>(
		selectedDish?.allergen ? selectedDish?.allergen.split(',') : [],
	);

	const dispatch = useAppDispatch();

	const onSubmit = async (values) => {
		const input: DishUpdateInput = { ...values, allergen: selectedAllergen.join(',') };

		await handleUpdateDish({ ...input, dishId: selectedDish?.id ?? '' });
		onClose();
		dispatch(setSelectedCategory(null));
	};

	const { values, errors, touched, isSubmitting, isValid, resetForm, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				name: selectedDish?.name || '',
				description: selectedDish?.description || '',
				price: selectedDish?.price || 0,
				allergen:
					selectedDish?.allergen !== null && selectedDish?.allergen !== '' ? selectedDish?.allergen.split(',') : [],
			},
			enableReinitialize: true,
			onSubmit,
			validationSchema: updateDishSchema,
		});

	const fields: FormField[] = [
		{
			id: 'createCategoryGroup',
			groupId: 'createCategoryGroup',
			type: 'inlineGroup',
			children: [
				{
					id: 'name',
					label: 'Nombre del plato',
					type: 'text',
					value: values['name'],
					defaultValue: selectedDish?.name,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['name'] && touched['name'] && (errors['name'] as any),
				},
				{
					id: 'description',
					label: 'Descripción',
					type: 'textarea',
					value: values['description'],
					defaultValue: selectedDish?.description,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['description'] && touched['description'] && (errors['description'] as any),
				},
				{
					id: 'price',
					label: 'Precio (€)',
					type: 'number',
					value: values['price'],
					defaultValue: selectedDish?.price,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['price'] && touched['price'] && (errors['price'] as any),
				},
				{
					id: 'allergen',
					label: 'Alérgenos',
					type: 'multiSelect',
					choices: allergenList,
					value: values['allergen'],
					defaultValue: selectedAllergen,
					dispatcher: setSelectedAllergen,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['allergen'] && touched['allergen'] && (errors['allergen'] as any),
				},
			],
		},
	];

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	React.useEffect(() => {
		resetForm();
	}, []);

	return (
		<ModalTemplate
			size="2xl"
			title="Editar plato"
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
