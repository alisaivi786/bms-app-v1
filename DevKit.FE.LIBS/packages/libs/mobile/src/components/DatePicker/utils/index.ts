import { getDateUtilsConfig } from '@devkit/utilities';

export * from './get-date-formatter';

export * from './parse';

export * from './get-mask';

export const hourItems = () => {
	const { timeFormat } = getDateUtilsConfig();

	if (timeFormat === '12hr') {
		return Array.from({ length: 12 }, (_, index) => ({
			value: index,
			label: `${index === 0 ? 12 : index < 10 ? `0${index}` : index}`,
		}));
	}

	return Array.from({ length: 24 }, (_, index) => ({
		value: index,
		label: `${index < 10 ? `0${index}` : index}`,
	}));
};

export const minuteItems = Array.from({ length: 60 }, (_, index) => ({
	value: index,
	label: `${index < 10 ? `0${index}` : index}	`,
}));

export const ampmItems = [
	{ value: 'AM', label: 'AM' },
	{ value: 'PM', label: 'PM' },
];
