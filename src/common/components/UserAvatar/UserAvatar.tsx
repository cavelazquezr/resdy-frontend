import React from 'react';

import { Avatar, AvatarProps } from '@chakra-ui/react';

interface IProps extends AvatarProps {
	avatarUrl?: string;
}

export const UserAvatar: React.FC<IProps> = (props) => {
	const { avatarUrl, size } = props;

	return <Avatar size={size} src={avatarUrl} />;
};
