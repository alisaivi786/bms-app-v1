'use client';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import type { IErrorMessage } from '@devkit/utilities';
import { Modal } from '../DialogModal/Modal';

export interface IFormFieldErrorsProps {
	/** The input field error/errors text */
	errors?: string | string[] | IErrorMessage[] | IErrorMessage;
	/** Provide a modal to show the error message, if the `enabled` is false the modal will not be provided */
	errorModal?: {
		enabled: boolean;
		message?: string;
	};
}

export const FormFieldErrors = ({ errors, errorModal }: IFormFieldErrorsProps) => {
	const hasErrors = !isEmpty(errors);
	const [isOpen, setIsOpen] = useState(false);

	const ModelView = () => {
		return (
			<>
				{errorModal?.enabled && Array.isArray(errors) && (
					<Modal
						isOpen={isOpen}
						onClose={() => {
							setIsOpen(false);
						}}
						title="Errors"
					>
						{errors?.map((error, index) => (
							<div key={index} className="flex gap-1 text-red-500">
								<div>-</div>
								<div className="font-medium text-caption1">
									{typeof error === 'string' ? error : error.errorMessage}
								</div>
							</div>
						))}
					</Modal>
				)}
			</>
		);
	};

	return (
		<>
			{hasErrors && (
				<div className="pt-1.5">
					{typeof errors === 'string' && <div className="font-medium text-red-500 text-caption1">{errors}</div>}
					{typeof errors !== 'string' &&
						Array.isArray(errors) &&
						(errorModal?.enabled && errors?.length > 1 ? (
							<div className="flex gap-2">
								<div className="font-medium text-red-500 text-caption1">
									{errorModal?.message || (typeof errors[0] === 'string' ? errors[0] : errors[0].errorMessage)}
								</div>
								<div
									className="font-medium text-caption1 nj-text-brand hover:cursor-pointer hover:text-brand-400"
									onClick={() => {
										setIsOpen(true);
									}}
								>
									View
								</div>
							</div>
						) : (
							errors?.map((error) => (
								<>
									{typeof error === 'string' && <div className="font-medium text-red-500 text-caption1">{error}</div>}
									{typeof error !== 'string' && (
										<div className="font-medium text-red-500 text-caption1">{error.errorMessage}</div>
									)}
								</>
							))
						))}
					{typeof errors !== 'string' && !Array.isArray(errors) && (
						<>
							{typeof errors === 'string' && <div className="font-medium text-red-500 text-caption1">{errors}</div>}
							{typeof errors !== 'string' && (
								<div className="font-medium text-red-500 text-caption1">{errors?.errorMessage}</div>
							)}
						</>
					)}
				</div>
			)}
			<ModelView />
		</>
	);
};
