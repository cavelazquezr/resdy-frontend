type FieldChoice = {
	label: string;
	value: string;
};

type FieldTypes =
	| 'text'
	| 'number'
	| 'textarea'
	| 'select'
	| 'socialMedia'
	| 'password'
	| 'checkbox'
	| 'radio'
	| 'date'
	| 'time'
	| 'avatar'
	| 'headers'
	| 'dragAndDrop'
	| 'autoComplete'
	| 'inlineGroup'
	| 'formStack'
	| 'multiSelect';

export type FieldValue = string | number | boolean | Date | null | Record<string, unknown> | Array<string> | undefined;

export type FormField = {
	id: string;
	label?: string;
	type: FieldTypes;
	description?: string;
	placeholder?: string;
	colSpan?: number;
	value?: FieldValue;
	defaultValue?: FieldValue;
	choices?: Array<FieldChoice>;
	limit?: number;
	children?: FormField[];
	tooltip?: string;
	stack?: 'horizontal' | 'vertical';
	blocked?: boolean;
	groupId?: string;
	dependsOn?: Array<string>;
	dependsOnGroup?: Array<string>;
	error?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	isEditable?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dispatcher?: React.Dispatch<React.SetStateAction<any>>;
	onBlur?: () => void;
	keyPrefix?: string; // Used to generate unique keys for files to be uploaded
};
