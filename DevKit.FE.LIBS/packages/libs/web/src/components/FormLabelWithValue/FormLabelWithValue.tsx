import React from 'react';

export interface IFormLabelWithValueProps {
	/** The label  to be render */
	label: string;
	/** The value to be render */
	value: React.ReactNode;
}

export const FormLabelWithValue = ({ label, value }: IFormLabelWithValueProps) => {
	return (
		<div className="flex flex-col gap-1 items-start flex-1">
			<p className="text-gray-700 text-caption1">{label}</p>
			{value}
		</div>
	);
};
