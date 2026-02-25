'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FieldValues, ReactForm } from '@devkit/utilities';
import { devkitWebConstants } from '../../common/devkitUtilities';

export type FormProps<TForm extends FieldValues> = {
	form?: ReactForm<TForm>;
	children: ReactNode;

	/**
	 * @desc onSubmit gives flexibility to perform action on on submit, better to use form prop
	 */
	onSubmit?: () => Promise<void> | void;

	/**
	 * @desc onReset gives flexibility to perform action on on form reset, better to use form prop
	 */
	onReset?: () => Promise<void> | void;
	className?: string;
};

type FormComponent = <T extends FieldValues>(props: FormProps<T>) => JSX.Element;

const formContext = createContext({
	isSubmitting: false,
});

/**
 *
 * @desc A html form tag to provide onSubmit and onReset functionality on form submission
 * @returns A wrapped form react component, which accepts generic devkitForm
 */
export const Form: FormComponent = ({ form, className, children, onSubmit, onReset }) => {
	const [runScroll, setRunScroll] = useState(false);

	useEffect(() => {
		if (runScroll) {
			if (typeof window !== undefined && window.document) {
				document
					.querySelector(
						`[${devkitWebConstants.formIdAttribute}="${form?.formId}"][${devkitWebConstants.errorAttribute}="true"]`
					)
					?.scrollIntoView({ block: 'center' });
			}

			setRunScroll(false);
		}
	}, [runScroll]);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				e.stopPropagation();

				if (onSubmit) await onSubmit();
				else await form?.submitForm();

				setTimeout(() => {
					setRunScroll(true);
				});
			}}
			onReset={async (e) => {
				e.preventDefault();
				e.stopPropagation();

				if (onReset) await onReset();
				else await form?.resetForm();
			}}
			className={className}
		>
			<formContext.Provider value={{ isSubmitting: form?.isSubmitting ?? false }}>{children}</formContext.Provider>
		</form>
	);
};

export const useFormContext = () => useContext(formContext);
