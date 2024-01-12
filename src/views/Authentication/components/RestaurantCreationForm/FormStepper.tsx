import React, { useEffect } from 'react';

import {
	Box,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Text,
	useSteps,
} from '@chakra-ui/react';

const steps = [
	{ title: 'Primero', description: 'Administrador' },
	{ title: 'Segundo', description: 'Restaurante' },
	{ title: 'Tercero', description: 'Básicos' },
];

interface IProps {
	currentStep: number;
}

export const FormStepper: React.FC<IProps> = (props) => {
	const { currentStep } = props;
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});

	useEffect(() => {
		setActiveStep(currentStep);
	}, [currentStep]);

	return (
		<Stepper size="lg" colorScheme="brand-primary" index={activeStep} w="100%">
			{steps.map((step, index) => (
				<Step key={index}>
					<StepIndicator>
						<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
					</StepIndicator>

					<Box flexShrink="0">
						<StepTitle>
							<Text textStyle="body2">{step.title}</Text>
						</StepTitle>
						<StepDescription>
							<Text textStyle="body3">{step.description}</Text>
						</StepDescription>
					</Box>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
};
