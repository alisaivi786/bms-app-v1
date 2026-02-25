import clsx from 'clsx';

const dynamicFormWrapperStyles = clsx('flex flex-col gap-4');

const getWrapperStyle = (columnsCount: number) => {
	if (columnsCount > 1) {
		return 'flex-row gap-4';
	}

	return '';
};

const getFieldStyle = (columnsCount: number) => {
	if (columnsCount > 1) {
		return 'flex-1';
	}

	return '';
};

export default {
	dynamicFormWrapperStyles,
	getWrapperStyle,
	getFieldStyle,
};
