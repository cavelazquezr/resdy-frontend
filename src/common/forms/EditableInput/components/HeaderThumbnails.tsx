import React from 'react';

import { HStack, Image } from '@chakra-ui/react';

import { getSignedUrl } from '../../../../api/microservices';

interface IProps {
	headerPaths?: string[];
}

export const HeaderThumbnails: React.FC<IProps> = (props) => {
	const { headerPaths } = props;
	const [urls, setUrls] = React.useState<string[]>([]);

	React.useEffect(() => {
		const fetchUrls = async () => {
			if (headerPaths) {
				const urlPromises = headerPaths.map((path) => getSignedUrl(path));
				const results = await Promise.all(urlPromises);
				const newUrls = results.map((res) => res.data);
				setUrls(newUrls);
			}
		};

		fetchUrls();
	}, [headerPaths]);

	return (
		<HStack>
			{urls.map((url, index) => (
				<Image key={index} src={url} w="15rem" h="10rem" borderRadius="0.5rem" objectFit="cover" />
			))}
		</HStack>
	);
};
