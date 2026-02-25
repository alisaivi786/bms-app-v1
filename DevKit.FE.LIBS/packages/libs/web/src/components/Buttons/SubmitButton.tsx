'use client';
import { useFormContext } from '../Form/Form';
import BaseButton from './BaseButton';
import { ResetButtonProps } from './types';

const SubmitButton = (props: ResetButtonProps) => {
	const { isSubmitting } = useFormContext();

	return (
		<BaseButton {...props} type="submit" isLoading={isSubmitting}>
			{props.children}
		</BaseButton>
	);
};

export default SubmitButton;
