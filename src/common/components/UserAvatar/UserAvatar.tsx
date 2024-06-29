import React from 'react';

import { Avatar, AvatarProps } from '@chakra-ui/react';

import { getSignedUrl } from '../../../api/microservices';

interface IProps extends AvatarProps {
	avatarPath?: string | null;
}

export const UserAvatar: React.FC<IProps> = (props) => {
	const { avatarPath, size } = props;
	const [url, setUrl] = React.useState<string | undefined>(undefined);

	React.useEffect(() => {
		if (avatarPath) {
			getSignedUrl(avatarPath).then((res) => setUrl(res.data));
		}
	}, [avatarPath]);

	console.log('url', url);

	return <Avatar size={size} src={url} />;
};
