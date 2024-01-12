import React from 'react';

import { Box, Flex, Img, Text, VStack } from '@chakra-ui/react';

import { ImageStepper } from './ImageStepper';
import step1Create from '../../../../assets/illustrations/create1.svg';
import step2Create from '../../../../assets/illustrations/create2.svg';
import step3Create from '../../../../assets/illustrations/create3.svg';
import ellipses from '../../../../assets/illustrations/ellipses.svg';
import step1 from '../../../../assets/illustrations/login1.svg';
import step2 from '../../../../assets/illustrations/login2.svg';
import step3 from '../../../../assets/illustrations/login3.svg';
import './style.css';
import 'animate.css';

const contentByStep = {
	1: {
		img: step1,
		label: 'Empieza a conseguir restaurantes cerca de tí para hacer tus planes',
	},
	2: {
		img: step2,
		label: 'Al ser usuario de Resdy, muchos restaurantes ofrecerán promociones',
	},
	3: {
		img: step3,
		label: 'Además de ver los sitios más recomendados cerca de tí',
	},
};

const contentByRestaurantCreation = {
	1: {
		img: step1Create,
		label: 'El primer paso para dar de alta es ingresar los datos de la cuenta administradora',
	},
	2: {
		img: step2Create,
		label: 'Cuéntanos donde esta ubicado tu restaurante para empezar a posicionarte',
	},
	3: {
		img: step3Create,
		label: 'Podrás añadir más personalizaciones a tu página de tu restaurante',
	},
};

interface IProps {
	isRestaurantCreationView?: boolean;
}

export const ImagePanel: React.FC<IProps> = (props) => {
	const { isRestaurantCreationView } = props;
	const [step, setStep] = React.useState(1);
	const [content, setContent] = React.useState<Record<string, string>>(contentByStep[step]);
	const [animationKey, setAnimationKey] = React.useState(1); // Introduce a key for remounting

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setStep((prevStep) => (prevStep % 3) + 1);
			setAnimationKey((prevKey) => prevKey + 1); // Increment the key to force remount
		}, 5000);

		// Clear the interval when the component unmounts
		return () => clearInterval(intervalId);
	}, []);

	React.useEffect(() => {
		setContent(!isRestaurantCreationView ? contentByStep[step] : contentByRestaurantCreation[step]);
	}, [step]);

	return (
		<Box w="100%" h="100%" overflow="hidden" position="relative">
			<Box id="rotational_ellipses" position="absolute" h="100%" w="100%" objectFit="cover">
				<Img src={ellipses} h="100%" w="100%" />
			</Box>

			<Flex
				key={animationKey} // Use key to force remount and apply animation classes
				w="100%"
				h="100%"
				justifyContent="center"
				alignItems="center"
				className="animate__fadeIn animate__animated"
			>
				<Img src={content.img} zIndex={3} h="45%" objectFit="cover" />
			</Flex>

			<Text
				position="absolute"
				top="80%"
				w="100%"
				px="10%"
				textStyle="heading5"
				color="white"
				textAlign="center"
				className="animate__fadeIn animate__animated"
			>
				{content.label}
			</Text>
			<Box position="absolute" top="90%" w="100%" px="20%">
				<ImageStepper steps={3} stepsDone={step} />
			</Box>
		</Box>
	);
};
