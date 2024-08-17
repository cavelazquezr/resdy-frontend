import React from 'react';

import { Button, Box, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { ModalTemplate } from '../../../../../common/components/ModalTemplate/ModalTemplate';
import { NewForm } from '../../../../../common/forms/NewForm';
import { allergenList } from '../../../../../common/utils/allergenList';
import { useMenuCategories } from '../../../../../hooks/useMenuCategories';
import { DishCreateInput } from '../../../../../types/dishes';
import { FormField } from '../../../../../types/form';
import { createDishSchema } from '../schemas';

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	handleCreateDish: (args: DishCreateInput) => void;
}

export const DishCreateModal: React.FC<IProps> = ({ isOpen, onClose, handleCreateDish }) => {
	const [selectedAllergen, setSelectedAllergen] = React.useState<string[]>([]);

	const onSubmit = async () => {
		const input = { ...values, allergen: selectedAllergen.join(',') };
		await handleCreateDish(input as DishCreateInput);
		resetForm();
	};

	const { values, errors, touched, isSubmitting, isValid, resetForm, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				name: '',
				category_id: '',
				description: '',
				price: 0,
				allergen: [],
			},
			enableReinitialize: true,
			onSubmit,
			validationSchema: createDishSchema,
		});

	const { categories } = useMenuCategories();

	React.useEffect(() => {
		resetForm();
	}, []);

	if (!categories) return <>Loading</>;

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
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['name'] && touched['name'] && (errors['name'] as any),
				},
				{
					id: 'description',
					label: 'Descripción',
					type: 'textarea',
					value: values['description'],
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['description'] && touched['description'] && (errors['description'] as any),
				},
				{
					id: 'category_id',
					label: 'Categoría',
					type: 'select',
					choices: categories.map((category) => ({ value: category.id, label: category.label })),
					value: values['category_id'],
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: errors['category_id'] && touched['category_id'] && (errors['category_id'] as any),
				},
				{
					id: 'price',
					label: 'Precio (€)',
					type: 'number',
					value: values['price'],
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

	return (
		<ModalTemplate
			size="2xl"
			title="Editar plato"
			isOpen={isOpen}
			onClose={() => {
				onClose();
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
