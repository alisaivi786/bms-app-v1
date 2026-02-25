import React, { ReactNode } from 'react';

export interface ICardProps {
	/**
	 * React elements to be render within the Card component
	 */
	children: ReactNode;
	/**
	 * Main container class names
	 */
	className?: string;
	/**
	 * Variant (responsive or default)
	 */
	variant?: 'responsive' | 'default';
}
const Card = ({ children, className, variant = 'default' }: ICardProps) => {
	return (
		<section
			data-testid="card"
			className={`shadow-card rounded-xl p-6 xl:p-8
      ${variant == 'responsive' ? 'max-sm:p-0 max-sm:rounded-none max-sm:shadow-none' : ''}
      ${className}`}
		>
			{children}
		</section>
	);
};

export default Card;
