type FieldChoice = {
	label: string;
	value: string;
};

type FieldTypes =
	| 'text'
	| 'number'
	| 'textarea'
	| 'select'
	| 'password'
	| 'checkbox'
	| 'radio'
	| 'date'
	| 'time'
	| 'avatar'
	| 'dragAndDrop'
	| 'autoComplete'
	| 'inlineGroup';

export type FieldValue = string | number | boolean | Date | null;

export type FormField = {
	id: string;
	label: string;
	type: FieldTypes;
	description?: string;
	placeholder?: string;
	colSpan?: number;
	value?: FieldValue;
	choices?: Array<FieldChoice>;
	children?: FormField[];
	tooltip?: string;
	blocked?: boolean;
	groupId?: string;
	dependsOn?: Array<string>;
	dependsOnGroup?: Array<string>;
	error?: string;
	isDisabled?: boolean;
};
