const HTML_TAGS = /<\/?[a-z][\s\S]*>/i;

const arabicNumbersObj: { [key: string]: string } = {
	'٠': '0',
	'١': '1',
	'٢': '2',
	'٣': '3',
	'٤': '4',
	'٥': '5',
	'٦': '6',
	'٧': '7',
	'٨': '8',
	'٩': '9',
};

export const convertArabicToEnglishNumbers = (text: string) => {
	const textSplited = (text || '').toString().split('');
	const result = textSplited.map((c) => arabicNumbersObj[c] || c).join('');

	return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProps = (args: any) => {
	const props: { [key: string]: string } = {};

	Object.keys(args)?.forEach((key: string) => {
		props[key?.replace(/['"]/g, '')] = args[key];

		return props;
	});

	return props;
};

export const isHTML = (value: string) => HTML_TAGS.test(value);
