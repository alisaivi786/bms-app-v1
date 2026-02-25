'use client';

import { isFunction } from 'lodash';
import { useCallback } from 'react';
import { FieldValues, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import { SystemLocale } from '../../factories/AppContextFactory';
import { ITFunction } from '../../types';
import { ReactFormOptions } from './types';

const useValidationResolver = <T extends FieldValues>(
	options: ReactFormOptions<T>,
	locale: SystemLocale,
	translate: ITFunction
) => {
	const { validation, validationMode } = options;

	const resolver: Resolver<T, unknown> = useCallback(
		async (...params) => {
			const values = params[0];

			if (!validation) return { values, errors: {} };

			if (validationMode === 'zod') {
				const validationSchema = isFunction(validation) ? validation(values) : validation;

				return zodResolver(validationSchema)(...params);
			} else {
				const validationSchema = isFunction(validation) ? validation(values) : validation;

				return yupResolver(validationSchema)(...params);
			}
		},
		[validation, locale, translate]
	);

	return resolver;
};

export default useValidationResolver;
