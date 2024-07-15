import React from 'react';

import './styles.css';
import { Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IProps {
	icon: IconType;
}

export const IconBadge: React.FC<IProps> = (props) => {
	const { icon } = props;
	return (
		<div className="feature-box-border">
			<div className="feature-box">
				<Icon as={icon} className="feature-icon" boxSize={['1.5rem', '1.5rem', '1.5rem', '1.5rem']} />
			</div>
		</div>
	);
};
