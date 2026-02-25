import React from 'react';
import BaseButton from './BaseButton';
import { ButtonProps } from './types';

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<BaseButton type="button" {...props}>
			{children}
		</BaseButton>
	);
};

export default Button;
