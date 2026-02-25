import clsx from 'clsx';
import { I18nManager } from 'react-native';

const container = (isRtlLocale?: boolean) =>
	clsx(
		'pt-1.5',
		'nj-error-container-width',
		'nj-error-container-flex',
		I18nManager.isRTL === isRtlLocale ? 'flex-row' : 'flex-row-reverse',
		'nj-error-container-align-items',
		'nj-error-container-gap',
		'nj-error-container-margin-top',
		'nj-error-container-bg',
		'nj-error-container-border-radius',
		'nj-error-container-padding-horizontal',
		'nj-error-container-padding-vertical'
	);

const errorText = (reverseLayout?: boolean) =>
	clsx(
		'nj-error-text-font nj-error-text-font-size nj-error-text-font-color',
		reverseLayout ? 'text-right' : 'text-left'
	);

const icon = clsx('nj-error-text-font-color nj-error-icon-display');

export default {
	container,
	errorText,
	icon,
};
