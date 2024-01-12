interface InputChoices {
	label: string;
	value: string;
}

export type InputConfiguration = {
	id: string;
	label: string;
	type: string;
	placeholder?: string;
	colSpan?: number;
	value?: string;
	choices?: InputChoices[];
	tooltip?: string;
};
