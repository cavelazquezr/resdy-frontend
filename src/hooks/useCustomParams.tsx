import { useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

export function useCustomParams<T extends string>(requiredParams: T[], callback?: () => unknown) {
	const rawParams = useParams();
	const navigate = useNavigate();
	const toast = useToast();
	const knownParams = {} as Record<T, string>;

	for (const param of requiredParams) {
		if (rawParams[param] === undefined) {
			console.error(`Missing required param: ${param}`);
			toast({
				title: 'Malformed URL',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			callback ? callback() : navigate('/');
			break;
		} else {
			knownParams[param] = rawParams[param] as string;
		}
	}

	return knownParams;
}
