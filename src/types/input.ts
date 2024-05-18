interface InputChoices {
	label: string;
	value: string;
}

export type InputValueType = string | number | boolean | Date | null;

export type InputConfiguration = {
	id: string;
	label: string;
	type: string;
	description?: string;
	placeholder?: string;
	colSpan?: number;
	value?: InputValueType;
	choices?: InputChoices[];
	tooltip?: string;
	blocked?: boolean;
};
