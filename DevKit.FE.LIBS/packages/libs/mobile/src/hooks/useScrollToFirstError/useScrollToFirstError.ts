import { useCallback } from 'react';
import { FieldValues, ReactForm } from '@devkit/utilities';
import { useFormFieldsRefs } from '../../components/DynamicForm/FormFieldsRefsContext';
import { useScroll } from '../useScroll/useScroll';

const DEFAULT_SCROLL_OFFSET = -20;

interface UseScrollToFirstErrorOptions<T extends FieldValues> {
	/** Form to get the fields errors from */
	form: ReactForm<T>;
	/** Offset for the scroll position (negative values scroll above the element) */
	scrollOffset?: number;
}

/**
 * Hook that provides a function to scroll to the first field with an error.
 * Must be used within a FormFieldsRefsProvider and ScrollProvider context.
 *
 * @example
 * ```tsx
 * const { scrollToFirstError } = useScrollToFirstError({
 *   form: form,
 * });
 *
 * const handleSubmit = async () => {
 *   try {
 *     await form.submitForm();
 *   } catch {
 *     scrollToFirstError(form.fieldsErrors);
 *   }
 * };
 * ```
 */
export const useScrollToFirstError = <T extends FieldValues>({
	form,
	scrollOffset = DEFAULT_SCROLL_OFFSET,
}: UseScrollToFirstErrorOptions<T>) => {
	const { scrollToElement } = useScroll();
	const formFieldsRefs = useFormFieldsRefs();

	const scrollToFirstError = useCallback(() => {
		if (!formFieldsRefs || !form.fieldsErrors) return;

		// Find the first field with an error based on form errors
		const firstErrorField = Object.keys(form.fieldsErrors).find((field) => {
			const fieldKey = field as keyof typeof form.fieldsErrors;

			return form.fieldsErrors[fieldKey] !== undefined;
		});

		if (firstErrorField) {
			const fieldRef = formFieldsRefs.getFieldRef(firstErrorField as string);

			if (fieldRef) {
				scrollToElement(fieldRef, scrollOffset);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(form.fieldsErrors), formFieldsRefs, scrollOffset]);

	return { scrollToFirstError };
};
