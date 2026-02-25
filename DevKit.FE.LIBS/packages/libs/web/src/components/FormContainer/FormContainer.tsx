'use client';

import { ReactNode } from 'react';

export interface IFormContainerProps {
	/**	Defines the number of elements (columns) to render in each horizontal line*/
	columnsCount?: number;
	/**React elements to be rendered */
	children: ReactNode;
	/**Defines the number of elements (columns) to render in each horizontal line for mobile devices*/
	columnsCountForMobile?: number;
}

export const FormContainer = ({ columnsCount = 1, children, ...cssProps }: IFormContainerProps) => {
	return (
		<div
			style={{
				gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
			}}
			className="grid w-full gap-5"
			{...cssProps}
		>
			{children}
		</div>
	);
};
