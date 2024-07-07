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
	| 'inlineGroup'
	| 'formStack';

export type FieldValue = string | number | boolean | Date | null;

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
