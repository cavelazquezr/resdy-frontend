import React from 'react';

import { Button, HStack, Icon, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { FaRegStar, FaStar } from 'react-icons/fa';
import * as yup from 'yup';

import { putRating } from '../../../../api/rating';
import { MessageModal } from '../../../../common/components/MessageModal/MessageModal';
import { ModalTemplate as Modal } from '../../../../common/components/ModalTemplate/ModalTemplate';
import { NewInput } from '../../../../common/components/NewInput/NewInput';
import { NewTextArea } from '../../../../common/components/NewTextArea/NewTextArea';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { UpdateRatingRecord } from '../../../../types/rating';

const schema = yup.object({
	title: yup.string().required(),
	comment: yup.string().required(),
});

interface IProps {
	ratingId: string;
	isOpenForm: boolean;
	onCloseForm: () => void;
	handleToggle: () => void;
}

export const UploadRatingForm: React.FC<IProps> = (props) => {
	const { ratingId, isOpenForm, onCloseForm, handleToggle } = props;
	const [rating, setRating] = React.useState<number>(0);
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

	// Get QueryClient from the context
	const queryClient = useQueryClient();

	const handleSetRating = (ratingIndex: number) => {
		setRating(ratingIndex);
	};

	const mutation = useMutation({
		mutationFn: (ratingUpdateRecord: UpdateRatingRecord) => {
			return putRating(ratingUpdateRecord);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['myRatingsQuery'],
			});
			handleToggle();
			onOpen();
		},
	});

	const onSubmit = async () => {
		const mutatedRating: UpdateRatingRecord = {
			rating,
			ratingId,
			title: (values as UpdateRatingRecord).title,
			comment: (values as UpdateRatingRecord).comment,
		};
		console.log(mutatedRating);
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
			<Modal title="Valora tu experiencia" isOpen={isOpenForm} onClose={onCloseForm}>
				<form onSubmit={handleSubmit} noValidate>
					<VStack w="100%" spacing="1.5rem">
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
						<VStack w="100%">
							<Button
								variant="solidPrimary"
								size="md"
								w="100%"
								type="submit"
								isDisabled={!isFormValid}
								isLoading={isSubmitting}
								loadingText={'Cargando'}
							>
								Dejar reseña
							</Button>
							<Button variant="solidDefault" size="md" w="100%" onClick={handleToggle}>
								Cancelar
							</Button>
						</VStack>
					</VStack>
				</form>
			</Modal>
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
		<HStack>
			{Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
				<Icon
					h="2rem"
					w="2rem"
					color={ratingIndex >= rating || hoverIndex >= rating ? 'yellow.400' : 'gray.500'}
					filter={ratingIndex >= rating || hoverIndex >= rating ? 'drop-shadow(0 4px 10px #00000040)' : 'none'}
					transition="color 0.2s ease-in-out"
					key={rating}
					as={ratingIndex >= rating ? FaStar : FaRegStar}
					cursor="pointer"
					onMouseOver={() => setHoverIndex(rating)}
					onClick={() => {
						setRatingIndex(rating);
					}}
					onMouseLeave={() => setHoverIndex(0)}
				/>
			))}
		</HStack>
	);
};
