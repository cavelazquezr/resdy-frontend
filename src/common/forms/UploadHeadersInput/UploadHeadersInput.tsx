import React from 'react';

import { FormField } from '../../../types/form';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';

interface IProps {
	field: FormField;
}

export const UploadHeadersInput: React.FC<IProps> = (props) => {
	const { field } = props;
	return <DragAndDrop id={field.id} field={field} hideLabel filesLimit={3} />;
};
