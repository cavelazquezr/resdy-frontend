export const getFormikInitialValues = (schema) => {
	const initialValues = {};
	const { fields } = schema;
	Object.keys(fields).forEach((key) => {
		switch (fields[key].type) {
			case 'string':
				initialValues[key] = '';
				break;
			case 'boolean':
				initialValues[key] = false;
				break;
		}
	});
	return initialValues;
};
