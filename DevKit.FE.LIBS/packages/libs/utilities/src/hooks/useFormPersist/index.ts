'use client';

import { useEffect } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { ReactForm } from '../useReactForm';

type Options<T extends FieldValues> = {
	excludeValues?: (keyof T)[];
	excludeErrors?: (keyof T)[];
	onDataRestored?: (data: T) => void;
	onErrorRestored?: (data: ReactForm<T>['fieldsErrors']) => void;
	onTimeout?: () => void;
	timeout?: number;
	error?: boolean;
	data?: boolean;
};
type FormPersistConfig<T extends FieldValues> = {
	form: ReactForm<T>;
	storage: Storage;
	formId: string;
	options?: Options<T>;
};

/**
 * a React hook to persist form values or errors or both in storage
 * @constructor
 * @param {FormPersistConfig<T>} props
 * @param {ReactForm<T>} props.form - the form to persist its data and errors
 * @param {string} props.formId - the key in storage to store in
 * @param {Storage} props.storage - the storage to store in eg: localStorage-sessionStorage
 * @param {Object} [props.options] - optional object to customize the hook
 * @param {boolean} [props.options.data=true] - optional prop to specify whether to save data or not by default it's true
 * @param {boolean} [props.options.error=true] - optional prop to specify whether to save errors or not by default it's true
 * @param {number} [props.options.timeout]- optional to clear the stored values after certain time
 * @param {(data: T) => void} [props.options.onDataRestored] - optional callback to call when data restored
 * @param {(data: T) => void} [props.options.onErrorRestored] - optional callback to call when error restored
 * @param {() => void} [props.options.onTimeout] - optional callback to call when data exceeds timeout
 * @param {(keyof T)[]} [props.options.excludeValues] - optional value fields array to exclude from saving
 * @param {(keyof T)[]} [props.options.excludeErrors] - optional error fields array to exclude from saving
 */
export const useFormPersist = <T extends FieldValues>(props: FormPersistConfig<T>) => {
	const { form, storage, formId, options } = props;
	const { watchValues, setFieldValue, fieldsErrors, setFieldError } = form;
	const {
		excludeValues = [],
		excludeErrors = [],
		onDataRestored,
		onErrorRestored,
		error = true,
		data = true,
		onTimeout,
		timeout,
	} = options ?? {};

	const watchedValues = watchValues();
	const clearStorage = () => storage.removeItem(formId);

	useEffect(() => {
		const str = storage.getItem(formId);

		if (str) {
			const { _timestamp = null, storeValues, storeErrors } = JSON.parse(str);

			const dataRestored: T = {} as T;
			const errorRestored = {} as ReactForm<T>['fieldsErrors'];

			const currTimestamp = Date.now();

			if (timeout && currTimestamp - _timestamp > timeout) {
				onTimeout && onTimeout();
				clearStorage();

				return;
			}

			if (data) {
				Object.keys(storeValues).forEach((key) => {
					const shouldSet = !excludeValues.includes(key);

					if (shouldSet) {
						dataRestored[key as keyof T] = storeValues[key];
						setFieldValue(key as Path<T>, storeValues[key]);
					}
				});

				if (onDataRestored) {
					onDataRestored(dataRestored);
				}
			}

			if (error) {
				Object.keys(storeErrors).forEach((key) => {
					const shouldSet = !excludeErrors.includes(key);

					if (shouldSet) {
						errorRestored[key as keyof ReactForm<T>['fieldsErrors']] = storeErrors[key];

						if (storeErrors[key].type === 'CustomError') {
							setFieldError(key as Path<T>, storeErrors[key]);
						}
					}
				});

				if (onErrorRestored) {
					onErrorRestored(errorRestored);
				}
			}
		}
	}, [storage, formId, onDataRestored, onErrorRestored, setFieldValue, setFieldError]);

	useEffect(() => {
		const storeValues = excludeValues.length
			? Object.entries(watchedValues)
					.filter(([key]) => !excludeValues.includes(key))
					.reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
			: Object.assign({}, watchedValues);

		const storeErrors = excludeErrors.length
			? Object.entries(fieldsErrors)
					.filter(([key]) => !excludeErrors.includes(key))
					.reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
			: Object.assign({}, fieldsErrors);

		if (Object.entries(storeValues).length || Object.entries(storeErrors).length) {
			storage.setItem(
				formId,
				JSON.stringify({
					storeValues,
					storeErrors,
					...(timeout
						? {}
						: {
								_timestamp: Date.now(),
						  }),
				})
			);
		}
	}, [watchedValues, timeout, fieldsErrors]);

	return {
		clear: clearStorage,
	};
};
