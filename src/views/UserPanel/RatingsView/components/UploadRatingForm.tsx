import React from 'react';

import { Button, ButtonProps, HStack, Icon, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { FaRegStar, FaStar } from 'react-icons/fa';
import * as yup from 'yup';

import { putRating } from '../../../../api/rating';
import { MessageModal } from '../../../../common/components/MessageModal/MessageModal';
import { NewInput } from '../../../../common/forms/NewInput/NewInput';
import { NewTextArea } from '../../../../common/components/NewTextArea/NewTextArea';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { RatingUpdateRecord } from '../../../../types/rating';

const schema = yup.object({
	title: yup.string().required(),
	comment: yup.string().required(),
});

interface IProps {
	ratingId: string;
	resetEditingRating: () => void;
}

export const UploadRatingForm: React.FC<IProps> = (props) => {
	const { ratingId } = props;
	const [rating, setRating] = React.useState<number>(0);
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

	// Get QueryClient from the context
	const queryClient = useQueryClient();

	const handleSetRating = (ratingIndex: number) => {
		setRating(ratingIndex);
	};

	const mutation = useMutation({
		mutationFn: (ratingUpdateRecord: RatingUpdateRecord) => {
			return putRating(ratingUpdateRecord);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['myRatingsQuery'],
			});
			onOpen();
		},
	});

	const onSubmit = async () => {
		const mutatedRating: RatingUpdateRecord = {
			rating,
			id: ratingId,
			title: (values as RatingUpdateRecord).title,
			comment: (values as RatingUpdateRecord).comment,
		};
		mutation.mutate(mutatedRating);
	};

	const { values, isSubmitting, isValid, handleChange, handleBlur, handleSubmit } = useFormik({
		initialValues: getFormikInitialValues(schema),
		onSubmit,
		validationSchema: schema,
	});

	const isFormValid = isValid && !Object.values(values).some((value) => value === '') && rating > 0;

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
				<VStack align="stretch" w="100%" spacing="1.5rem">
					<Text textStyle="heading5" color="gray.900">
						Valora tu experiencia
					</Text>
					<Text textAlign="start" w="100%" textStyle="body2" color="gray.500">
						Comparte con el resto tu experiencia en el restaurante.
					</Text>
					<RatingSelect onChange={handleSetRating} />
					<NewInput
						type="text"
						id="title"
						label="Título"
						size="md"
						value={values['title']}
						isDisabled={isSubmitting}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					<NewTextArea
						id="comment"
						label="Comentario"
						value={values['comment']}
						isDisabled={isSubmitting}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					<Button
						variant="primary"
						w="fit-content"
						px="1.5rem"
						size="md"
						type="submit"
						isDisabled={!isFormValid}
						isLoading={isSubmitting}
						loadingText={'Cargando'}
					>
						Dejar reseña
					</Button>
				</VStack>
			</form>
			<MessageModal
				isOpen={isOpen}
				onClose={onClose}
				handleToggle={onToggle}
				title="¡Reseña enviada!"
				bodyText="Tu reseña ayuda a los restaurantes que más te gusten a posicionarse. Muchas gracias por colaborar."
			/>
		</React.Fragment>
	);
};

const RatingSelect: React.FC<{ onChange: (rating: number) => void }> = (props) => {
	const { onChange } = props;
	const [hoverIndex, setHoverIndex] = React.useState<number>(0);
	const [ratingIndex, setRatingIndex] = React.useState<number>(0);

	React.useEffect(() => {
		onChange(ratingIndex);
	}, [ratingIndex]);

	return (
		<HStack spacing="0.75rem">
			{Array.from({ length: 5 }, (_, i) => i + 1).map((rating, index) => (
				<RatingButton
					key={index}
					isHovered={hoverIndex >= rating}
					isActive={ratingIndex >= rating}
					onClick={() => {
						setRatingIndex(rating);
					}}
					onMouseLeave={() => setHoverIndex(0)}
					onMouseOver={() => setHoverIndex(rating)}
				/>
			))}
		</HStack>
	);
};

interface IRatingButtonProps extends ButtonProps {
	isActive?: boolean;
	isHovered?: boolean;
}

const RatingButton: React.FC<IRatingButtonProps> = (props) => {
	const { isActive = false, isHovered, onClick, onMouseLeave, onMouseOver } = props;

	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<IconButton
			as="span"
			ref={ref}
			aria-label="rating"
			variant="default-light"
			px="1.5rem"
			_hover={{ bg: 'brand-gray.100' }}
			transform={isActive || isHovered ? 'scale(1.1)' : 'none'}
			onClick={onClick}
			onMouseLeave={onMouseLeave}
			onMouseOver={onMouseOver}
		>
			<Icon
				h="1.5rem"
				w="1.5rem"
				color={isActive ? 'yellow.400' : 'brand-gray.200'}
				as={isActive || isHovered ? FaStar : FaRegStar}
			/>
		</IconButton>
	);
};
